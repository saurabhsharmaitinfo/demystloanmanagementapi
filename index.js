"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_router_1 = require("./api-router");
const port = 3010;
const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
let apiRouter = new api_router_1.ApiRouter(true);
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-SC-Authorization, X-SC-Custom-Data, x-access-token, if-modified-since, Pragma, cache-control");
    next();
});
app.use('/loan-management', apiRouter.router);
app.listen(port, () => console.log("API server is running..."));
//# sourceMappingURL=index.js.map