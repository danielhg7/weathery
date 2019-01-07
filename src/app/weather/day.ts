import { IWeather } from "./weather";

export interface IDay {

    weathers: IWeather[],
    date: string,
    dayOfWeek: string

}