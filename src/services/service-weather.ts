import axios from "axios";

const apiKey: string = import.meta.env.VITE_API_TOKEN;
// const BASE_URL: string = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={${apiKey}`;

// export const getWeatherByCityAndCountryCode = (city: string, countryCode: string) => {
//     return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
// }

export const getCoordinates = (city: string, countryCode: string) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`);
}

export const getWeatherByCoordinates = (lon: string, lat: string) => {
    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
}

