export declare const VERSION: string;
/** 大于3的奇数 */
export declare const CALENDAR_PANELS = 3;
/** 纯数据字段 */
export declare const PURE_PROPS: RegExp;
/** 字体 */
export declare const FONT = "ui-sans-serif";
export declare const WEEKS = "\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D";
export declare const FULL_LAYOUT: readonly ["header", "title", "subinfo", "today", "viewbar", "dragbar"];
export declare const GREGORIAN_MONTH_DAYS: readonly [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export declare const MS_ONE_DAY = 86400000;
export declare const VIEWS: {
    readonly WEEK: "week";
    readonly MONTH: "month";
    readonly SCHEDULE: "schedule";
};
export declare enum View {
    week = 1,
    month = 2,
    schedule = 4
}
export declare const SELECTOR: {
    readonly CALENDAR: "#calendar";
    readonly WEEK_ITEM: ".wc__week-item";
    readonly PANEL_HEADER: ".wc__header";
    readonly PANEL_SWIPER: ".wc__panel-swiper";
    readonly PANEL_CONTAINER: "#panel";
    readonly PANEL: ".wc__panel--idx-";
    readonly VIEW_BAR: "#view_bar";
    readonly VIEW_BAR_1: "#view_bar_1";
    readonly VIEW_BAR_2: "#view_bar_2";
    readonly SCHEDULES: ".wc__panel-schedules";
    readonly BAR: ".wc__bar";
    readonly BAR_1: "#control_1";
    readonly BAR_2: "#control_2";
    readonly ANNUAL: ".wc__annual";
    readonly ANNUAL_SWIPER: ".wc__annual-panel-swiper";
    readonly ANNUAL_CANVAS: "#printer_";
};
