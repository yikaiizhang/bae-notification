import { useCities } from "../hooks";
import Weather from "./Weather";

export default function WeatherList() {
  const { cities, isLoading, isError } = useCities();

  if (isLoading) return <div>Is loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <ul>
      {cities.map((city) => (
        <li>
          <Weather city={city.name} />
        </li>
      ))}
    </ul>
  );
}
