import { CalendarHandler, CalendarInstance } from '../interface/component';
import { CalendarMonth } from '../interface/calendar';
export declare class AnnualPanelSwitch extends CalendarHandler {
    private _top_?;
    private _opacity_?;
    private _calendar_trans_?;
    private _calendar_alpha_?;
    private _style_ids_?;
    private _interactive_callbacks_;
    private _transforming_;
    constructor(instance: CalendarInstance);
    private initialize;
    /**
     * 绑定动画（年度面板，日历主体，日历头，日历拖拽bar）
     */
    private bindAnimations;
    /**
     * 日历头和drag bar的显示动画
     */
    private showCalendar;
    /**
     * 日历头和drag bar的隐藏动画
     */
    private hiddenCalendar;
    /**
     * 计算日历顶端在页面中的位置
     */
    private getCalendarRect;
    /**
     * 年度面板开关
     * @param show 开/关 true/false
     * @param mon  指定月份
     */
    switch(show: boolean, mon: CalendarMonth): Promise<void>;
    /**
     * 清理skyline渲染下所需要成员变量
     */
    clearSkyline(): void;
    /** 执行动画结束后的等待操作 */
    private execInteractiveCallbacks;
    /** 等待动画交互 */
    interaction(): Promise<void>;
}
