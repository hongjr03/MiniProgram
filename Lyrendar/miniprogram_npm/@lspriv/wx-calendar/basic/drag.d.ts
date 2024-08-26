import { CalendarHandler, CalendarInstance } from '../interface/component';
import { View } from './constants';
/**
 * skyline渲染下的面板拖拽控制器
 */
export declare class Dragger extends CalendarHandler {
    /** 保存动画id */
    private _style_ids_;
    /** 保存当前面板的日程样式选择器 */
    private _schdule_selector_?;
    constructor(instance: CalendarInstance);
    /**
     * 初始化动画变量
     */
    private initailizeShared;
    /**
     * 更新当前面板索引和偏移量
     */
    update(): void;
    /**
     * 绑定动画
     */
    bindAnimations(): void;
    /**
     * 绑定日历容器动画，主要是整体高度变化
     */
    private bindContainerAnimation;
    /**
     * 绑定面板动画，主要是垂直方向偏移量变化
     */
    private bindPanelAnimation;
    /**
     * 绑定地步控制条动画，主要是角度变化
     */
    private bindBarAnimation;
    /**
     * 绑定视图控制条动画，主要是水平偏移量变化
     */
    private bindViewBarAnimation;
    /**
     * 绑定日程动画，主要是透明度变化
     */
    bindScheduleAnimation(): Promise<void>;
    /**
     * 清除日程动画绑定
     */
    private clearScheduleAnimation;
    /**
     * 计算面板偏移量
     * @param idx 面板索引
     * @param checked 当前选中日期
     */
    private calcPanelOffset;
    /**
     * 设置面板偏移量
     */
    private setPanelTrans;
    /**
     * 处理拖拽结束
     * @param velocity 拖拽结束时纵向速度
     */
    dragout(velocity: number): Promise<View>;
    /**
     * 跳转到视图
     * @param view 要跳转的视图
     * @param animate 是否动画，默认否
     */
    toView(view: View, animate?: boolean): Promise<void>;
    /**
     * 清除拖拽控制器实例
     */
    clear(): void;
}
