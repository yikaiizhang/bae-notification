import { useWeather } from "../hooks/useWeather";
import { celsiusToFahrenheit } from "../lib/helpers";

export default function Weather({ city }) {
  const { weather, isLoading, isError } = useWeather(city);
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;
  return (
    <div>
      <div>{city}</div>
      <div>{Math.ceil(weather.main.temp)}°C</div>
      <div>{celsiusToFahrenheit(weather.main.temp)}°F</div>
    </div>
  );
}
