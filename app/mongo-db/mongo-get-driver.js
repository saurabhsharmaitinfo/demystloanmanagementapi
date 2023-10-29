"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGetDriver = void 0;
class MongoGetDriver {
    _accountingSoftwareManager;
    constructor(_accountingSoftwareManager) {
        this._accountingSoftwareManager = _accountingSoftwareManager;
    }
    getAccountingProviders() {
        // Ideally, this list should come from database, but here we are not using database,
        // so I am creating the list here
        const accountingProviders = ['AccProvider1', 'AccProvider2', 'AccProvider3', 'AccProvider4', 'AccProvider5'];
        return Promise.resolve(accountingProviders);
    }
    getBalanceSheet(bName, accountingProvider) {
        // Ideally, this list should come from database, but here we are not using database,
        // so I am creating the list here
        return this._accountingSoftwareManager.getBalanceSheet(bName, accountingProvider);
    }
}
exports.MongoGetDriver = MongoGetDriver;
//# sourceMappingURL=mongo-get-driver.js.map