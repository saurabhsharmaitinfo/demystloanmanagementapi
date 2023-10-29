import { Router } from 'express-serve-static-core';
import * as express from 'express';
import { AddRouter } from './sub-router/add-router';
import { GetRouter } from './sub-router/get-router';
import { IAddDriver } from './app/adapters/api-add-adapter.interface';
import { IGetDriver } from './app/adapters/api-get-adapter.interface';
import { MongoAddDriver } from './app/mongo-db/mongo-add-driver';
import { MongoGetDriver } from './app/mongo-db/mongo-get-driver';
import {DecisionEngineManager} from "./app/dependency-manager/decision-engine-manager";
import {AccountingSoftwareManager} from "./app/dependency-manager/accounting-software-manager";

export class ApiRouter {

    private _router : Router;
    private _modelAddDriver : IAddDriver;
    private _modelGetDriver : IGetDriver;
    private _decisionEngineManager : DecisionEngineManager;
    private _accountingSoftwareManager : AccountingSoftwareManager;

    constructor( devMode? : boolean ) {
        this._router = express.Router();

        this._decisionEngineManager = new DecisionEngineManager();
        this._modelAddDriver = new MongoAddDriver(this._decisionEngineManager);

        this._accountingSoftwareManager = new AccountingSoftwareManager();
        this._modelGetDriver = new MongoGetDriver(this._accountingSoftwareManager);

        this._setRoutes( devMode );
    }

    private _setRoutes( devMode ? : boolean ) {
        const getRouter : GetRouter = new GetRouter(this._modelGetDriver),
            addRouter : AddRouter = new AddRouter(this._modelAddDriver);

        this._router.use( getRouter.router );
        this._router.use( addRouter.router );
    }

    get router() : Router {
        return this._router;
    }

    get getDriver() : IGetDriver {
        return this._modelGetDriver;
    }

    get addDriver() : IAddDriver {
        return this._modelAddDriver;
    }

}
