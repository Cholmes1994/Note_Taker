// Requirements
const fs = require("fs");
const { v1: uuidv1 } = require("uuid");

module.exports = function (app) {

    // Get
    app.get("/api/notes", function (req, res) {
        const noteStuff = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`, "utf8"));
        res.json(noteStuff);
    });

    // Post
    app.post("/api/notes", (req, res) => {
        const data = fs.readFileSync(`${__dirname}/../db/db.json`, "utf8");
        let notesArr = JSON.parse(data);
        const noteObject = req.body;
        noteObject.id = uuidv1();
        notesArr.push(noteObject);
        fs.writeFileSync(`${__dirname}/../db/db.json`, JSON.stringify(notesArr));
        res.send("Note successfully created!");
    });

    // Delete
    app.delete("/api/notes/:id", (req, res) => {
        let noteInfo = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`, "utf8"));
        const elimNotes = noteInfo.filter(function (noteObj) {
            return noteObj.id !== req.params.id;
        })
        fs.writeFileSync(`${__dirname}/../db/db.json`, JSON.stringify(elimNotes));

        res.json(elimNotes);

    });
}