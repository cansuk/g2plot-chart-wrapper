// import React from 'react';
// import { LineOptions, BarOptions } from '@antv/g2plot';
// import { Plot, Options, G2, DualAxesOptions, GaugeOptions, BulletOptions, MixOptions, TreemapOptions } from '@antv/g2plot';



// //import { ContainerConfig } from '../../interface';

// export declare type AllBaseConfig = Options | DualAxesOptions | GaugeOptions | BulletOptions | MixOptions | TreemapOptions;
// export declare type ChartRefConfig = ((chart: Plot<AllBaseConfig>) => void) | React.MutableRefObject<Plot<AllBaseConfig> | undefined>;
// export declare type PlotEvent = G2.Event;

// export interface ContainerConfig<O extends AllBaseConfig = Options, P extends Plot<O> = Plot<O>> {
//     style?: React.CSSProperties;
//     className?: string;
//     loading?: boolean;
//     loadingTemplate?: React.ReactElement;
//     errorTemplate?: (e: Error) => React.ReactNode;
//     /**
//      * @title 图表渲染完成回调
//      */
//     onReady?: (chart: P) => void;
//     /**
//      * @description 任何其他的图形事件(仅对统计图表生效)
//      */
//     onEvent?: (chart: P, event: PlotEvent) => void;
//     /**
//      * @description 功能等同 onReady(仅对统计图表生效，不推荐使用)
//      * @deprecated
//      */
//     chartRef?: ChartRefConfig;
// }

// TODO LATER
// export interface LineConfig extends LineOptions, ContainerConfig<LineOptions> { }
// export interface BarConfig extends BarOptions, ContainerConfig<BarOptions> { }

// declare const LineChart: React.ForwardRefExoticComponent<LineConfig>;
// declare const BarChart: React.ForwardRefExoticComponent<BarConfig>;
// export { LineChart, BarChart };

// const useInit = <T extends Plot<any>, U extends Options>(ChartClass: any, config: U) => {
//     return {
//         chart: React.MutableRefObject < T | undefined >,
//         container: React.RefObject<HTMLDivElement>}
// };