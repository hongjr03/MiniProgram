import { VIEWS, View } from './constants';
import type { Voidable } from '../utils/shared';
import type { CalendarWeek, LayoutArea } from '../interface/component';
export type BoundingClientRects = Array<WechatMiniprogram.BoundingClientRectCallbackResult>;
export type ComponentInstance = WechatMiniprogram.Component.Instance<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;
export type CalendarView = (typeof VIEWS)[keyof typeof VIEWS];
export declare const viewFlag: (view: string, defaultView?: "month") => View;
export declare const isView: (view: unknown) => view is View;
export declare const flagView: (flag: number) => "week" | "month" | "schedule";
export declare const middle: (count: number) => number;
export declare const isSkyline: (renderer?: string) => renderer is "skyline";
export declare const circularDiff: (idx: number, curr: number) => number;
export declare const InitPanels: <T>(prefix: string, mixin?: Record<string, any>) => T[];
export declare const InitWeeks: (weeks?: string, prefix?: string) => CalendarWeek[];
export declare const nextTick: <T extends Voidable<(...args: any[]) => any> = undefined, R = T extends NonNullable<T> ? Awaited<ReturnType<T>> : void>(callback?: T | undefined) => Promise<R>;
export declare const severalTicks: (times: number) => Promise<void>;
/**
 * 绑定 worklet动画
 */
export declare const applyAnimated: (instance: ComponentInstance, selector: string, updater: WechatMiniprogram.Component.AnimatedUpdater, options?: WechatMiniprogram.Component.AnimatedUserConfig) => Promise<number>;
/**
 * 取消 worklet 动画绑定
 */
export declare const clearAnimated: (instance: ComponentInstance, selector: string, ids: Array<number>) => Promise<void>;
/**
 * 获取节点信息
 * @param component 组件实例
 */
export declare const nodeRect: (component: ComponentInstance) => (selector: string) => Promise<BoundingClientRects>;
/**
 * 获取页面偏移
 * @param component 组件实例
 */
export declare const viewportOffset: (component: ComponentInstance) => Promise<WechatMiniprogram.ScrollOffsetCallbackResult>;
/**
 * 合并字符串
 * @param strs 字符串
 * @param separator 分隔符，默认 ','
 */
export declare const mergeStr: (strs: Array<string>, separator?: string) => string;
export interface OnceEmiter {
    emit: (...detail: any[]) => void;
    cancel: () => void;
}
/** 触发一次 */
export declare const onceEmiter: (instance: ComponentInstance, event: string) => OnceEmiter;
export declare const layoutHideCls: (layout?: Array<LayoutArea>) => string;
export declare const addLayoutHideCls: (cls: string, area: LayoutArea) => string;
export declare const hasLayoutArea: (cls: string, area: LayoutArea) => boolean;
