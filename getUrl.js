const { urls } = require("./urls");
const { validateUrl } = require('./validateUrl.js');

const shortUrl = async (req, res) => {
    const { origUrl } = req.body;

    if (validateUrl(origUrl)) {
        try {
            let url = fetchUrl(origUrl);
            if (url.length > 0) {
                res.status(200).json(url);
            }
            else {
                let url = createUrl(origUrl);
                res.status(200).json(url);
            }
        }
        catch (err) {
            res.status(500).json({ "Error": err })
        }
    } else {
        res.status(404).json({ "Error": "Invalid URL" });
    }
}

const getAllShortUrl = async (req, res) => {
    res.status(200).json(urls)
}

function fetchUrl(receivedUrl) {
    console.log("fetch started");
    return urls.filter((element) => element.origUrl == receivedUrl)
}

function createUrl(receivedUrl) {
    console.log("create started");
    const base = process.env.BASE_URL;
    const urlId = Math.random().toString(16).slice(4)
    let newUrl = {};
    newUrl.id = urlId;
    newUrl.origUrl = receivedUrl;
    newUrl.shortUrl = `${base}/${urlId}`
    urls.push(newUrl);
    console.log("inside create :", newUrl);
    return newUrl;
}

module.exports = { shortUrl, getAllShortUrl }