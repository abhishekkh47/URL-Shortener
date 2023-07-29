const { urls } = require("./urls");
const { validateUrl } = require('./validateUrl.js');

const shortUrl = async (req, res) => {
    const { origUrl } = req.body;

    if (validateUrl(origUrl)) {
        try {
            let url = fetchExistingUrl(origUrl);
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
    console.log(req.params);
    res.status(200).json(urls)
}

const urlRedirect = async (req, res) => {
    const { urlId } = req.params;
    try {
        let url = fetchOriginalUrl(urlId);
        if (url.length > 0) {
            url = url[0].origUrl;
            res.status(200).json(url);
        }
        else {
            res.status(404).json({ "Error": "Invalid Short URL" });
        }
    }
    catch (err) {
        res.status(500).json({ "Error": err })
    }
}

function fetchExistingUrl(receivedUrl) {
    console.log("fetchExistingUrl started");
    return urls.filter((element) => element.origUrl == receivedUrl)
}

function fetchOriginalUrl(urlId) {
    console.log("fetchOriginalUrl started");
    return urls.filter((element) => element.id == urlId)
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

module.exports = { shortUrl, getAllShortUrl, urlRedirect }