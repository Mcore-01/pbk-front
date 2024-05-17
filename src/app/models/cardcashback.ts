import {IDisplayModel} from "./displaymodel";

export interface ICardCashback{
    id: number;
    category: IDisplayModel<number>;
    percent: number;
}