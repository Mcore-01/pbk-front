import {IDisplayModel} from "./displaymodel";

export interface IUserCard{
    card: IDisplayModel<number>;
    bank: IDisplayModel<number>;
    typeCard: IDisplayModel<number>;
}