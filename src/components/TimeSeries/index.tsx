import * as React from "react";
import { TimeSeries as D3Plot, TimeSeriesConfig } from "../../d3/TimeSeries";

export interface ITimeSeriesProps<P extends any> {
  data: P[];
  config: TimeSeriesConfig<P>;
}

class TimeSeries extends React.Component<any, any> {
  _chart: d3.Selection<any, any, any, any> | undefined = undefined;
  _rootNode: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this._rootNode = React.createRef();
  }

  componentDidMount() {
    this._chart = D3Plot.create(
      this._rootNode.current,
      this.props.data,
      this.props.config
    );
  }

  componentDidUpdate() {
    D3Plot.update(
      this._rootNode.current,
      this.props.data,
      this.props.config,
      this._chart
    );
  }

  componentWillUnmount() {
    D3Plot.destroy(this._rootNode.current, this.props.config, this._chart);
  }

  render() {
    return <div className="line-container" ref={this._rootNode} />;
  }
}

export { TimeSeries };
