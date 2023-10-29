"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngineManager = void 0;
class DecisionEngineManager {
    constructor() {
    }
    submitApplication(application) {
        return new Promise((resolve, reject) => {
            if (!application) {
                reject({ message: 'No Application data' });
            }
            if (application.preAssessment <= 0) {
                reject({ message: 'Error: PreAssessment is missing.' });
            }
            // Ideally, the final decision has to be made by decision engine,
            // but for now, I am returning the PreAssessment Value
            resolve(application.preAssessment);
        });
    }
}
exports.DecisionEngineManager = DecisionEngineManager;
//# sourceMappingURL=decision-engine-manager.js.map