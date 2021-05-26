// Environment
require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3000;
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successful MongoDB connection"))
    .catch(err => console.error(err));
const Metadata = require(path.join(__dirname,"./models/metadata.js"));
const Tag = require(path.join(__dirname,"./models/tag.js"));

const DEFAULT_ITEM_NUM = 6;

app.use(cors());

app.get("/",(req,res) => {
    res.send("test");
});

app.get("/api/getAllMetadatas",(req,res) => {
    let sortField = req.query.sortField;
    let direction = req.query.direction;
    let sort = {};
    if(sortField && direction) {
        sort[sortField] = direction;
    }
    else {
        sort["uploadDate"] = -1;
    }
    Metadata.find({}).sort(sort).then(metadatas => {
        res.json(processDataFromDB(metadatas));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
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
    console.log(tags);
    Metadata.find({tags: {$all: tags} }).then(metadatas => {
        res.json(processDataFromDB(metadatas));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

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
    Metadata.findOne({_id: mongoose.Types.ObjectId(id)}, {favorite: 1, _id: 0}).then(data => {
        let status = data.favorite;
        Metadata.updateOne({_id: mongoose.Types.ObjectId(id)},{favorite: !status}).then(() => {
            res.json(true);
        }).catch(err => {
            res.status(500);
            res.send(`Internal server error, ${err}`);
        })
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
    Metadata.find({favorite: true}).then(metadatas => {
        res.json(processDataFromDB(metadatas));
    }).catch(err => {
       res.status(500);
       res.send(`Internal server error, ${err}`);
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
    })
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
    if(a.tag < b.tag) {
        return -1;
    }
    if(a.tag > b.tag) {
        return 1;
    }
    return 0;
}

/*
app.get("/api/import",(req,res) => {
    let rawMetadatas = fs.readFileSync(path.join(__dirname,"../test_metadata.json"));
    let rawTags = fs.readFileSync(path.join(__dirname,"../test_tag.json"));
    let json = JSON.parse(rawMetadatas);
    json.forEach(data => {
        let metadata = new Metadata({
            _id: mongoose.Types.ObjectId(data._id.$oid),
            name: data.name,
            files: [data.file],
            tags: data.tags,
            memo: data.memo,
            uploadDate: Date.parse(data.date.$date),
            favorite: data.favorite
        });
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
            tag: data.tag,
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

http.listen(port,() => {
   console.log(`listening at ${port}`);
});