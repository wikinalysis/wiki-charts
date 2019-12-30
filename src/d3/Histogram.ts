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
  xMax: number;
  yMax: number;
}

export const Histogram: D3Object<HistogramConfig<any>> = {
  create: (el, data, config) => {
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

    const bars = chart.selectAll("rect").data(data);
    bars.exit().remove();
    bars
      .enter()
      .append("rect")
      .merge(bars as any)
      .transition(t)
      .attr("height", (d: any) => config.height - yAxis(d.count))
      .attr("y", (d: any) => yAxis(d.count))
      .attr("x", (d: any) => xAxis(d.floor))
      .attr(
        "width",
        (d: any) => xAxis(d.ceiling as any) - xAxis(d.floor as number)
      )
      .style("fill", config.getColor);
    return undefined;
  },
  destroy: (_el, _config, _chart) => {
    return undefined;
  }
};
