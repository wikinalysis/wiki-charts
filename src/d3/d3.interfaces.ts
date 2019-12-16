import { RefObject } from "react";

export interface ID3Config<P extends any> {
  margin: { top: number; bottom: number; left: number; right: number };
  title: string;
  xLabel: string;
  yLabel: string;
  getColor: (v: P) => string;
  getX: (v: P) => any;
  height: number;
  width: number;
}

export interface D3Object<Config extends ID3Config<any>> {
  create: (el: RefObject<any>, data: any[], config: Config) => any;
  update: (el: RefObject<any>, data: any[], config: Config, chart: any) => void;
  destroy: (el: RefObject<any>, config: Config, chart: any) => void;
}
