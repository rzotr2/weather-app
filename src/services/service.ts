import axios from "axios";

const apiKey: string = import.meta.env.VITE_API_TOKEN;
// const BASE_URL: string = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={${apiKey}`;

export const getWeatherByCityAndCountryCode = async (city: string, countryCode: string) => {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`);
    return console.log(data.data);
}