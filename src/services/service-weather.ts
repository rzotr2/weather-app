import axios from "axios";

const apiKey: string = import.meta.env.VITE_API_TOKEN;

export const getCoordinates = (city: string, countryCode: string) => {
    return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`);
}

export const getWeatherByCoordinates = (lon: string, lat: string) => {
    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
}

