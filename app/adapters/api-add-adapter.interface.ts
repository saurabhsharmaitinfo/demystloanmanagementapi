import {IModelApplication} from "../database-models/model-application";

export interface IAddDriver {
    submitApplication(application: IModelApplication): Promise<any>;
}
