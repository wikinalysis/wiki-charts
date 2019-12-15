import * as React from "react";
import { TimeSeries as D3Plot, TimeSeriesConfig } from "../../d3/TimeSeries";
import { D3PlotComponentFactory } from "../D3ComponentFactory";

export interface ITimeSeriesProps<P extends any> {
  data: P[];
  config: TimeSeriesConfig<P>;
}

const TimeSeries: React.ComponentClass<
  ITimeSeriesProps<any>,
  {}
> = D3PlotComponentFactory(D3Plot) as any;

export { TimeSeries };
