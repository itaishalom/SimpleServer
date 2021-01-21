var express = require('express');
var fs = require('fs');
var router = express.Router();
const readline = require('readline');
var HashSet = require('hashset');
var baseDir = "records";
var userSets = new HashSet();

/* GET home page. */

router.get('/api/config', function (req, res) {
    readLogFilesForUser2(req, res)
});


function readLogFilesForUser2(req, res) {
        const dir = process.cwd() + "\\" + baseDir + "\\";
        if (fs.existsSync(dir)) {
            var response = [];
            readFiles(dir, response, res, "config");
        }
}

function readFiles(dirname, response, res, userName) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        let isFound = false;
        let searchedFile = userName + ".json";
        for (let i = 0; i < filenames.length; i++) {
            if (filenames[i] === searchedFile) {
                isFound = true;
                fs.readFile(dirname + searchedFile, 'utf-8', function (err, content) {
                    if (err) {
                        res.send(JSON.stringify({error:"Error reading file"}));
                        return;
                    }
                    isFound = true;
                    response = response.concat(JSON.parse(content));
                    res.send(response);
                });
            }

        }
        if (!isFound) {
            res.send(JSON.stringify({error:"No Logs Found"}));
        }
    });
}


module.exports = router;
