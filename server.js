require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./route.js');
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.body, req.method);
    next();
});
app.use('/api/short', routes)

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
})