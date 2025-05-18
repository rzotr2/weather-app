import { WeatherForecast } from "./components/WeatherForecast.tsx";
import PageHeader from "./components/PageHeader.tsx";
import { SearchForm } from "./components/SearchForm.tsx";
import { useState } from "react";
import type { WeatherResponse } from "./models/models.ts";

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const getWeatherDataAndCity = (weatherData: WeatherResponse, city: string) => {
        setWeatherData(weatherData);
        setSelectedCity(city);
    }

    return (
      <>
          <PageHeader />
          <div className="bg-gradient-to-b from-[#cfd8df] to-[#b5c6d6] min-h-screen">
              <div className={weatherData ?
                  "transition-all duration-1000 mx-auto pt-4 rounded-b-lg"
                  : "max-h-0 overflow-hidden"}>
                  {weatherData && selectedCity && (
                      <WeatherForecast selectedCity={selectedCity} weatherData={weatherData} />
                  )}
              </div>
              <div className="mx-auto w-[350px] md:w-[300px] text-sm">
                  <SearchForm getWeatherDataAndCity={getWeatherDataAndCity} />
              </div>
          </div>
      </>
    )
}

export default App
