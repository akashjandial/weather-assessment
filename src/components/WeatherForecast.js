import React, { Component } from "react";
import { connect } from "react-redux";

import WeatherInformationTiles from "./WeatherInformationTiles";
import Dashboard from "./Dashboard";

const WeatherForecast = ({ data }) => {
    const { city, list } = data;
    const { name } = city;
  
    return (
      <div className="weather-wrapper-data">
        <Dashboard city={name} />
        <WeatherInformationTiles forecasts={list} />
      </div>
    );
};

export default WeatherForecast;