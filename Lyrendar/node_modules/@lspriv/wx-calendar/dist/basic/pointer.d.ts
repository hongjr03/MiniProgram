import { CalendarHandler } from '../interface/component';
import type { CalendarDay } from '../interface/calendar';
import type { CalendarData } from '../interface/component';
export interface CalendarPointer {
    x: string | number;
    y: string | number;
    show: boolean;
    animate: boolean;
    transition: boolean;
}
export declare const createPointer: (opts?: Partial<CalendarPointer>) => CalendarPointer;
/**
 * 这个最开始是分skyline和webview渲染的，
 * skyline用worklet动画控制，webview用wxs事件changeprop控制，这样最好不过了
 * 后为了方便，skyline和webview又同时有效，就用了一套控制
 * TODO: skyline和worklet分开?
 */
export declare class Pointer extends CalendarHandler {
    /** 控制显隐 */
    show: boolean;
    private _vibrate_;
    update(sets?: Partial<CalendarData>, vibrate?: boolean, checked?: CalendarDay, flush?: boolean): void;
    animationEnd(): void;
    resetOffsetY(date: CalendarDay): Promise<void>;
}
