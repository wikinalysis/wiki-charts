import * as React from "react";
import { Histogram as D3Plot, HistogramConfig } from "../../d3/Histogram";
import { D3PlotComponentFactory } from "../D3ComponentFactory";

export interface IHistogramProps<P extends any> {
  data: P[];
  config: HistogramConfig<P>;
}

const Histogram: React.ComponentClass<
  IHistogramProps<any>,
  {}
> = D3PlotComponentFactory(D3Plot) as any;

export { Histogram };
