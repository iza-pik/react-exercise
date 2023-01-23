import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Grid,
  LoaderWrapper,
  StyledHeading,
  StyledDropdown,
  StyledTable,
  TableColumn,
  TableHeaderCell,
  StyledButton,
  StyledLabel,
  ChartDropdownWrapper,
  TableDropdownWrapper,
  ChartSectionWrapper,
  InfoBox,
} from "./Table.styles";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { API_URL, GENERIC_ERROR } from "../../constants/app.constants";
import { ResponseData } from "../../utils/types";
import { ClipLoader } from "react-spinners";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const tableHeaders = ["Time Series", "Open", "High", "Low", "Close", "Volume"];

// TODO: API key is needed to display stocks other than IBM, the stock selecting logic would need to be adapted but for now we are using the demo example
const stockSymbols = ["IBM", "GOOGL", "AAPL", "TSLA"];

export const Table: React.FC = (props: HighchartsReact.Props) => {
  const [timeSeriesData, setTimeSeriesData] = useState(
    [] as Array<{ time: string; data: any }>
  );
  const [isRequestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const [chartValue, setChartValue] = useState<string>("1. open");

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    title: {
      text: `${stockSymbols[0]} stock price in USD over time`,
    },
    subtitle: {
      text: "Select open, high, low, close or volume in the dropdown above.",
    },
    tooltip: {
      backgroundColor: "rgba(169, 222, 183, 0.75)",
      borderColor: "rgb(95, 186, 119)",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: "datetime",
      labels: { format: "{value:%d-%m-%Y}" },
    } as any,
    legend: {
      enabled: true,
    },
    yAxis: [
      {
        offset: 20,
      },
    ],
    series: [
      {
        name: "Daily price changes for selected stock",
        type: "spline",
        data: timeSeriesData.map((item) => [
          new Date(item.time),
          Number(item.data[chartValue]),
        ]),
        tooltip: {
          valueDecimals: 2,
        },
        lineWidth: 0.85,
      },
    ],
  };

  const getStockData = async (url: string | null) => {
    if (url) {
      setRequestError(null);
      setRequestLoading(true);
      try {
        const response: AxiosResponse<ResponseData> = await axios.get(url);
        const { data } = response;
        data &&
          setTimeSeriesData(
            Object.entries(data["Time Series (5min)"]).map((item) => ({
              time: item[0],
              data: item[1],
            }))
          );
      } catch (error: any) {
        toast.error(GENERIC_ERROR("fetching data"));
        setRequestError(error);
      } finally {
        setRequestLoading(false);
      }
    }
  };

  const filterByStartDate = (newStartDate: string) => {
    setStartDateTime(newStartDate);
  };

  const filterByEndDate = (newEndDate: string) => {
    setEndDateTime(newEndDate);
  };

  const filteredData = useMemo(() => {
    let data = timeSeriesData as Array<{ time: string; data: any }>;
    if (startDateTime) {
      data = data.filter((item) => item.time >= startDateTime);
    }
    if (endDateTime) {
      data = data.filter((item) => item.time <= endDateTime);
    }
    return data;
  }, [timeSeriesData, startDateTime, endDateTime]);

  const sortedAndFilteredData = filteredData
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .map((series, index) => {
      const { time, data } = series;
      return (
        <div key={index}>
          <Grid>
            <TableColumn>{new Date(time).toLocaleString()}</TableColumn>
            <TableColumn>{data["1. open"]}</TableColumn>
            <TableColumn>{data["2. high"]}</TableColumn>
            <TableColumn>{data["3. low"]}</TableColumn>
            <TableColumn>{data["4. close"]}</TableColumn>
            <TableColumn>{data["5. volume"]}</TableColumn>
          </Grid>
        </div>
      );
    });

  const dateTimes = useMemo(
    () =>
      filteredData
        .map((item) => item.time.toLocaleString())
        .sort(
          (a: any, b: any) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        ),
    [filteredData]
  );

  useEffect(() => {
    getStockData(API_URL(stockSymbols[0]));
  }, []);

  return requestError ? (
    <div>We have encountered an error</div>
  ) : isRequestLoading ? (
    <LoaderWrapper>
      <ClipLoader color="blue" size={120} aria-label="Loading Spinner" />
    </LoaderWrapper>
  ) : (
    <Fragment>
      <StyledHeading>
        {stockSymbols[0]} time series data every 5 minutes
      </StyledHeading>
      <TableDropdownWrapper>
        <StyledLabel htmlFor="startDate">Start:</StyledLabel>
        <StyledDropdown
          name="Start"
          id="startDate"
          onChange={(event) => filterByStartDate(event.target.value)}
        >
          <option value="">Select start date</option>
          {dateTimes.map((item) => (
            <option selected={startDateTime === item} value={item} key={item}>
              {item}
            </option>
          ))}
        </StyledDropdown>
        <StyledButton
          onClick={() => setStartDateTime("")}
          disabled={!startDateTime}
        >
          Clear start date
        </StyledButton>
        <StyledLabel htmlFor="endDate">End:</StyledLabel>
        <StyledDropdown
          name="End"
          id="endDate"
          onChange={(event) => filterByEndDate(event.target.value)}
        >
          <option value="">Select end date</option>
          {dateTimes.map((item) => (
            <option selected={endDateTime === item} value={item} key={item}>
              {item}
            </option>
          ))}
        </StyledDropdown>
        <StyledButton
          onClick={() => setEndDateTime("")}
          disabled={!endDateTime}
        >
          Clear end date
        </StyledButton>
      </TableDropdownWrapper>
      <div style={{ display: "flex" }}>
        <StyledTable>
          <Grid>
            {tableHeaders.map((header) => (
              <TableHeaderCell key={header}>{header}</TableHeaderCell>
            ))}
          </Grid>
          {sortedAndFilteredData}
        </StyledTable>
        <ChartSectionWrapper>
          <ChartDropdownWrapper>
            <StyledLabel htmlFor="stockOHLC">Price over time:</StyledLabel>
            <StyledDropdown
              name="stockOHLC"
              id="stockOHLC"
              onChange={(event) => setChartValue(event.target.value)}
            >
              <option value="">Select</option>
              {tableHeaders.map((item, index) => {
                const valString = `${index}. ${item.toLowerCase()}`;
                return index ? (
                  <option
                    selected={valString === chartValue}
                    value={valString}
                    key={item}
                  >
                    {item}
                  </option>
                ) : null;
              })}
            </StyledDropdown>
          </ChartDropdownWrapper>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            {...props}
          />
          {/* TODO: Any more info to add here, maybe with links to other sites */}
          <InfoBox>More {stockSymbols[0]} stock info...</InfoBox>
        </ChartSectionWrapper>
      </div>
    </Fragment>
  );
};
