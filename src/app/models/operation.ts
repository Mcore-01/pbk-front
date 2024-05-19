import {IDisplayModel} from "./displaymodel";

export interface IOperation{
    id: number;
    outlet: IDisplayModel<number>;
    sum: number;
}