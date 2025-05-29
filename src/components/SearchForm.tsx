import { CountriesSelectMenu } from "./CountriesSelectMenu.tsx";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { getCoordinates, getWeatherByCoordinates } from "../services/service-weather.ts";
import { getCountriesByRegion } from "../services/service-country.ts";
import type { Country, WeatherResponse } from "../models/models.ts";
import {useTranslation} from "react-i18next";

type SearchFormProps = {
    getWeatherDataAndCity: (weatherData: WeatherResponse, city: string) => void;
}

const regionOptions = [
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'north_america', label: 'North America' },
    { value: 'oceania', label: 'Oceania' },
    { value: 'south_america', label: 'South America' }
]

export function SearchForm({getWeatherDataAndCity}: SearchFormProps) {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [countriesList, setCountriesList] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [citiesOptions, setCitiesOptions] = useState<{ value: string; label: string }[]>([]);
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    useEffect(() => {
        async function fetchCountries() {
            if (selectedRegion) {
                const res = await getCountriesByRegion(selectedRegion);
                setCountriesList(res.data);
            }
        }
        fetchCountries().then(r => r);
    }, [selectedRegion]);

    useEffect(() => {
        if (selectedCountry) {
            const currentCities = getCitiesByCountry(selectedCountry);
            const currentCitiesOptions = toOptions(currentCities);
            setCitiesOptions(currentCitiesOptions);
        }
    }, [selectedCountry]);

    const getSelectedCountry = (countryName: string) => {
        setSelectedCountry(countryName);
    }

    const toOptions = (cities: string[]) =>
        cities.map(city => ({
            value: city,
            label: city
        }));

    const getCitiesByCountry = (country: string) => {
        const found = countriesList.find(obj => {
            return obj.country.toLowerCase() === country.toLowerCase();
        });

        return found ? found.cities : [];
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedCountry && selectedCity) {
            const coordinates = await getCoordinates(selectedCity, selectedCountry);
            const lon: string = (coordinates.data[0].lon);
            const lat: string = (coordinates.data[0].lat);
            const language = i18n.language;

            const weatherData = await getWeatherByCoordinates(lon, lat, language);
            getWeatherDataAndCity(weatherData.data, selectedCity);
        }

    }

    return (
        <>
            <div className="bg-gray-200 rounded-md p-4">
                <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto space-y-3">
                    <Select onChange={(option) => {
                        setSelectedRegion(option ? option.value : null);
                    }} options={regionOptions} placeholder={t("searchRegionPlaceholder")} isSearchable={false} />
                    <CountriesSelectMenu getSelectedCountry={getSelectedCountry} countriesList={countriesList} />
                    <Select onChange={(option) => {
                        setSelectedCity(option ? option.value : null);

                    }} options={citiesOptions} placeholder={t("searchCityPlaceholder")} />
                    <button type="submit"
                            className="py-2.5 px-5 me-2 mt-1 text-sm font-medium text-gray-500 focus:outline-none
                            bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 cursor-pointer
                            focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
                            dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Find by city
                    </button>
                </form>
            </div>
        </>
    )
}
