import { Router } from 'express-serve-static-core';
import * as express from 'express';
import { IGetDriver } from "../app/adapters/api-get-adapter.interface";

export class GetRouter {

    private readonly _router : Router;

    constructor( private _modelGetAdapter : IGetDriver ) {
        this._router = express.Router();
        this._setRoutes();
    }

    private _setRoutes() {
        this._router.get( '/accounting/accounting-providers/', this._getAccountingProviders.bind( this ) );
        this._router.get( '/accounting/balance-sheet/:bName/:accountingProvider/', this._getBalanceSheet.bind( this ) );
    }

    // To get the list of Accounting Providers
    _getAccountingProviders(req, res): void {
        // Here we will return the list of Accounting Providers from the database or third-party provider (whatever is required)
        const promise = this._modelGetAdapter.getAccountingProviders();
        this._handleDefaultResponse( promise, res );
    }

    // To get the balance sheet for a business based on the accounting provider
    _getBalanceSheet(req, res): void {
        const bName : string = req.params.bName;
        const accountingProvider : string = req.params.accountingProvider;
        const promise = this._modelGetAdapter.getBalanceSheet(bName, accountingProvider);
        this._handleDefaultResponse( promise, res );
    }

    // To handle the response of Api
    private _handleDefaultResponse( promise : Promise<any>, res ) {
        promise.then( ( success ) => {
            res.json( success );
        } ).catch( ( err ) => {
            res.status( 404 ).json( err );
        } );
    }

    get router() : Router {
        return this._router;
    }
}
