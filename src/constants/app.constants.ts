export const API_URL = (stockSymbol: string) =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&outputsize=full&apikey=demo`;
export const GENERIC_ERROR = (errorMsg: string) =>
  `There was an error ${errorMsg}. If the error persists, please contact us.`;
