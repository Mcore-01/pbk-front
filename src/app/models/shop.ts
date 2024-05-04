import {IDisplayModel} from "./displaymodel";

export interface IShop{
    id: number;
    name: string;
    outlets: IDisplayModel<number>[];
}
