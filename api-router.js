"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express = require("express");
const add_router_1 = require("./sub-router/add-router");
const get_router_1 = require("./sub-router/get-router");
const mongo_add_driver_1 = require("./app/mongo-db/mongo-add-driver");
const mongo_get_driver_1 = require("./app/mongo-db/mongo-get-driver");
const decision_engine_manager_1 = require("./app/dependency-manager/decision-engine-manager");
const accounting_software_manager_1 = require("./app/dependency-manager/accounting-software-manager");
class ApiRouter {
    _router;
    _modelAddDriver;
    _modelGetDriver;
    _decisionEngineManager;
    _accountingSoftwareManager;
    constructor(devMode) {
        this._router = express.Router();
        this._decisionEngineManager = new decision_engine_manager_1.DecisionEngineManager();
        this._modelAddDriver = new mongo_add_driver_1.MongoAddDriver(this._decisionEngineManager);
        this._accountingSoftwareManager = new accounting_software_manager_1.AccountingSoftwareManager();
        this._modelGetDriver = new mongo_get_driver_1.MongoGetDriver(this._accountingSoftwareManager);
        this._setRoutes(devMode);
    }
    _setRoutes(devMode) {
        const getRouter = new get_router_1.GetRouter(this._modelGetDriver), addRouter = new add_router_1.AddRouter(this._modelAddDriver);
        this._router.use(getRouter.router);
        this._router.use(addRouter.router);
    }
    get router() {
        return this._router;
    }
    get getDriver() {
        return this._modelGetDriver;
    }
    get addDriver() {
        return this._modelAddDriver;
    }
}
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=api-router.js.map