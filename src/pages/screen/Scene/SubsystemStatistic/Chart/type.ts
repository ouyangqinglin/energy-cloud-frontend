export type ChartRes = {
  value: number;
  ts: string;
  field?: string;
}[];

export type ChartData = {
  value: number;
  date: string;
  field: string;
}[];

export type ChartMapType = Record<
  string,
  {
    name: string;
    unit: string;
  }
>;
