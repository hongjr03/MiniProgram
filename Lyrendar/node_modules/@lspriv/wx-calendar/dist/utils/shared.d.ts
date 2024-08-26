export type PartRequired<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
export type Voidable<T> = T | undefined;
export type Nullable<T> = T | null;
export declare const isDate: (val: unknown) => val is Date;
export declare const isString: (val: unknown) => val is string;
export declare const isNumber: (val: unknown) => val is number;
export declare const isFunction: (val: unknown) => val is Function;
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
export declare const nonNullable: <T>(val: T) => val is NonNullable<T>;
export declare const isVoid: (val: unknown) => val is undefined;
export type Union<T> = T extends [infer R, ...infer P] ? R | Union<P> : never;
/** 下划线（snake_case）转小驼峰（lowerCamelCase） */
export type SnakeToLowerCamel<T extends string, K = Lowercase<T>> = K extends `${infer R}_${infer P}` ? `${R}${Capitalize<SnakeToLowerCamel<P, P>>}` : K;
/** 小驼峰（lowerCamelCase）转下划线（snake_case） */
export type LowerCamelToSnake<T extends string> = T extends `${infer R}${infer P}` ? R extends Lowercase<R> ? `${R}${LowerCamelToSnake<P>}` : `_${Lowercase<R>}${LowerCamelToSnake<P>}` : T;
export declare const camelToSnake: <T extends string>(str: T, separator?: string) => LowerCamelToSnake<T>;
type AllAwaited<T> = T extends [infer R, ...infer P] ? [Awaited<R>, ...AllAwaited<P>] : T extends Array<infer Q> ? Array<Awaited<Q>> : Awaited<T>;
export declare const promises: <T extends any[]>(all: T) => Promise<AllAwaited<T>>;
export declare const values: <T>(obj: Record<string, T>) => T[];
export declare const notEmptyObject: (val: Object) => boolean;
export declare const easingOpt: (duration: number, easing?: (...args: any[]) => any) => WechatMiniprogram.TimingOption;
export declare const omit: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) => Pick<T, Exclude<keyof T, K>>;
export declare const strToStyle: (str: string) => Record<string, string | number>;
export {};
