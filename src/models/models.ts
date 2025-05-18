export type Country = {
    country: string;
    cities: string[];
    emoji: string;
    countryCode: string;
    region: string;
};

export type WeatherResponse = {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust?: number;
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
    };
    hourly: Array<{
        dt: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust?: number;
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        pop: number;
        // Можуть бути ще інші поля, якщо треба — додай
    }>;
    daily: Array<{
        dt: number;
        sunrise: number;
        sunset: number;
        temp: {
            day: number;
            min: number;
            max: number;
            night: number;
            eve: number;
            morn: number;
        };
        feels_like: {
            day: number;
            night: number;
            eve: number;
            morn: number;
        };
        pressure: number;
        humidity: number;
        dew_point: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust?: number;
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        clouds: number;
        pop: number;
        uvi: number;
        // Можуть бути ще інші поля, якщо треба — додай
    }>;
    alerts?: Array<{
        sender_name: string;
        event: string;
        start: number;
        end: number;
        description: string;
        tags: string[];
    }>;
};
