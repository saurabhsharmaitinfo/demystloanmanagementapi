import {IModelApplication} from "../database-models/model-application";
import {DecisionEngineManager} from "../dependency-manager/decision-engine-manager";
import {IAddDriver} from "../adapters/api-add-adapter.interface";
import {IModelBalanceSheet} from "../database-models/model-balance-sheet";

export class MongoAddDriver implements IAddDriver {

    constructor(private readonly _decisionEngineManager : DecisionEngineManager) {
    }

    submitApplication(application: IModelApplication): Promise<any> {
        // Validate to set preAssessment's value
        application.preAssessment = this.validateForPreAssessment(application)
        return this._decisionEngineManager.submitApplication(application);
    }

    // Function to validate the application for preAssessment's value
    validateForPreAssessment(application: IModelApplication) : number {
        let preAssessment : number = 20;
        let avgAssetValue : number = 0;
        application.profitOrLossSummary.forEach(balSheet => {
           avgAssetValue+= balSheet.assetsValue;
           if (balSheet.profitOrLoss > 0) {
               preAssessment = 60;
           }
        });
        avgAssetValue = avgAssetValue/12;
        if (avgAssetValue > application.loanAmount) {
            preAssessment = 100;
        }
        return  preAssessment;
    }

}
