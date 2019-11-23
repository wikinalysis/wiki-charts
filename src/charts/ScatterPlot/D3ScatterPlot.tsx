import * as d3 from "d3";
import { RefObject } from "react";
import { IChartConfig, IScatterPlotProps } from "../ScatterPlot/ScatterPlot";

const createLinearAxis = (max: number, range: number[]) => {
  return d3
    .scaleLinear()
    .domain([0, max])
    .range(range);
};

export const D3ScatterPlot = {
  create: (
    el: RefObject<any>,
    data: IScatterPlotProps<any>["data"],
    configuration: IChartConfig<any>
  ) => {
    const svg = d3
      .select(el as any)
      .append("svg")
      .attr(
        "width",
        configuration.width +
          configuration.margin.left +
          configuration.margin.right
      )
      .attr(
        "height",
        configuration.height +
          configuration.margin.top +
          configuration.margin.bottom
      )
      .append("g")
      .attr(
        "transform",
        "translate(" +
          configuration.margin.left +
          "," +
          configuration.margin.top +
          ")"
      );
    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, configuration.xMax])
      .range([0, configuration.width]);
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + configuration.height + ")")
      .call(d3.axisBottom(x));

    var y = d3
      .scaleLinear()
      .domain([0, configuration.yMax])
      .range([configuration.height, 0]);
    svg
      .append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y));

    return svg;
  },
  update: (
    el: RefObject<any>,
    data: IScatterPlotProps<any>["data"],
    configuration: IChartConfig<any>,
    chart: d3.Selection<SVGGElement, unknown, null, undefined> | undefined
  ) => {
    if (chart === undefined) return undefined;
    const t = d3.transition().duration(500) as any;
    const xAxis = createLinearAxis(configuration.xMax, [
      0,
      configuration.width
    ]);
    const yAxis = createLinearAxis(configuration.yMax, [
      configuration.height,
      0
    ]);
    chart
      .select(".x")
      .transition(t)
      .call(d3.axisBottom(xAxis) as any);
    chart
      .select(".y")
      .transition(t)
      .call(d3.axisLeft(yAxis) as any);
    const points = chart.selectAll("circle").data(data);
    points.exit().remove();
    points
      .enter()
      .append("circle")
      .merge(points as any)
      .transition(t)
      .attr("cx", d => xAxis(configuration.getX(d)))
      .attr("cy", d => yAxis(configuration.getY(d)))
      .attr("r", 1.5)
      .style("fill", d => (d.language === "tn" ? "#0F0" : "#F00"));
  },
  destroy: (el: RefObject<any>) => {
    return undefined;
  }
};
