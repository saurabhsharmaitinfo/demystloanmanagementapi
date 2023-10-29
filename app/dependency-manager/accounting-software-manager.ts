import { IModelBalanceSheet } from "../database-models/model-balance-sheet";

export class AccountingSoftwareManager {

    constructor() {
    }

    getBalanceSheet(bName : string, accountingProvider : string): Promise<IModelBalanceSheet[]> {
        if (!bName) {
            return Promise.reject({message: 'Error: Business Name is missing.'});
        }

        if (!accountingProvider) {
            return Promise.reject({message: 'Error: Accounting Provider is missing.'});
        }

        return Promise.resolve(this.generateBalanceSheet());
    }

    // Ideally, balance must be provided by a third-party accounting software, so for now I am generating a simulation of it
    generateBalanceSheet() : IModelBalanceSheet[] {
        let balanceSheet : IModelBalanceSheet[] = [];
        const todayDate: Date = new Date();
        const lastYear : number = todayDate.getFullYear();
        for (let i=1; i<=12; i++) {
            let balSheetForMonth : IModelBalanceSheet =
                {
                    month: i,
                    year: lastYear,
                    assetsValue: this.getRandomIntInclusive(10000, 9999999),
                    profitOrLoss: this.getRandomIntInclusive(1000, 999999) * (this.getRandomIntInclusive(0,12) - i)
                };
            balanceSheet.push(balSheetForMonth);
        }
        return  balanceSheet;
    }

    // To get a random integer between two values, inclusive
    getRandomIntInclusive(min, max) : number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

}
