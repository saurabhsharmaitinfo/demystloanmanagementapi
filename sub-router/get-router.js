"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRouter = void 0;
const express = require("express");
class GetRouter {
    _modelGetAdapter;
    _router;
    constructor(_modelGetAdapter) {
        this._modelGetAdapter = _modelGetAdapter;
        this._router = express.Router();
        this._setRoutes();
    }
    _setRoutes() {
        this._router.get('/accounting/accounting-providers/', this._getAccountingProviders.bind(this));
        this._router.get('/accounting/balance-sheet/:bName/:accountingProvider/', this._getBalanceSheet.bind(this));
    }
    // To get the list of Accounting Providers
    _getAccountingProviders(req, res) {
        // Here we will return the list of Accounting Providers from the database or third-party provider (whatever is required)
        const promise = this._modelGetAdapter.getAccountingProviders();
        this._handleDefaultResponse(promise, res);
    }
    // To get the balance sheet for a business based on the accounting provider
    _getBalanceSheet(req, res) {
        const bName = req.params.bName;
        const accountingProvider = req.params.accountingProvider;
        const promise = this._modelGetAdapter.getBalanceSheet(bName, accountingProvider);
        this._handleDefaultResponse(promise, res);
    }
    // To handle the response of Api
    _handleDefaultResponse(promise, res) {
        promise.then((success) => {
            res.json(success);
        }).catch((err) => {
            res.status(404).json(err);
        });
    }
    get router() {
        return this._router;
    }
}
exports.GetRouter = GetRouter;
//# sourceMappingURL=get-router.js.map