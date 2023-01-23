# React Coding Exercise

Upload your solution on github and share the link. Add a screenshot of the final rendered application.

## API

https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo

Documentation
https://www.alphavantage.co/documentation/#intraday

## Requirements

- Fetch time series data using the above api
- Display tabular data
- Visualise the data
  Nice to have
- Ability to filter data and chart based on date/time range
- Ability to switch stock symbol

You can use any third-party library as suited to achieve the above requirements

## Comments

This React app includes a simple visualisation of data in a table and chart (Highcharts), was set up with Typescript, styled-components and a few other dependencies.

It is a work in progress.

TODOs:

- Add tests
- Refactor code
- Extend chart functionality
- Improve styling, set up theme
- Get API key to enable displaying different stocks
- Improve types
- More responsiveness
- Accessibility
- Change favicon.
