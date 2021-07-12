import { useWeather } from "../../hooks/useWeather";
import { celsiusToFahrenheit } from "../../lib/helpers";

export default function Weather({ city }) {
  const { weather, isLoading, isError } = useWeather(city);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Failed to load.</div>;
  return (
    <div className='inline-block flex flex-col items-center m-4 md:mx-6'>
      <p className='mb-2 text-lg font-bold md:text-xl'>{city}</p>
      <p>
        {Math.ceil(weather.main.temp)}°C /{" "}
        {celsiusToFahrenheit(weather.main.temp)}°F
      </p>
    </div>
  );
}
