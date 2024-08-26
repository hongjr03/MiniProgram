import { Nullable } from '../utils/shared';
import { PluginService } from '../basic/service';
import type { PluginConstructor, PluginKeys, PluginUse, ServicePlugins } from '../basic/service';
import type { CalendarInstance, UsePluginService, ScheduleEventDetail, DEFAULT_PLUGINS } from './component';
export interface CalendarDay {
    year: number;
    month: number;
    day: number;
    week?: number;
    today?: boolean;
}
export interface CalendarMonth {
    year: number;
    month: number;
}
interface DateMark extends Partial<Pick<CalendarDay, 'day' | 'month' | 'year'>> {
    date?: string | number | Date | CalendarDay;
}
export interface CalendarMark extends DateMark {
    type: 'schedule' | 'corner' | 'festival';
    text: string;
    color?: Nullable<string>;
    bgColor?: Nullable<string>;
}
export type DateStyle = Record<string, string | number>;
export interface CalendarStyleMark extends DateMark {
    type: 'style';
    style: string | DateStyle;
}
export type CalendarMarkTypes = CalendarMark['type'] | CalendarStyleMark['type'];
export type WcMark = Pick<CalendarMark, 'text' | 'color'> & {
    key?: string;
};
export type WcScheduleMark = WcMark & Pick<CalendarMark, 'bgColor'>;
export type WcStyleMark = CalendarStyleMark['style'];
export type MarkDict<T extends CalendarMarkTypes, Style, Schedule, CF> = T extends 'style' ? Style : T extends 'schedule' ? Schedule : CF;
export interface WcDate extends Required<CalendarDay> {
    key: string;
    kind: 'last' | 'current' | 'next';
    style: Nullable<string>;
    mark: Nullable<WcMark>;
    corner: Nullable<WcMark>;
    schedules: Array<WcScheduleMark>;
}
export interface WcWeek {
    key: string;
    days: Array<WcDate>;
}
export interface WcMonth extends Required<CalendarMonth> {
    key: string;
    count: number;
    weeks: Array<WcWeek>;
}
export interface WcAnnualMonth {
    key: string;
    year: number;
    month: number;
    weeks: number;
    days: number;
    start: number;
}
export interface WcDateStyle {
    light: string | number;
    dark: string | number;
}
export type WcAnnualDateStyle = Record<string, WcDateStyle>;
export interface WcAnnualMark {
    rwtype?: 'rest' | 'work';
    sub?: string;
    style?: WcAnnualDateStyle;
}
export type WcAnnualMarks = Map<string, WcAnnualMark>;
export interface WcAnnualSub {
    key?: string;
    color: string;
    text: string;
}
export interface WcYear {
    key: string;
    year: number;
    subinfo?: Array<WcAnnualSub>;
}
export interface WcSubYear {
    year: number;
    months: Array<WcAnnualMonth>;
    marks: WcAnnualMarks;
}
export type WcFullYear = WcYear & WcSubYear;
export type WcMarkDict = {
    [P in CalendarMarkTypes]?: MarkDict<P, Nullable<CalendarStyleMark>, Nullable<Array<CalendarMark>>, Nullable<CalendarMark>>;
};
export type WcMarkMap = Map<string, WcMarkDict>;
export interface WcScheduleInfo {
    dtStart?: Date;
    dtEnd?: Date;
    origin?: string;
    originKey?: string;
    summary?: string;
    description?: string;
}
export declare const styleParse: (style: string | DateStyle | null) => Record<string, string | number>;
export declare const styleStringify: (style: DateStyle) => string;
export declare const themeStyle: (style?: WcDateStyle) => string | number | undefined;
export declare const getAnnualMarkKey: (day: Pick<CalendarDay, 'month' | 'day'>) => string;
/**
 * 生成 mark key
 * @param id 插件内部识别id，会整体回传给插件 PLUGIN_MARK_DATA 方法
 * @param pluginKey 插件 KEY
 */
export declare const getMarkKey: (id: string, pluginKey?: string) => string;
export interface WcMarkKeyParse {
    plugin?: string;
    id: string;
}
/**
 * 解析 mark key
 * @param key mark key
 */
export declare const parseMarkKey: (key?: string) => WcMarkKeyParse | undefined;
export declare const getScheduleDetail: (date: CalendarDay, schedule: WcScheduleMark, service: PluginService<DEFAULT_PLUGINS>) => ScheduleEventDetail;
export declare const mergeAnnualDateStyle: (s1?: WcAnnualDateStyle, s2?: WcAnnualDateStyle) => WcAnnualDateStyle | undefined;
/**
 * 合并两个年面板标记
 */
export declare const mergeAnnualMarks: (m1?: WcAnnualMarks, m2?: WcAnnualMarks) => WcAnnualMarks | undefined;
export declare const formDateByStrKey: (key: string) => CalendarDay;
/**
 * 获取某个月份的天数
 * @param mon 月份
 */
export declare const getMonthDays: (mon: CalendarMonth) => number;
/**
 * 是否闰年
 * @param y 年
 */
export declare const isLeapYear: (y: number) => boolean;
/**
 * 判断两个日期是否是同一天
 */
export declare const isSameDate: (d1: CalendarDay, d2: CalendarDay) => boolean;
/**
 * 判断两个日期是否同一周
 */
export declare const isSameWeek: (d1: CalendarDay, d2: CalendarDay, weekstart?: number) => boolean;
/**
 * 是否今日
 * @param date
 */
export declare const isToday: (date: CalendarDay) => boolean;
export declare function normalDate(fuzzy: string | number | Date | CalendarDay): CalendarDay;
export declare function normalDate(year: number, month: number, day: number): CalendarDay;
/**
 * 计算与指定日期相差几天的日期
 * @param date 指定日期
 * @param offset 差值，单位天
 */
export declare const offsetDate: (date: CalendarDay, offset: number) => CalendarDay;
/**
 * 获取指定某年某月某天的日期，若指定天大于指定月的天数，则返回指定月最后一天
 * @param year 指定年
 * @param month 指定月
 * @param day  指定天
 */
export declare const inMonthDate: (year: number, month: number, day: number) => CalendarDay;
/**
 * 根据指定的周首日对星期重新排序
 * @param weekstart 周首日
 */
export declare const sortWeeks: (weekstart: number) => string;
/**
 * 获取指定日期所在的周
 * @param date 指定日期
 * @param weekstart 周首日
 */
export declare const weekRange: (date: CalendarDay, weekstart?: number) => [start: Date, end: Date];
/**
 * 查找日期
 * @param weeks 月份周数组
 * @param predicate 查找条件
 */
export declare const findInWeeks: (weeks: Array<WcWeek>, predicate: (value: WcDate, index: number, obj: WcDate[]) => boolean) => WcDate | undefined;
/**
 * 查找日期index
 * @param weeks 月份周数组
 * @param predicate 查找条件
 */
export declare const findDateIndex: (weeks: Array<WcWeek>, predicate: (value: WcDate, index: number, obj: WcDate[]) => boolean) => number;
/**
 * 获取指定日期所在月份的周索引和所在周的日期索引
 * @param date 制定日期
 * @param weeks 所在月份的周数组
 */
export declare const getWeekDateIdx: (date: CalendarDay, weeks: Array<WcWeek>) => {
    wdx: number;
    ddx: number;
};
/**
 * 计算两个月份相距多少个月（完全不考虑天，纯粹按月计算）
 * @param start 起始月
 * @param end 终止月
 */
export declare const monthDiff: (start: CalendarMonth, end: CalendarMonth) => number;
/**
 * 获取指定日期与今日相距信息和所在周信息
 * @param date 指定日期
 * @param withWeek 周首日
 */
export declare const getDateInfo: (date: CalendarDay, weekstart: number, withWeek?: boolean | number) => string;
export declare const sameMark: (m1?: Nullable<WcMark>, m2?: Nullable<WcMark>) => boolean;
export declare const sameSchedules: (as1?: Array<WcScheduleMark>, as2?: Array<WcScheduleMark>) => boolean;
export declare const sameAnnualMarkStyle: (s1?: WcAnnualDateStyle, s2?: WcAnnualDateStyle) => boolean;
export declare const sameAnnualMarks: (m1: WcAnnualMarks, m2?: WcAnnualMarks) => boolean;
export declare const sameAnnualSubs: (m1?: Array<WcAnnualSub>, m2?: Array<WcAnnualSub>) => boolean;
export declare const fillAnnualSubs: (uk: string, year: number, subinfos?: Array<WcAnnualSub>) => WcAnnualSub[] | undefined;
export declare const timestamp: (date: CalendarDay) => number;
export type WxCalendarPlugins<T extends WxCalendar<any>> = T extends WxCalendar<infer R> ? R : never;
interface ClearFilter {
    (plugin: PluginUse): boolean;
}
export declare class WxCalendar<T extends Array<PluginConstructor> = Array<PluginConstructor>> {
    /** 今天 */
    static today: CalendarDay;
    /** 预设插件 */
    private static _PLUGINS_;
    /** 插件服务 */
    service: PluginService<T>;
    constructor(component: CalendarInstance, services: T | Array<PluginUse<T>>);
    createMonth(mon: CalendarMonth, weekstart?: number): WcMonth;
    createYear(year: number, weekstart?: number): WcFullYear;
    static use<T extends PluginConstructor>(plugin: T, options?: ConstructorParameters<T>[0]): typeof WxCalendar;
    /**
     * 移除所有插件
     */
    static clearPlugin(): void;
    /**
     * 移除某个插件
     * @param key 插件 key
     */
    static clearPlugin<T extends PluginService = UsePluginService>(key: PluginKeys<ServicePlugins<T>>): void;
    /**
     * 移除符合条件的插件
     * @param filter 过滤条件
     */
    static clearPlugin(filter: ClearFilter): void;
}
export {};
