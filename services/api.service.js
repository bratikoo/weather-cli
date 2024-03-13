//import https from 'https';
import axios from 'axios';
import { getKeyValue } from './storage.service.js';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const token = process.env.TOKEN ?? await getKeyValue('token');

const getGeoByCity = async (city) => {
  if (!token) {
    throw new Error('api key is not set, set it using the -t [API_KEY] command.')
  }
  const { data } = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: token,
    }
  })
  return data;
}


const getWeather = async () => {
  if (!token) {
    throw new Error('api key is not set, set it using the -t [API_KEY] command.')
  }
  const city = process.env.CITY ?? await getKeyValue('city');
  const { coord } = await getGeoByCity(city);
  const { data } = await axios.get(BASE_URL, {
    params: {
      lat: coord.lat,
      lon: coord.lon,
      appid: token,
      units: 'metric'
    }
  })
  return data;

  // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  // url.searchParams.append('lat', lat)
  // url.searchParams.append('lon', lon)
  // url.searchParams.append('appid', token)
  // url.searchParams.append('units', 'metric')

  // https.get(url, (response) => {
  //   let res = '';
  //   response.on('data', (chunk) => {
  //     res += chunk;
  //   });

  //   response.on('end', () => {
  //     console.log(res);
  //   })
  // })
};

export { getWeather };