import { WeatherForecast } from "./components/WeatherForecast.tsx";
import PageHeader from "./components/PageHeader.tsx";
import { SearchForm } from "./components/SearchForm.tsx";
import { useState } from "react";
import type { WeatherResponse } from "./models/models.ts";
import {useTranslation} from "react-i18next";
import Select from "react-select";

const languageOptions = [
    { value: "en", label: "English 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦" },
    { value: "fr", label: "French 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸" },
]

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const getWeatherDataAndCity = (weatherData: WeatherResponse, city: string) => {
        setWeatherData(weatherData);
        setSelectedCity(city);
    }
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
      <>
          <PageHeader />
          <div className="bg-gradient-to-b from-[#cfd8df] to-[#b5c6d6] h-[calc(100vh-56px)] overflow-hidden">
              <div className="flex justify-end p-3">
                  <Select isSearchable={false} className="w-[140px] text-center text-sm" defaultValue={languageOptions[0]} onChange={(option) => {
                      changeLanguage(option!.value)
                  }} options={languageOptions} />
              </div>
              <div className={weatherData ?
                  "transition-all duration-1000 mx-auto pt-4 rounded-b-lg"
                  : "max-h-0 overflow-hidden pt-4 mx-auto"}>
                  {weatherData && selectedCity && (
                      <WeatherForecast selectedCity={selectedCity} weatherData={weatherData} />
                  )}
              </div>
              <div className="mx-auto w-[300px] sm:w-[350px] md:w-[350px] text-sm">
                  <SearchForm getWeatherDataAndCity={getWeatherDataAndCity} />
              </div>
          </div>
      </>
    )
}

export default App
