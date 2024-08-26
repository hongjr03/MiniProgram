import { CalendarHandler } from '../interface/component';
import type { CalendarMonth, WcFullYear } from '../interface/calendar';
interface CanvasElementSize {
    width: number;
    height: number;
}
interface Canvas extends CanvasElementSize {
    ctx: CanvasRenderingContext2D | null;
    canvas: HTMLCanvasElement | null;
    frame: number;
    state: PrinterState;
    rendered: boolean;
    year?: number;
}
declare enum PrinterState {
    minimize = 1,
    maximize = 2
}
export declare class YearPrinter extends CalendarHandler {
    private _canvas_;
    private _weeks_;
    private _week_size_;
    private _week_height_;
    private _week_padding_y_;
    private _date_size_;
    private _date_height_;
    private _pannel_padding_;
    private _month_padding_;
    private _title_size_;
    private _title_height_;
    private _title_padding_x_;
    private _title_padding_y_;
    private _mark_width_;
    private _mark_height_;
    private _checked_radius_max_;
    private _checked_offset_max_;
    /** 最大化状态下面板水平偏移量（根据选择月份计算） */
    private _translate_x_;
    /** 最大化状态下面板垂直偏移量（根据选择月份计算） */
    private _translate_y_;
    /** 日历组件左侧处于页面中的位置 */
    private _calendar_x_;
    /** 日历组件顶端处于页面中的位置 */
    private _calendar_y_;
    /** 非自定义页面导航栏的情况下年度面板需要考虑头部高度 */
    private _header_offset_;
    /** 字体 */
    private _font_;
    /** 处理系统深色模式的监听 */
    private _theme_listener_?;
    renderCheckedBg: boolean;
    initialize(): Promise<void>;
    private initializeSize;
    private initializeCanvas;
    private initializeRender;
    private renderFrame;
    private calcDateOuterHeight;
    private attachChecked;
    render(canvas: Canvas, year: WcFullYear, month?: number): void;
    private renderMonth;
    private renderMonthTitle;
    private renderWeek;
    private renderChecked;
    private renderDates;
    private renderMark;
    private renderDateBg;
    private dateBgRadius;
    /**
     * 是否周末日
     * @param wdx 周内index
     */
    private isWeekend;
    private requestAnimation;
    private requestAnimationFrame;
    private getCanvas;
    private inintializeTransform;
    /**
     * 检查有未初始化的画布
     * @param excludes 排除检查的画布索引
     */
    private checkInitializeRender;
    /**
     *  重置为最小化状态
     * @param canvas 画布
     * @param year 年度
     */
    renderMinimize(canvas: Canvas, year: WcFullYear): void;
    /**
     * 年度面板打开动画
     * @param mon 指定月份
     * @param rect 日历在页面的位置信息
     * @param prepose 动画开始之前的操作
     */
    open(mon: CalendarMonth, rect: WechatMiniprogram.BoundingClientRectCallbackResult, prepose?: () => void): Promise<void>;
    /**
     * 年度面板关闭动画
     * @param mon 指定月份
     */
    close(mon: CalendarMonth): Promise<void>;
    /**
     * 点击画布获取对应的月份
     * @param ydx 年度数组索引
     * @param x 点击位置水平坐标
     * @param y 点击位置垂直坐标
     */
    getTapMonth(ydx: number, x: number, y: number): Promise<CalendarMonth>;
    /**
     * 更新
     * @param idxs 年度数组索引
     */
    update(idxs?: number[]): void;
    /**
     * 绑定系统主题改变事件的监听
     */
    bindThemeChange(): void;
    /**
     * 移除系统主题改变事件的监听
     */
    cancelThemeChange(): void;
}
export {};
