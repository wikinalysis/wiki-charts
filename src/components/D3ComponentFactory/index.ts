import { createElement, Component, createRef } from "react";
import { D3Object, ID3Config } from "../../d3/d3.interfaces";

export interface D3ComponentProps {
  data: any[];
  config: ID3Config<any>;
}

const D3PlotComponentFactory = (D3Plot: D3Object<any>) => {
  return class D3PlotComponent extends Component<D3ComponentProps, any> {
    _chart: d3.Selection<any, any, any, any> | undefined = undefined;
    _rootNode: React.RefObject<any>;

    constructor(props: any) {
      super(props);
      this._rootNode = createRef();
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
      return createElement("div", {
        className: "line-container",
        ref: this._rootNode
      });
    }
  };
};

export { D3PlotComponentFactory };
