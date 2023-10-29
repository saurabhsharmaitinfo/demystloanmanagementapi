"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAddDriver = void 0;
class MongoAddDriver {
    _decisionEngineManager;
    constructor(_decisionEngineManager) {
        this._decisionEngineManager = _decisionEngineManager;
    }
    submitApplication(application) {
        // Validate to set preAssessment's value
        application.preAssessment = this.validateForPreAssessment(application);
        return this._decisionEngineManager.submitApplication(application);
    }
    // Function to validate the application for preAssessment's value
    validateForPreAssessment(application) {
        let preAssessment = 20;
        let avgAssetValue = 0;
        application.profitOrLossSummary.forEach(balSheet => {
            avgAssetValue += balSheet.assetsValue;
            if (balSheet.profitOrLoss > 0) {
                preAssessment = 60;
            }
        });
        avgAssetValue = avgAssetValue / 12;
        if (avgAssetValue > application.loanAmount) {
            preAssessment = 100;
        }
        return preAssessment;
    }
}
exports.MongoAddDriver = MongoAddDriver;
//# sourceMappingURL=mongo-add-driver.js.map