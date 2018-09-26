import { ICoord } from "./coord";
import { IWeather } from "./weather";
import { IMain } from "./main";
import { IWind } from "./wind";
import { IClouds } from "./clouds";
import { ISys } from "./sys";

export interface ICityWeather {
    coord: ICoord,
    weather: Array<IWeather>,
    base: string,
    main: IMain,
    visibility: number,
    wind: IWind,
    clouds: IClouds,
    dt: number,
    sys: ISys,
    id: number,
    name: string,
    cod: number
}