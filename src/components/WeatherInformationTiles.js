import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";
import { celsiusToFahrenheit, mphToKph } from "../utils/helpers";
import moment from "moment";

export default class WeatherInformationTiles extends Component {
  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  _groupByDays = data => {
    return data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {});
  };

  // Returns week of the day
  _getDayInfo = data => {
    return moment.unix(data[0].dt).format("dddd");
  };

  // Fetches the icon using the icon code available in the forecast data.
  _getIcon = data =>
    `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

  // Gets the Minimum, Maximum temperatures of the day, along with the conditions and windspeed.
  _getInfo = (data, min = [], max = [], wind = [], conditions = []) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      wind.push(item.wind);
      conditions.push(item.weather[0]);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max))
    };

    const fahMinMax = {
      min: celsiusToFahrenheit(minMax.min),
      max: celsiusToFahrenheit(minMax.max)
    };

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`Max: ${minMax.max}°C (${fahMinMax.max}°F)`} / </strong>
          {`Min: ${minMax.min}°C (${fahMinMax.min}°F)`}
        </div>
        <div className="more-info">{`Conditions: ${conditions[0].description}`}</div>
        <div className="more-info">{`Wind Speed: ${
          wind[0].speed
        } Km/hr (${mphToKph(wind[0].speed)} Mp/hr) `}</div>
      </div>
    );
  };

  // Toggles accordion to display hourly weather information
  _showMoreInfo = index => {
    const elm = this.refs[`div-${index}`];
    const expandedElment = document.querySelector(".expanded");

    elm.classList.add("expanded");
    expandedElment !== null && expandedElment.classList.remove("expanded");
  };

  render() {
    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));

    // The webservice returns data for 6 calendar days during evenings as a result of offset,
    // this ensures that we are showing only 5-days of forecast.
    const WeatherInformationTiles =
      tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <div className="forecast-tiles">
        {WeatherInformationTiles.map((item, i) => (
          <div
            className={`forecast-tile tile-${i}`}
            key={i}
            ref={`div-${i}`}
            onClick={() => {
              this._showMoreInfo(i);
            }}
          >
            <div className="primary-info">
              <div className="icon">
                <img src={this._getIcon(item)} />
                {this._getDayInfo(item)}
              </div>
              {this._getInfo(item)}
            </div>
            <div className="detailed-info" key={i}>
              <DetailedInfo data={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
