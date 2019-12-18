import * as d3 from "d3";
import { D3Object, ID3Config } from "./d3.interfaces";
import {
  createXAxis,
  createSvgContainer,
  createYAxis,
  createDefaultTransition,
  appendAxes,
  transitionAxes
} from "./d3.utilities";
import { Bin } from "d3";

export interface HistogramConfig<P> extends ID3Config<P> {
  binCount: number;
  xMax: number;
}

const createHistogram = (config: HistogramConfig<any>, xAxis: any) => {
  return d3
    .histogram()
    .value(config.getX)
    .domain(xAxis.domain())
    .thresholds(xAxis.ticks(config.binCount));
};

const safeLength = (yAxis: any, d: any) => {
  const length = yAxis(d.length);
  return !isNaN(length) ? length : 0;
};

export const Histogram: D3Object<HistogramConfig<any>> = {
  create: (el, data, config) => {
    const svg = createSvgContainer(el, config);

    const xAxis = createXAxis(config);
    const histogram = createHistogram(config, xAxis);
    const bins = histogram(data as any[]);
    const yAxis = createYAxis({
      yMax: d3.max(bins, d => d.length) || 0,
      height: config.height
    });

    appendAxes(config, svg, xAxis, yAxis);

    return svg;
  },
  update: (_el, data, config, chart) => {
    const xAxis = createXAxis(config);
    const histogram = createHistogram(config, xAxis);
    const bins = histogram(data as any[]);
    const yAxis = createYAxis({
      yMax: d3.max(bins, d => d.length) || 0,
      height: config.height
    });
    const t = createDefaultTransition();

    transitionAxes(chart, t, yAxis, xAxis);

    const points = chart.selectAll("rect").data(bins);
    points.exit().remove();
    points
      .enter()
      .append("rect")
      .merge(points)
      .transition(t)
      .attr("x", 1)
      .attr(
        "transform",
        (d: Bin<number, number>) =>
          `translate(${xAxis(d.x0 as any)}, ${safeLength(yAxis, d)})`
      )
      .attr(
        "width",
        (d: Bin<number, number>) => xAxis(d.x1 as any) - xAxis(d.x0 as number)
      )
      .attr(
        "height",
        (d: Bin<number, number>) => config.height - safeLength(yAxis, d)
      )
      .style("fill", config.getColor);
  },
  destroy: (_el, _config, _chart) => {
    return undefined;
  }
};
