import * as d3 from "d3";
import { D3Object, ID3Config } from "./d3.interfaces";
import {
  createSvgContainer,
  createYAxis,
  createDefaultTransition,
  appendAxes,
  transitionAxes
} from "./d3.utilities";

export interface TimeSeriesConfig<P> extends ID3Config<P> {
  xMin: string;
  xMax: string;
  yMax: number;
}

const parseDate = d3.timeParse("%Y%m");

const createTimeXAxis = (config: any) => {
  return d3
    .scaleTime()
    .domain([
      parseDate(config.xMin) || new Date(),
      parseDate(config.xMax) || new Date()
    ])
    .rangeRound([0, config.width]);
};

export const TimeSeries: D3Object<TimeSeriesConfig<any>> = {
  create: (el, data, config) => {
    const svg = createSvgContainer(el, config);

    const xAxis = createTimeXAxis(config);
    const yAxis = createYAxis(config);

    appendAxes(config, svg, xAxis, yAxis);

    return svg;
  },
  update: (_el, data, config, chart) => {
    const xAxis = createTimeXAxis(config);
    const yAxis = createYAxis(config);
    const t = createDefaultTransition();

    transitionAxes(chart, t, yAxis, xAxis);

    const bars = chart.selectAll("rect").data(data);
    bars.exit().remove();
    bars
      .enter()
      .append("rect")
      .merge(bars as any)
      .transition(t)
      .attr("height", (d: any) => config.height - yAxis(d.count))
      .attr("y", (d: any) => yAxis(d.count))
      .attr("x", (d: any) => xAxis(parseDate(d.floor) as any))
      .attr(
        "width",
        (d: any) =>
          xAxis(parseDate(d.ceiling) as any) - xAxis(parseDate(d.floor) as any)
      )
      .style("fill", config.getColor);
    return undefined;
  },
  destroy: (_el, _config, _chart) => {
    return undefined;
  }
};
