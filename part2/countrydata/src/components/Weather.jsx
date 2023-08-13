import { useEffect, useState } from "react";
import WeatherService from "../services/WeatherService";

const Weather = ({ coordinates }) => {
  const [tempetureValues, setTemperatureValues] = useState([]);

  useEffect(() => {
    WeatherService.getWeather(coordinates).then((response) => {
      setTemperatureValues(response);
    });
  }, []);
  return (
    <div>
      <h3>Weather in {tempetureValues?.name}</h3>
      <p>Tempeture {tempetureValues.main.temp}º Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${tempetureValues.weather[0].icon}.png`}
      />
      <p>Wind {tempetureValues.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
