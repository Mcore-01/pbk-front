import {IDisplayModel} from "./displaymodel";
import {ICardCashback} from "./cardcashback";

export interface  ICard{
    id: number;
    name: string;
    bank: IDisplayModel<number>;
    typeCard: IDisplayModel<number>;
    cashbacks: ICardCashback[];
}