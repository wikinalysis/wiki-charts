import * as d3 from "d3";
import { ID3Config } from "./d3.interfaces";
import { RefObject } from "react";

// Clever math to find a sensible axis limit based on the highest value
export const calculateAxisFromMax = (max: number): number => {
  return max + (max % Math.pow(10, Math.floor(Math.log10(max))));
};

export const createDefaultTransition = () =>
  d3.transition().duration(500) as any;

export const createYAxis = (config: { yMax: number; height: number }) => {
  return d3
    .scaleLinear()
    .domain([0, calculateAxisFromMax(config.yMax)])
    .range([config.height, 0]);
};

export const createXAxis = (config: { xMax: number; width: number }) => {
  return d3
    .scaleLinear()
    .domain([0, calculateAxisFromMax(config.xMax)])
    .range([0, config.width]);
};

export const createSvgContainer = (
  el: RefObject<any>,
  config: ID3Config<any>
) => {
  return d3
    .select(el as any)
    .append("svg")
    .attr("width", config.width + config.margin.left + config.margin.right)
    .attr("height", config.height + config.margin.top + config.margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + config.margin.left + "," + config.margin.top + ")"
    );
};

export const appendAxes = (
  config: ID3Config<{}>,
  chart: any,
  xAxis: any,
  yAxis: any
) => {
  const { height, width, margin, title, xLabel, yLabel } = config;

  // Add X Axis
  chart
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis));

  // Add Y Axis
  chart
    .append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yAxis));

  // Add Title
  chart
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text(title);

  // Add X Axis Label
  chart
    .append("text")
    .attr("class", "x-axis-label")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    .style("text-anchor", "middle")
    .text(xLabel);

  // Add Y Axis Label
  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "y-axis-label")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(yLabel);
};
