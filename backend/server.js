// Environment
require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3000;
const path = require("path");
const fse = require("fs-extra");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../media_folder/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({storage,imageFilter});
const uploadMultipleImages = upload.array("filesToUpload",10);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successful MongoDB connection"))
    .catch(err => console.error(err));
const Metadata = require(path.join(__dirname,"./models/metadata.js"));
const Tag = require(path.join(__dirname,"./models/tag.js"));

const history = require("connect-history-api-fallback");

const DEFAULT_ITEM_NUM = 3;
const PAGINATE_SIZE = parseInt(process.env.PAGINATESIZE);
const PAGINATE_OFFSET = parseInt(process.env.PAGINATEOFFSET);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/files', express.static('../media_folder'));
app.use('/public', express.static(path.join(__dirname, 'public')));

const historyMiddleware = history({
    index: "/",
    verbose: true
});

app.use((req,res,next) => {
    if(req.path.match("\/api\/.*")
        || req.path.match("\/files\/.*")
        || req.path.match("\/public\/.*")
        || req.path.match("\/js\/.*")
        || req.path.match("\/css\/.*")) {
        next();
    }
    else {
        historyMiddleware(req,res,next);
    }
})

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"public/index.html"));
});

app.get("/js/*", (req,res) => {
    res.sendFile(path.join(__dirname,`public/${req.path}`));
});

app.get("/css/*", (req,res) => {
    res.sendFile(path.join(__dirname,`public/${req.path}`));
});

app.get("/files/:fileName/", (req,res) => {
    const path = "./files/" + req.params.fileName;
    fse.readFile(path,(err,data) => {
        if(err) {
            httpErrorHandler(err,res);
        }
        else {
            fileType.fromBuffer(data).then(type => {
                console.log("Serving file type:",type);
                res.writeHead(200, {'Content-Type': type.mime});
                res.end(data);
            });
        }
    });
});

app.get("/api/getAllMetadatas",(req,res) => {
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {uploadDate: -1};
    if(sortField && direction) {
        delete sort.uploadDate;
        sort[sortField] = direction;
    }
    Metadata.find().sort(sort).then(metadatas => {
        res.json(processDataFromDB(metadatas));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getAllMetadatasWithPagination",(req,res) => {
    if(!req.query.page) {
        return res.status(400).send("page query cannot be empty");
    }
    let page = parseInt(req.query.page);
    let size = req.query.size ? parseInt(req.query.size) : PAGINATE_SIZE;
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {uploadDate: -1};
    if(sortField && direction) {
        delete sort.uploadDate;
        sort[sortField] = direction;
    }
    Metadata.estimatedDocumentCount().then((count) => {
        console.log("count", count)
        const {limit, offset} = getLimitOffset(page,size);
        Metadata.find().sort(sort).skip(offset).limit(limit).then(metadatas => {
            let currentPage = page + 1;
            let totalPages = Math.ceil(count/limit)
            const pageData = {
                totalPages: totalPages,
                currentPage: currentPage,
                hasNextPage: (currentPage < totalPages),
                hasPrevPage: (currentPage > 1),
                nextPage: currentPage + 1,
                prevPage: currentPage -1,
                lastPage: totalPages,
                itemCount: count
            }
            const response = {metadatas: processDataFromDB(metadatas), pageData: pageData};
            res.json(response);
        }).catch(err => {
            res.status(500).send(`Internal server error, ${err}`);
        });
    }).catch(err => {
        console.error(err);
        return res.status(500).send(err);
    });
});

app.get("/api/getMetadataById", (req,res) => {
    let id = req.query.id;
    Metadata.findOne({_id: mongoose.Types.ObjectId(id)}).then(metadata => {
        metadata = metadata.toJSON();
        metadata.id = metadata._id;
        delete metadata._id;
        console.log(metadata);
        res.json(metadata);
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
})

app.get("/api/getMetadatasByTags", (req,res) => {
    let tags = req.query.tags;
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {uploadDate: -1};
    if(sortField && direction) {
        delete sort.uploadDate;
        sort[sortField] = direction;
    }
    console.log(tags);
    Metadata.find({tags: {$all: tags} }).sort(sort).then(metadatas => {
        res.json(processDataFromDB(metadatas));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getMetadatasByTagsWithPagination", (req,res) => {
    if(!req.query.page) {
        return res.status(400).send("page query cannot be empty");
    }
    let page = parseInt(req.query.page);
    let size = req.query.size ? parseInt(req.query.size) : PAGINATE_SIZE;
    let tags = req.query.tags;
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {uploadDate: -1};
    if(sortField && direction) {
        delete sort.uploadDate;
        sort[sortField] = direction;
    }
    Metadata.countDocuments({tags: {$all: tags}}).then((count) => {
        console.log("count", count)
        const {limit, offset} = getLimitOffset(page,size);
        Metadata.find({tags: {$all: tags}}).sort(sort).skip(offset).limit(limit).then(metadatas => {
            let currentPage = page + 1;
            let totalPages = Math.ceil(count/limit)
            const pageData = {
                totalPages: totalPages,
                currentPage: currentPage,
                hasNextPage: (currentPage < totalPages),
                hasPrevPage: (currentPage > 1),
                nextPage: currentPage + 1,
                prevPage: currentPage -1,
                lastPage: totalPages,
                itemCount: count
            }
            const response = {metadatas: processDataFromDB(metadatas), pageData: pageData};
            res.json(response);
        }).catch(err => {
            res.status(500).send(`Internal server error, ${err}`);
        });
    }).catch(err => {
        console.error(err);
        return res.status(500).send(err);
    });
})

app.get("/api/getRandomMetadatas", (req,res) => {
    let limit = (req.query.limit !== undefined) ? Number(req.query.limit) : DEFAULT_ITEM_NUM;
    console.log(limit);
    Metadata.estimatedDocumentCount().exec((err,count) => {
        if(count === 0) {
            res.json([]);
        }
        else {
            let randomNum = Math.floor(Math.random() * count);
            console.log(count, randomNum);
            Metadata.find().skip(randomNum).limit(limit).then(randoms => {
                res.send(processDataFromDB(randoms));
            })
        }
    })
})

app.post("/api/toggleFavouriteById",(req,res) => {
    let id = req.query.id;
    Metadata.findOne({_id: mongoose.Types.ObjectId(id)}, {favourite: 1, _id: 0}).then(data => {
        if(data.favourite) {
            Metadata.updateOne({_id: mongoose.Types.ObjectId(id)}, {favourite: false, $unset: {favouriteDate: ""}}).then(() => {
                res.json(true);
            }).catch(err => {
                res.status(500);
                res.send(`Internal server error, ${err}`);
            })
        }
        else {
            Metadata.updateOne({_id: mongoose.Types.ObjectId(id)}, {favourite: true, favouriteDate: Date.now()}).then(() => {
                res.json(true);
            }).catch(err => {
                res.status(500);
                res.send(`Internal server error, ${err}`);
            })
        }
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
})

app.post("/api/incScoreById", (req,res) => {
    let id = req.query.id;
    Metadata.updateOne({_id: mongoose.Types.ObjectId(id)},{$inc: {score: 1} }).then(() => {
        res.json(true);
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.post("/api/decScoreById", (req,res) => {
    let id = req.query.id;
    Metadata.updateOne({_id: mongoose.Types.ObjectId(id)},{$inc: {score: -1} }).then(() => {
        res.json(true);
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getFavouriteMetadatas",(req,res) => {
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {uploadDate: -1};
    if(sortField && direction) {
        delete sort.uploadDate;
        sort[sortField] = direction;
    }
    Metadata.find({favourite: true}).sort(sort).then(metadatas => {
        res.json(processDataFromDB(metadatas));
    }).catch(err => {
       res.status(500);
       res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getFavouriteMetadatasWithPagination", (req,res) => {
    if(!req.query.page) {
        return res.status(400).send("page query cannot be empty");
    }
    let page = parseInt(req.query.page);
    let size = req.query.size ? parseInt(req.query.size) : PAGINATE_SIZE;
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {favouriteDate: -1};
    if(sortField && direction) {
        delete sort.favouriteDate;
        sort[sortField] = direction;
    }
    Metadata.countDocuments({favourite: true}).then((count) => {
        console.log("count", count)
        const {limit, offset} = getLimitOffset(page,size);
        Metadata.find({favourite: true}).sort(sort).skip(offset).limit(limit).then(metadatas => {
            let currentPage = page + 1;
            let totalPages = Math.ceil(count/limit)
            const pageData = {
                totalPages: totalPages,
                currentPage: currentPage,
                hasNextPage: (currentPage < totalPages),
                hasPrevPage: (currentPage > 1),
                nextPage: currentPage + 1,
                prevPage: currentPage -1,
                lastPage: totalPages,
                itemCount: count
            }
            const response = {metadatas: processDataFromDB(metadatas), pageData: pageData};
            res.json(response);
        }).catch(err => {
            res.status(500).send(`Internal server error, ${err}`);
        });
    }).catch(err => {
        console.error(err);
        return res.status(500).send(err);
    });
})

app.get("/api/getAllTags", (req,res) => {
    Tag.find({}).then(tags => {
        res.json(processDataFromDB(tags).sort(sortTagAlphabetically));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getTagsByType", (req,res) => {
    let type = req.query.type;
    Tag.find({type: type}).then(tags => {
        res.json(processDataFromDB(tags).sort(sortTagAlphabetically));
    });
});

app.get("/api/getTagByValue",(req,res) => {
    let value = req.query.value;
    Tag.findOne({value: value}).then(tag => {
        tag = tag.toJSON();
        tag.id = tag._id;
        delete tag._id;
        res.json(tag);
    });
})

app.post("/api/uploadFiles", (req,res) => {
    uploadMultipleImages(req,res,(err) => {
        if(err) {
            return res.status(500).send(err);
        }
        let filenames = [];
        console.log("Files saved");
        for(let i = 0; i < req.files.length; i++) {
            filenames.push(req.files[i].originalname);
            console.log(req.files[i].originalname,`${req.files[i].size} Byte`);
        }
        let metadata = new Metadata({
            name: req.body.name,
            files: filenames,
            tags: JSON.parse(req.body.tags),
            memo: req.body.memo,
            uploadDate: Date.now()
        });
        metadata.save().then(() => {
            console.log("New meta data saved", metadata);
            res.send("files uploaded");
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
    });
});

app.post("/api/create_tag",(req,res) => {
    console.log(req.body);
    req.body.value = req.body.value.toLowerCase();
    Tag.find({value: req.body.value}).then(tags => {
        if(tags.length > 0) {
            return res.status(400).send("The tag with same value already exists");
        }
        let tag = new Tag({
           value: req.body.value,
           type: req.body.type,
           label: req.body.label,
           description: req.body.description
        });
        tag.save().then(() => {
            console.log("New tag was saved",tag);
            res.send("tag saved");
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
    });
});

app.post("/api/edit_tag", (req,res) => {
    console.log(req.body);
    req.body.value = req.body.value.toLowerCase();
    Tag.updateOne({value: req.body.value}, {$set: { type: req.body.type, label: req.body.label, description: req.body.description}})
        .then(() => {
            res.json(true);
        })
        .catch(err => {
            res.status(500);
            res.send(`Internal server error, ${err}`);
        });
})

function processDataFromDB(mongos) {
    let results = [];
    mongos.forEach(mongo => {
        let result = mongo.toJSON();
        result.id = result._id;
        delete result._id;
        results.push(result);
    })
    return results;
}

function sortTagAlphabetically(a,b) {
    if(a.value < b.value) {
        return -1;
    }
    if(a.value > b.value) {
        return 1;
    }
    return 0;
}

function httpErrorHandler(err,res) {
    if(err.code === "ENOENT") {
        res.writeHead(404, {'Content-Type':'text/html'});
        res.end('404 not found '+err);
    }
    else {
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end('500 Internal Server error '+err);
    }
}
function getLimitOffset(page, size) {
    const limit = size ? +size : PAGINATE_SIZE;
    const offset = page ? page * limit : PAGINATE_OFFSET;
    return {limit, offset};
}

/*
app.get("/api/import",(req,res) => {
    let rawMetadatas = fse.readFileSync(path.join(__dirname,"../test_metadata.json"));
    let rawTags = fse.readFileSync(path.join(__dirname,"../test_tag.json"));
    let json = JSON.parse(rawMetadatas);
    json.forEach(data => {
        let metadata = new Metadata({
            _id: mongoose.Types.ObjectId(data._id.$oid),
            name: data.name,
            files: [data.file],
            tags: data.tags,
            memo: data.memo,
            uploadDate: Date.parse(data.date.$date),
            favourite: data.favorite
        });
        if(data.favorite) {
            metadata.favouriteDate = Date.now();
        }
        metadata.save().then(() => {
            console.log("new metadata saved", metadata.name, metadata.uploadDate);
        }).catch(err => {
            console.log(err);
        });
    });
    let json2 = JSON.parse(rawTags);
    json2.forEach(data => {
        let tag = new Tag({
            _id: mongoose.Types.ObjectId(data._id.$oid),
            value: data.tag,
            type: data.type
        });
        tag.save().then(() => {
            console.log("new tag saved", tag.name, tag.type);
        }).catch(err => {
            console.log(err);
        });
    });
    res.send(json);
});

 */

fse.ensureDir(path.join(__dirname,"../media_folder"))
    .then(() => {
        console.log("../media_folder directory exists");
    })
    .catch(err => {
        console.error(err);
    });

http.listen(port,() => {
   console.log(`listening at ${port}`);
});