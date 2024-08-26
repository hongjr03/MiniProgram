import type { Plugin, TrackDateResult, TrackYearResult } from '../basic/service';
import type { CalendarDay, WcYear } from '../interface/calendar';
export interface LunarDate {
    year?: number;
    month?: number;
    day?: number;
    lunarYear: string;
    lunarMonth: string;
    lunarDay: string;
    solar: string;
}
export declare class LunarPlugin implements Plugin {
    static KEY: "lunar";
    getLunar(date: CalendarDay): LunarDate;
    PLUGIN_TRACK_DATE(date: CalendarDay): TrackDateResult;
    PLUGIN_TRACK_YEAR(year: WcYear): TrackYearResult;
}
export declare const LUNAR_PLUGIN_KEY: "lunar";
