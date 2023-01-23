export interface Metadata {
  information: string;
  symbol: string;
  lastRefreshed: string;
  interval: string;
  outputSize: string;
  timeZone: string;
}

export interface OHLC {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface SingleSeries {
  dateTime: string;
  OHLC: OHLC;
}

export interface TimeSeries {
  series: SingleSeries;
}

export interface ResponseData {
  metadata: Metadata;
  timeSeries: TimeSeries;
}
