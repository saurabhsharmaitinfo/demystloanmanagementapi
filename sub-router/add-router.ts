import { Router } from 'express-serve-static-core';
import * as express from 'express';
import { IAddDriver } from '../app/adapters/api-add-adapter.interface';
import { IModelApplication } from "../app/database-models/model-application";
import { DecisionEngineManager } from "../app/dependency-manager/decision-engine-manager";

export class AddRouter {

    private readonly _router : Router;

    constructor(private _modelAddAdapter : IAddDriver) {
        this._router = express.Router();
        this._setRoutes();
    }

    private _setRoutes() {
        this._router.post('/application-management/submit-application', this._submitApplication.bind(this));
    }

    private _submitApplication( req, res ) : void {
        console.log('body - ', req);
        const application: IModelApplication = req.body.loanApplication;

        if (!application) {
            res.status(400).json({message: 'Missing Application details, can not submit further.'});
            return;
        }

        if (!application.profitOrLossSummary || application.profitOrLossSummary.length < 12) {
            res.status(400).json({message: 'Missing Profit/Loss summary, can not submit further.'});
            return;
        }

        this._modelAddAdapter.submitApplication(application)
            .then(success => {
                res.json(success);
            }, error => {
                res.status(404).json(error);
            });
    }

    get router() : Router {
        return this._router;
    }
}
