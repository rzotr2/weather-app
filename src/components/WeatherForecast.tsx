import type { WeatherResponse } from "../models/models.ts";
import { Tabs } from "radix-ui";

import clouds from "../assets/icons/clouds.svg";
import cloudsDarkIcon from "../assets/icons/cloudsDarkIcon.svg";
import clear from "../assets/icons/clear.svg";
import atmosphere from "../assets/icons/atmosphere.svg";
import snow from "../assets/icons/snow.svg";
import snowDarkIcon from "../assets/icons/snowDarkIcon.svg";
import drizzle from "../assets/icons/drizzle.svg";
import drizzleDarkIcon from "../assets/icons/drizzleDarkIcon.svg";
import rain from "../assets/icons/rain.svg";
import rainDarkIcon from "../assets/icons/rainDarkIcon.svg";
import thunderstorm from "../assets/icons/thunderstorm.svg";
import thunderstormDarkIcon from "../assets/icons/thunderstormDarkIcon.svg";
import {useRef, useState} from "react";

type WeatherForecastProps = {
    weatherData: WeatherResponse;
    selectedCity: string;
}

export function WeatherForecast({weatherData, selectedCity}: WeatherForecastProps) {
    const [isActive, setIsActive] = useState<boolean>(true);
    const date = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const getNormalDate = (date: Date) => {
        const dd = date.getDate();
        const mm = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
        const yyyy = date.getFullYear();

        return `${dd}.${mm}.${yyyy}`;
    }

    function getNextDays(count: number): { day: string; date: string }[] {
        const days = [];
        const today = new Date();

        for (let i = 1; i <= count; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);

            const dayName = weekday[nextDate.getDay()];
            const dd = nextDate.getDate();
            const mm = nextDate.getMonth() + 1 >= 10 ? nextDate.getMonth() + 1 : "0" + (nextDate.getMonth() + 1);
            const yyyy = nextDate.getFullYear();
            const dateStr = `${dd}.${mm}.${yyyy}`;

            days.push({ day: dayName, date: dateStr });
        }
        return days;
    }

    const nextFourDays = getNextDays(4);

    const dayOfWeek = weekday[date.getDay()];
    const normalDate = getNormalDate(date);

    const getWeatherIconSrc = (weatherName: string, darkIcon?: boolean) => {
        switch(weatherName) {
            case ("Clouds"): {
                return darkIcon ? cloudsDarkIcon : clouds;
            } case ("Clear"): {
                return clear;
            } case ("Atmosphere"): {
                return atmosphere;
            } case ("Snow"): {
                return darkIcon ? snowDarkIcon : snow;
            } case ("Drizzle"): {
                return darkIcon ? drizzleDarkIcon : drizzle;
            } case ("Thunderstorm"): {
                return darkIcon ? thunderstormDarkIcon : thunderstorm;
            } case ("Rain"): {
                return darkIcon ? rainDarkIcon : rain;
            }
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeDate, setActiveDate] = useState(
        new Date(weatherData.hourly[0].dt * 1000).toLocaleDateString("uk-UA")
    );

    // Функція для визначення дати першої видимої картки
    function handleScroll(): void {
        if (!scrollRef.current) return;
        const children = Array.from(scrollRef.current.children) as HTMLDivElement[];
        for (const child of children) {
            const rect = child.getBoundingClientRect();
            const parentRect = scrollRef.current.getBoundingClientRect();
            if (rect.right > parentRect.left + 10) {
                const index = children.indexOf(child);
                const dateStr = new Date(weatherData.hourly[index].dt * 1000).toLocaleDateString("uk-UA");
                setActiveDate(dateStr);
                break;
            }
        }
    }

    const toggleClass = () => {
        setIsActive(!isActive);
    }

    return (
        <>
            <div className="w-[320px] sm:w-[400px] mx-auto items-center">
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List className="flex items-end">
                        <Tabs.Trigger
                            className={isActive ?
                                "inline-block w-full py-1 px-2 text-sm rounded-t-md text-gray-900 bg-gray-100"
                                : "inline-block w-full py-0.5 px-0.5 text-sm rounded-tl-md text-gray-900 bg-gray-400 cursor-pointer"}
                            value="tab1"
                            onClick={!isActive ? toggleClass : undefined}
                        >

                            Weather overview
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            className={isActive ?
                                "inline-block w-full py-0.5 px-2 text-sm rounded-tr-md text-gray-900 bg-gray-400 cursor-pointer"
                                : "inline-block w-full py-1 px-2 text-sm rounded-t-md text-gray-900 bg-gray-100"}
                            value="tab2"
                            onClick={isActive ? toggleClass : undefined}
                        >
                            Detailed preview
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">
                        <div className="flex items-center justify-center mb-4 cursor-default">
                            <div
                                className="w-2/5 flex flex-col items-center justify-center bg-gradient-to-br
                                       from-[#b7d1f8] to-[#e0e5ec] p-[10px] rounded-bl-xl">
                                <span className="text-xl font-bold text-gray-800 pb-1">{dayOfWeek}</span>
                                <span className="text-sm text-gray-600">{normalDate}</span>
                                <img src={getWeatherIconSrc(weatherData.current.weather[0].main)} alt="Partly cloudy"
                                     className="h-[60px] pb-2"/>
                                <span
                                    className="text-2xl font-semibold text-gray-800">{Math.round(weatherData.current.temp)}°C</span>
                                <span className="text-sm text-gray-700">{weatherData.current.weather[0].main}</span>
                            </div>
                            <div
                                className="w-3/5 bg-[#e0e5ec] flex flex-col justify-between rounded-br-xl p-2">
                                <div className="flex justify-between text-gray-700 text-sm pb-2">
                                    <div className="flex flex-col gap-1">
                                    <span>NAME</span>
                                        <span>TEMP</span>
                                        <span>HUMIDITY</span>
                                        <span>WIND</span>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end font-semibold pb-2">
                                        <span>{selectedCity}</span>
                                        <span>{Math.round(weatherData.current.temp)}°C</span>
                                        <span>{weatherData.current.humidity}%</span>
                                        <span>{weatherData.current.wind_speed} m/s</span>
                                    </div>
                                </div>
                                <div
                                    className="flex justify-between bg-[#e0e5ec] rounded-xl shadow-[1px_1px_1px_#b8bac0]">
                                    {nextFourDays.map((day, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center w-[50px] hover:scale-105
                                                       transition-all rounded-xl hover:bg-gray-800 hover:text-gray-100 group"
                                        >
                                            <img src={getWeatherIconSrc(weatherData.daily[index].weather[0].main)}
                                                 alt="Partly cloudy"
                                                 className="h-[25px] hidden group-hover:block"/>
                                            <img src={getWeatherIconSrc(weatherData.daily[index].weather[0].main, true)}
                                                 alt="Partly cloudy"
                                                 className="h-[25px] block group-hover:hidden"/>
                                            <span
                                                className="text-xs text-gray-700 group-hover:text-gray-200">{day.day.slice(0, 3)}</span>
                                            <span
                                                className="text-xs font-semibold text-gray-800 group-hover:text-gray-200 pb-1">
                                    {Math.round(weatherData.daily[index].temp.max)}°C
                                        </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2" className='w-[320px] sm:w-[400px] mx-auto pb-3 rounded-lg'>
                        <div className='h-full mx-auto bg-gradient-to-b from-[#e3ecf7] to-[#cfd8df] rounded-b-lg'>
                            <div className="pt-1 px-4">
                                <div className="text-center py-2 text-lg">
                                    <span>{`Today, ${getNormalDate(date)} in `}
                                        <span className="font-bold">{selectedCity + ":"}</span>
                                    </span>
                                </div>
                                <div className="gap-5 text-sm">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <span className="font-medium md:font-bold">Maximal temperature</span>
                                            <span>{`${Math.round(weatherData.daily[0].temp.max)}°C `}
                                                <span className="italic">{`(feels like ${Math.round(weatherData.daily[0].feels_like.day)}°C)`}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium md:font-bold">Minimal temperature</span>
                                            <span>{`${Math.round(weatherData.daily[0].temp.min)}°C `}
                                                <span className="italic">{`(feels like ${Math.round(weatherData.daily[0].feels_like.night)}°C)`}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium md:font-bold">Pressure</span>
                                            <span
                                                className={weatherData.daily[0].pressure > 1020
                                                    ? "text-red-500"
                                                    : weatherData.daily[0].pressure < 1000
                                                        ? "text-blue-500"
                                                        : "text-green-600"
                                                }
                                            >
                                                <span className="text-gray-800">{`${weatherData.daily[0].pressure}hPa `}</span>
                                            {weatherData.daily[0].pressure > 1020
                                                ? "(high)"
                                                : weatherData.daily[0].pressure < 1000
                                                    ? "(low)"
                                                    : "(normal)"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium md:font-bold">UV-index</span>
                                            <span
                                                className={
                                                    weatherData.daily[0].uvi >= 11
                                                        ? "text-fuchsia-600"
                                                        : weatherData.daily[0].uvi >= 8
                                                            ? "text-red-500"
                                                            : weatherData.daily[0].uvi >= 6
                                                                ? "text-yellow-500"
                                                                : weatherData.daily[0].uvi >= 3
                                                                    ? "text-green-600"
                                                                    : "text-blue-500"
                                                }
                                            >
                                                <span className="text-gray-800">{`${weatherData.daily[0].uvi} `}</span>
                                            {weatherData.daily[0].uvi >= 11
                                                ? "(extreme)"
                                                : weatherData.daily[0].uvi >= 8
                                                    ? "(very high)"
                                                    : weatherData.daily[0].uvi >= 6
                                                        ? "(high)"
                                                        : weatherData.daily[0].uvi >= 3
                                                            ? "(moderate)"
                                                            : "(low)"}
                                          </span>
                                        </div>
                                        <div className="justify-between flex">
                                            <span className="font-medium md:font-bold">Wind</span>
                                            <span>{`${weatherData.daily[0].wind_speed} m/s`}</span>
                                        </div>
                                        <div className="justify-between flex">
                                            <span className="font-medium md:font-bold">Participation probability</span>
                                            <span>{`${weatherData.daily[0].pop * 100}%`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-full pb-2">
                                <div className="sticky z-10 pt-3 px-3.5 font-medium text-sm">
                                    {activeDate}
                                </div>
                                <div className="flex justify-center w-full">
                                    <div className="snap-x snap-mandatory flex w-[95%]
                                      overflow-x-auto invisible-scrollbar bg-[#e0e5ec] rounded-xl
                                      space-x-1 scroll-smooth p-1"
                                         ref={scrollRef}
                                         onScroll={handleScroll}
                                    >
                                        {weatherData.hourly.map((hour, index) => {
                                            const hours = new Date(hour.dt * 1000).getHours().toString().padStart(2, "0");

                                            return (
                                                <div className="flex">
                                                    <div
                                                        key={index}
                                                        className="flex flex-col items-center min-w-[50px] max-w-[50px]
                                                          rounded-lg bg-white/70 transition-all duration-200
                                                          hover:scale-105 hover:bg-gray-800 hover:text-gray-100
                                                          group cursor-pointer snap-center py-1"
                                                    >
                                                        <img
                                                            src={getWeatherIconSrc(hour.weather[0].main)}
                                                            alt="Weather icon"
                                                            className="h-[26px] mb-1 hidden group-hover:block"
                                                        />
                                                        <img
                                                            src={getWeatherIconSrc(hour.weather[0].main, true)}
                                                            alt="Weather icon"
                                                            className="h-[26px] mb-1 block group-hover:hidden"
                                                        />
                                                        <span className="text-xs text-gray-700 group-hover:text-gray-200">
                                                            {`${hours}:00`}
                                                        </span>
                                                            <span
                                                                className="text-xs font-semibold text-gray-800 group-hover:text-gray-200">
                                                            {Math.round(hour.temp)}°C
                                                        </span>

                                                    </div>
                                                    <div>
                                                        {hours === "23" && (
                                                            <>
                                                                <div className="border-r-2 border-r-slate-400/70 h-[76px] ps-1 scale-y-110"></div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </>
    );
}
