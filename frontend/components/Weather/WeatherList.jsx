import Weather from "./Weather";

export default function WeatherList({ cities }) {
  return (
    <div className='flex justify-center w-full border-t-2 border-b-2 border-black py-4'>
      <ul className='flex flex-wrap'>
        {cities.map((city, index) => (
          <li key={index}>
            <Weather city={city.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
