import React, { Component } from "react";

import { connect } from "react-redux";
import { DEFAULT_LOCATION } from "./constants/openweather";
import { fetchData } from "./actions/weatherData";

import WeatherForecast from "./components/WeatherForecast";

@connect(store => {
  return {
    forecast: store.weatherStation.data
  };
})
export default class App extends Component {
  // When the app loads, we set the default location to fetch the  weather to Hongkong
  componentDidMount() {
    this.props.dispatch(fetchData(DEFAULT_LOCATION));
  }

  render() {
    const { forecast } = this.props;

    return forecast === null ? (
      <div className="loading">
        <div className="spinner">Loading...</div>
      </div>
    ) : (
      <div>
        <WeatherForecast data={forecast} />
      </div>
    );
  }
}
