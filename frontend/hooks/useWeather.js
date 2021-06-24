import useSWR from "swr";

export function useWeather(city) {
  const { data, error } = useSWR(() => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`;
  });

  return {
    weather: data,
    isLoading: !data && !error,
    isError: error,
  };
}
