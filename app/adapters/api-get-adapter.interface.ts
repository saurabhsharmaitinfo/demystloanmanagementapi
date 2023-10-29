import { IModelBalanceSheet } from "../database-models/model-balance-sheet";

export interface IGetDriver {
    getAccountingProviders(): Promise<string[]>;
    getBalanceSheet(bName : string, accountingProvider : string): Promise<IModelBalanceSheet[]>;
}
