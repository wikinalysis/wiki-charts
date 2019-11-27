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
  config: { height: number },
  chart: any,
  xAxis: any,
  yAxis: any
) => {
  chart
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + config.height + ")")
    .call(d3.axisBottom(xAxis));

  chart
    .append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yAxis));
};
