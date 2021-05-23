// Environment
require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3000;
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successful MongoDB connection"))
    .catch(err => console.error(err));
const Metadata = require(path.join(__dirname,"./models/metadata.js"));
const Tag = require(path.join(__dirname,"./models/tag.js"));


app.get("/",(req,res) => {
    res.send("test");
});

app.get("/api/getAllMetadatas",(req,res) => {
    Metadata.find({}).then(metadatas => {
        res.json(metadatas.map(metadata => metadata.toJSON()));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getMetadatasByTags", (req,res) => {
    let tags = req.query.tag;
    console.log(tags);
    Metadata.find({tags: {$all: tags} }).then(metadatas => {
        res.json(metadatas.map(metadata => metadata.toJSON()));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
});

app.get("/api/getRandomMetadatas", (req,res) => {
    let limit = (req.query.limit !== undefined) ? Number(req.query.limit) : 6;
    console.log(limit);
    Metadata.estimatedDocumentCount().exec((err,count) => {
        if(count === 0) {
            res.json([]);
        }
        else {
            let randomNum = Math.floor(Math.random() * count);
            console.log(count, randomNum);
            Metadata.find().skip(randomNum).limit(limit).then(randoms => {
                res.send(randoms.map(random => random.toJSON()));
            })
        }
    })
})

app.get("/api/getAllTags", (req,res) => {
    Tag.find({}).then(tags => {
        res.json(tags.map(tag => tag.toJSON()));
    }).catch(err => {
        res.status(500);
        res.send(`Internal server error, ${err}`);
    });
})

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