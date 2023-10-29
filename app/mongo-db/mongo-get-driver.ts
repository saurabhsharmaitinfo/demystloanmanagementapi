import { IGetDriver } from '../adapters/api-get-adapter.interface';
import { IModelBalanceSheet } from '../database-models/model-balance-sheet';
import { AccountingSoftwareManager } from '../dependency-manager/accounting-software-manager'

export class MongoGetDriver implements IGetDriver {

    constructor(private readonly _accountingSoftwareManager : AccountingSoftwareManager) {
    }

    getAccountingProviders(): Promise<string[]> {
        // Ideally, this list should come from database, but here we are not using database,
        // so I am creating the list here
        const accountingProviders: string[] = ['AccProvider1', 'AccProvider2', 'AccProvider3', 'AccProvider4', 'AccProvider5'];
        return Promise.resolve(accountingProviders);
    }

    getBalanceSheet(bName : string, accountingProvider : string): Promise<IModelBalanceSheet[]> {
        // Ideally, this list should come from database, but here we are not using database,
        // so I am creating the list here
        return this._accountingSoftwareManager.getBalanceSheet(bName, accountingProvider);

    }

}
