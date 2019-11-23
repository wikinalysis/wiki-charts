import * as React from "react";
import { D3ScatterPlot } from "./D3ScatterPlot";

export interface IChartConfig<P extends any> {
  margin: { top: number; bottom: number; left: number; right: number };
  getColor: (v: P) => string;
  getX: (v: P) => any;
  getY: (v: P) => any;
  height: number;
  width: number;
  xMax: number;
  yMax: number;
}

export interface IScatterPlotProps<P extends any> {
  data: Record<string, P>[];
  config: IChartConfig<P>;
}

class ScatterPlot extends React.Component<any, any> {
  _chart: d3.Selection<any, any, any, any> | undefined = undefined;
  _rootNode: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this._rootNode = React.createRef();
  }

  componentDidMount() {
    this._chart = D3ScatterPlot.create(
      this._rootNode.current,
      this.props.data,
      this.props.config
    );
  }

  componentDidUpdate() {
    D3ScatterPlot.update(
      this._rootNode.current,
      this.props.data,
      this.props.config,
      this._chart
    );
  }

  componentWillUnmount() {
    D3ScatterPlot.destroy(this._rootNode.current);
  }

  render() {
    return <div className="line-container" ref={this._rootNode} />;
  }
}

export { ScatterPlot };
