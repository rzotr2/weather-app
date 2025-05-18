import axios from "axios";

export const getCountriesByRegion = (region: string) => {
    return axios.get(`https://rzotr2.github.io/weather-app/data/${region}.json`);
};
