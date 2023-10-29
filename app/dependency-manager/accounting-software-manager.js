"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingSoftwareManager = void 0;
class AccountingSoftwareManager {
    constructor() {
    }
    getBalanceSheet(bName, accountingProvider) {
        if (!bName) {
            return Promise.reject({ message: 'Error: Business Name is missing.' });
        }
        if (!accountingProvider) {
            return Promise.reject({ message: 'Error: Accounting Provider is missing.' });
        }
        return Promise.resolve(this.generateBalanceSheet());
    }
    // Ideally, balance must be provided by a third-party accounting software, so for now I am generating a simulation of it
    generateBalanceSheet() {
        let balanceSheet = [];
        const todayDate = new Date();
        const lastYear = todayDate.getFullYear();
        for (let i = 1; i <= 12; i++) {
            let balSheetForMonth = {
                month: i,
                year: lastYear,
                assetsValue: this.getRandomIntInclusive(10000, 9999999),
                profitOrLoss: this.getRandomIntInclusive(1000, 999999) * (this.getRandomIntInclusive(0, 12) - i)
            };
            balanceSheet.push(balSheetForMonth);
        }
        return balanceSheet;
    }
    // To get a random integer between two values, inclusive
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
}
exports.AccountingSoftwareManager = AccountingSoftwareManager;
//# sourceMappingURL=accounting-software-manager.js.map