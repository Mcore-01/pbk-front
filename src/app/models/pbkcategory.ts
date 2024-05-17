import {IDisplayModel} from "./displaymodel";

export interface IPbkCategory {
    id: number;
    name: string;
    mccs: IDisplayModel<string>[];
}