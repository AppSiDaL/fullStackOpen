import axios from "axios";
const apikey = "ca059799713f9390c88d5671ced43b82";
const baseURL = (lat, lon, apikey) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

const getWeather = (coordinates) => {
  const request = axios.get(baseURL(coordinates[0], coordinates[1], apikey));
  return request.then((response) => response.data);
};


export default { getWeather };
