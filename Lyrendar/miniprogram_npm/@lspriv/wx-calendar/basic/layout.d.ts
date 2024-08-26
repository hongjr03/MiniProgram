import { View } from './constants';
export interface CalendarLayout {
    readonly maxHeight: number;
    readonly mainHeight: number;
    readonly minHeight: number;
    readonly menuTop: number;
    readonly menuBottom: number;
    readonly windowWidth: number;
    readonly windowHeight: number;
    readonly dragMax: number;
    readonly safeBottom: number;
    readonly maxScheduleSize: number;
}
export type Theme = 'light' | 'dark';
export declare class Layout {
    static layout?: CalendarLayout;
    /** 深浅模式是否开启 */
    static darkmode: boolean;
    /** 深浅模式 */
    static theme?: Theme;
    /** 设备像素比 */
    static dpr: number;
    /** 常规状态下（月视图）的日历主面板高度，单位rpx */
    static CalendarMainHeight: number;
    /** 日历头部高度，单位rpx */
    static CalendarHeaderHeight: number;
    /** 星期容器高度，单位rpx */
    static CalendarWeekHeight: number;
    /** 底部bar容器高度，单位rpx */
    static CalendarBarHeight: number;
    /** 日历最大高度下留余高度，单位rpx */
    static CalendarSpareHeight: number;
    static initialize(): void;
    private static calcSchedulesMaxSize;
    static rpxToPx(rpx: number, windowWidth?: number): number;
    static viewHeight(view: View): number | undefined;
}
