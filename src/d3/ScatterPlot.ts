import * as d3 from "d3";
import { D3Object, ID3Config } from "./d3.interfaces";
import {
  createXAxis,
  createYAxis,
  createSvgContainer,
  createDefaultTransition,
  appendAxes,
  transitionAxes
} from "./d3.utilities";

export interface ScatterPlotConfig<P> extends ID3Config<P> {
  getY: (d: P) => number;
  xMax: number;
  yMax: number;
}

export const ScatterPlot: D3Object<ScatterPlotConfig<any>> = {
  create: (el, _data, config) => {
    const svg = createSvgContainer(el, config);

    const xAxis = createXAxis(config);
    const yAxis = createYAxis(config);

    appendAxes(config, svg, xAxis, yAxis);

    return svg;
  },
  update: (_el, data, config, chart) => {
    const xAxis = createXAxis(config);
    const yAxis = createYAxis(config);
    const t = createDefaultTransition();

    transitionAxes(chart, t, yAxis, xAxis);

    const points = chart.selectAll("circle").data(data);
    points.exit().remove();
    points
      .enter()
      .append("circle")
      .merge(points as any)
      .transition(t)
      .attr("cx", (d: any) => xAxis(config.getX(d)))
      .attr("cy", (d: any) => yAxis(config.getY(d)))
      .attr("r", 1.5)
      .style("fill", config.getColor);
  },
  destroy: (_el, _config, _chart) => {
    return undefined;
  }
};
