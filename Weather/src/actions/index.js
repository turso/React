import axios from 'axios';

const API_KEY = 'c6f77b51438aa70e0e490e55ff873496';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},fi`;
	const request = axios.get(url);

	// console.log('Request:', request);

	return {
		type: FETCH_WEATHER,
		payload: request
	};
}