import {IDisplayModel} from "./displaymodel";

export interface IOutlet{
    id: number;
    name: string;
    shop: IDisplayModel<number>;
    mcc: IDisplayModel<string>;
}