import { OnceEmiter } from './tools';
import type { Union, SnakeToLowerCamel, LowerCamelToSnake, Nullable, Voidable } from '../utils/shared';
import type { CalendarData, CalendarEventDetail, CalendarInstance } from '../interface/component';
import type { CalendarDay, WcMonth, WcYear, MarkDict, CalendarMarkTypes, DateStyle, WcStyleMark, WcScheduleMark, WcMark, WcAnnualMarks, WcScheduleInfo, WcAnnualSub } from '../interface/calendar';
declare const PLUGIN_EVENT_HANDLE_PREFIX = "PLUGIN_ON_";
declare const PLUGIN_EVENT_INTERCEPT_PREFIX = "PLUGIN_CATCH_";
type PEH_PRE = typeof PLUGIN_EVENT_HANDLE_PREFIX;
type PEI_PRE = typeof PLUGIN_EVENT_INTERCEPT_PREFIX;
type Schedules = Array<WcScheduleMark>;
export type TrackDateResult = {
    [P in CalendarMarkTypes]?: MarkDict<P, WcStyleMark, Schedules, WcMark>;
};
export type TrackYearResult = {
    subinfo?: Array<WcAnnualSub>;
    marks?: WcAnnualMarks;
};
export interface EventIntercept {
    (signal?: number): never;
}
interface PluginInterception {
    /**
     * 捕获日期点击动作
     * @param service PliginService实例
     * @param event 事件
     * @param intercept 拦截
     */
    PLUGIN_CATCH_TAP?(service: PluginService, event: WechatMiniprogram.TouchEvent<{}, {
        wdx: number;
        ddx: number;
    }>, intercept: EventIntercept): void;
    /**
     * 捕获手动日期选中
     * @param service PliginService实例
     * @param date 日期
     * @param intercept 拦截
     */
    PLUGIN_CATCH_MANUAL?(service: PluginService, date: CalendarDay, intercept: EventIntercept): void;
}
interface PluginEventHandler {
    /**
     * 日历组件attche阶段
     * @param service PliginService实例
     * @param sets 视图初次渲染数据
     */
    PLUGIN_ON_ATTACH?(service: PluginService, sets: Partial<CalendarData>): void;
    /**
     * 日历组件onLoad事件触发
     * @param service PliginService实例
     * @param detail 事件详情数据
     */
    PLUGIN_ON_LOAD?(service: PluginService, detail: CalendarEventDetail, emiter: OnceEmiter): void;
    /**
     * 日期点击触发
     * @param service PliginService实例
     * @param detail 事件详情数据
     */
    PLUGIN_ON_CLICK?(service: PluginService, detail: CalendarEventDetail, emiter: OnceEmiter): void;
    /**
     * 日期变化触发
     * @param service PliginService实例
     * @param detail 事件详情数据
     */
    PLUGIN_ON_CHANGE?(service: PluginService, detail: CalendarEventDetail, emiter: OnceEmiter): void;
    /**
     * 视图变化触发
     * @param service PliginService实例
     * @param detail 事件详情数据
     */
    PLUGIN_ON_VIEWCHANGE?(service: PluginService, detail: CalendarEventDetail, emiter: OnceEmiter): void;
    /**
     * 视图变化触发
     * @param service PliginService实例
     */
    PLUGIN_ON_DETACHED?(service: PluginService): void;
}
export interface Plugin extends PluginEventHandler, PluginInterception {
    /**
     * PliginService初始化完成
     * @param service PliginService实例
     */
    PLUGIN_INITIALIZE?(service: PluginService): void;
    /**
     * 捕获日期
     * @param date 日期
     */
    PLUGIN_TRACK_DATE?(date: CalendarDay): Nullable<TrackDateResult>;
    /**
     * 捕获年份
     * @param year 年
     */
    PLUGIN_TRACK_YEAR?(year: WcYear): Nullable<TrackYearResult>;
    /**
     * 获取日程数据
     * @param date 日期
     * @param id plugin内部id
     */
    PLUGIN_TRACK_SCHEDULE?(date: CalendarDay, id?: string): Nullable<WcScheduleInfo>;
    /**
     * 对已提供的有效日期进行过滤
     * @param service PliginService实例
     * @param dates 日期数组
     */
    PLUGIN_DATES_FILTER?(service: PluginService, dates: Array<CalendarDay | DateRange>): Array<CalendarDay | DateRange>;
}
export interface PluginConstructor {
    new (options?: Record<string, any>): Plugin;
    /**
     * 插件 key
     */
    KEY: string;
    /**
     * 插件版本
     */
    VERSION?: string;
    /**
     * 日历组件版本
     */
    REQUIER_VERSION?: string;
    /**
     * 原型
     */
    readonly prototype: Plugin;
}
interface TraverseCallback {
    (plugin: Plugin, key: string): void;
}
type ConstructorUse<T extends Array<PluginConstructor>> = T extends Array<infer R> ? R : never;
export interface PluginUse<T extends Array<PluginConstructor> = Array<PluginConstructor>> {
    construct: ConstructorUse<T>;
    options?: Record<string, any>;
}
export interface AnnualResult {
    year: number;
    result: TrackYearResult;
}
type PluginMark<T> = T & {
    key: string;
};
export type PluginEntireMarks = {
    [P in CalendarMarkTypes]: Array<PluginMark<MarkDict<P, DateStyle, WcScheduleMark, WcMark>>>;
};
export type PluginKey<T> = T extends PluginConstructor ? T['KEY'] : never;
export type PluginKeys<T extends Array<PluginConstructor>> = T extends [
    infer R,
    ...infer P extends Array<PluginConstructor>
] ? PluginKey<R> | PluginKeys<P> : never;
type PluginInstance<T> = T extends abstract new (...args: any) => any ? InstanceType<T> : Plugin;
export type ServicePluginMap<T extends Array<PluginConstructor>> = {
    [P in Union<T> as PluginKey<P>]: PluginInstance<P>;
};
type PluginEventName<T> = T extends `${PEH_PRE}${infer R}` ? R : never;
type PluginInterceptName<T> = T extends `${PEI_PRE}${infer R}` ? R : never;
export type PluginEventNames = SnakeToLowerCamel<PluginEventName<keyof PluginEventHandler>>;
export type PluginInterceptNames = SnakeToLowerCamel<PluginInterceptName<keyof PluginInterception>>;
type PluginEventInterceptName<T extends PluginInterceptNames> = `${PEI_PRE}${Uppercase<LowerCamelToSnake<T>>}`;
type PluginInterceptDetail<T extends PluginInterceptNames> = Parameters<Required<PluginInterception>[PluginEventInterceptName<T>]>[1];
export type ServicePlugins<T> = T extends PluginService<infer R> ? R : never;
export type DateRange = [start: CalendarDay, end?: CalendarDay];
export type DateRanges = Array<DateRange>;
/**
 * 拦截器
 * @param signal 0直接退出循环，1继续循环但不执行默认行为
 */
export declare const intercept: (signal?: number) => never;
export declare class PluginService<T extends PluginConstructor[] = PluginConstructor[]> {
    /** 日历组件实例 */
    component: CalendarInstance;
    /** 插件队列 */
    private _plugins_;
    constructor(component: CalendarInstance, services: Array<PluginUse<T>>);
    private initialize;
    private walkForDate;
    private walkForYear;
    catchMonth(month: WcMonth): Promise<void>;
    catchYear(year: WcYear): Promise<void>;
    private setMonth;
    private setYear;
    private setDates;
    updateDates(dates?: Array<CalendarDay>): Promise<void>;
    /**
     * 范围更新
     */
    updateRange(range: DateRanges): Promise<void>;
    private setUpdateRecord;
    /**
     * 刷新年度面板
     */
    updateAnnuals(annuals?: Array<number>): Promise<void>;
    /**
     * 获取完整日期标记
     * @param date 日期
     */
    getEntireMarks(date: CalendarDay): PluginEntireMarks;
    /**
     * 响应事件
     * @param event 事件名
     * @param detail 事件详情数据
     */
    dispatchEvent<K extends PluginEventNames>(event: K, ...detail: any[]): void;
    /**
     * 事件拦截
     * @param event 事件名
     * @param action 默认行为
     */
    interceptEvent<K extends PluginInterceptNames, R extends any = any>(name: K, detail: PluginInterceptDetail<K>, action?: (...args: any[]) => R): R | void;
    /**
     * 获取插件
     * @param key 插件 key
     */
    getPlugin<K extends PluginKeys<T>>(key: K): Voidable<ServicePluginMap<T>[K]>;
    /**
     * 倒序遍历插件
     * @param callback 执行
     */
    traversePlugins(callback: TraverseCallback): void;
}
export {};
