import type { Nullable } from '../utils/shared';
import type { Plugin, TrackDateResult } from '../basic/service';
import type { CalendarMark, CalendarStyleMark, CalendarDay, WcScheduleInfo } from '../interface/calendar';
import type { CalendarInstance } from '../interface/component';
export declare class MarkPlugin implements Plugin {
    static KEY: "mark";
    private _marks_;
    update(instance: CalendarInstance, marks: Array<CalendarMark | CalendarStyleMark>): void;
    PLUGIN_TRACK_DATE(date: CalendarDay): Nullable<TrackDateResult>;
    PLUGIN_TRACK_SCHEDULE(date: CalendarDay, id?: string): Nullable<WcScheduleInfo>;
}
export declare const MARK_PLUGIN_KEY: "mark";
