import * as React from "react";
import { ScatterPlot as D3Plot, ScatterPlotConfig } from "../../d3/ScatterPlot";
import { D3PlotComponentFactory } from "../D3ComponentFactory";

export interface IScatterPlotProps<P extends any> {
  data: P[];
  config: ScatterPlotConfig<P>;
}

const ScatterPlot: React.ComponentClass<
  IScatterPlotProps<any>,
  {}
> = D3PlotComponentFactory(D3Plot) as any;

export { ScatterPlot };
