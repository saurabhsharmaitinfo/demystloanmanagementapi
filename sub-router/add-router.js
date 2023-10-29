"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRouter = void 0;
const express = require("express");
class AddRouter {
    _modelAddAdapter;
    _router;
    constructor(_modelAddAdapter) {
        this._modelAddAdapter = _modelAddAdapter;
        this._router = express.Router();
        this._setRoutes();
    }
    _setRoutes() {
        this._router.post('/application-management/submit-application', this._submitApplication.bind(this));
    }
    _submitApplication(req, res) {
        console.log('body - ', req);
        const application = req.body.loanApplication;
        if (!application) {
            res.status(400).json({ message: 'Missing Application details, can not submit further.' });
            return;
        }
        if (!application.profitOrLossSummary || application.profitOrLossSummary.length < 12) {
            res.status(400).json({ message: 'Missing Profit/Loss summary, can not submit further.' });
            return;
        }
        this._modelAddAdapter.submitApplication(application)
            .then(success => {
            res.json(success);
        }, error => {
            res.status(404).json(error);
        });
    }
    get router() {
        return this._router;
    }
}
exports.AddRouter = AddRouter;
//# sourceMappingURL=add-router.js.map