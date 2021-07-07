import { useWeather } from "../../hooks/useWeather";
import { celsiusToFahrenheit } from "../../lib/helpers";

export default function Weather({ city }) {
  const { weather, isLoading, isError } = useWeather(city);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Failed to load.</div>;
  return (
    <div className='inline-block flex flex-col items-center m-6'>
      <h3 className='mb-2'>{city}</h3>
      <p>
        {Math.ceil(weather.main.temp)}°C /{" "}
        {celsiusToFahrenheit(weather.main.temp)}°F
      </p>
    </div>
  );
}
