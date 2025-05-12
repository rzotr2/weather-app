import { CountriesSelectMenu } from "./CountriesSelectMenu.tsx";
import { useEffect, useState } from "react";
import countriesWithCities from "../data/countriesWithCities.ts";
import Select from 'react-select'
import { getWeatherByCityAndCountryCode } from "../services/service.ts";

export function SearchForm() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [citiesOptions, setCitiesOptions] = useState<{ value: string; label: string }[]>([]);
    const getSelectedCountry = (country: string, countryCode: string) => {
        setSelectedCountry(country);
        setSelectedCountryCode(countryCode);
    };

    const toOptions = (cities: string[]) =>
        cities.map(city => ({
            value: city,
            label: city
        }));

    const getCitiesByCountry = (country: string) => {
        const found = countriesWithCities.find(obj => {
            return obj.name.toLowerCase() === country.toLowerCase();
        });

        return found ? found.cities : [];
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        getWeatherByCityAndCountryCode(selectedCity as string, selectedCountryCode as string);

    }

    useEffect(() => {
        if (selectedCountry) {
            const currentCities = getCitiesByCountry(selectedCountry);
            const currentCitiesOptions = toOptions(currentCities);
            setCitiesOptions(currentCitiesOptions);
        }
    }, [selectedCountry]);

    return (
        <>
            <div className="bg-gray-200 rounded-md w-[400px] ps-1">
                <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto space-y-5 p-3">
                    <CountriesSelectMenu getSelectedCountry={getSelectedCountry}/>
                    <Select onChange={(option) => {
                        setSelectedCity(option ? option.value : null)
                    }} options={citiesOptions} placeholder="Select or type name of a city..."/>
                    <button type="submit"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-500 focus:outline-none
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
