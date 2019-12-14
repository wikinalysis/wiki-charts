import * as d3 from "d3";
import { D3Object, ID3Config } from "./d3.interfaces";
import {
  createSvgContainer,
  createYAxis,
  createDefaultTransition,
  appendAxes
} from "./d3.utilities";
import { Bin } from "d3";

export interface TimeSeriesConfig<P> extends ID3Config<P> {
  xMin: string;
  xMax: string;
}

const createTimeSeries = (config: TimeSeriesConfig<any>, xAxis: any) => {
  return d3
    .histogram()
    .value(v => v)
    .domain(xAxis.domain())
    .thresholds(xAxis.ticks(d3.timeMonth));
};

const safeLength = (yAxis: any, d: any) => {
  const length = yAxis(d.length);
  return !isNaN(length) ? length : 0;
};

const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

export const TimeSeries: D3Object<TimeSeriesConfig<any>> = {
  create: (el, data, config) => {
    const svg = createSvgContainer(el, config);
    const xAxis = d3
      .scaleTime()
      .domain([
        parseDate(config.xMin) || new Date(),
        parseDate(config.xMax) || new Date()
      ])
      .rangeRound([0, config.width]);
    const histogram = createTimeSeries(config, xAxis);
    const newData = data
      .map(d => parseDate(config.getX(d)))
      .filter(d => d != null) as Date[];
    const bins = histogram(newData as any);
    const yAxis = createYAxis({
      yMax: d3.max(bins, d => d.length) || 0,
      height: config.height
    });

    appendAxes(config, svg, xAxis, yAxis);

    return svg;
  },
  update: (el, data, config, chart) => {
    const xAxis = d3
      .scaleTime()
      .domain([
        parseDate(config.xMin) || new Date(),
        parseDate(config.xMax) || new Date()
      ])
      .rangeRound([0, config.width]);
    const histogram = createTimeSeries(config, xAxis);
    const newData = data
      .map(d => parseDate(config.getX(d)))
      .filter(d => d != null) as Date[];
    const bins = histogram(newData as any);
    const yAxis = createYAxis({
      yMax: d3.max(bins, d => d.length) || 0,
      height: config.height
    });
    const t = createDefaultTransition();

    chart
      .select(".x")
      .transition(t)
      .call(d3.axisBottom(xAxis) as any);
    chart
      .select(".y")
      .transition(t)
      .call(d3.axisLeft(yAxis) as any);

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

    return undefined;
  },
  destroy: (el, config, chart) => {
    return undefined;
  }
};
