import { useRecoilState } from "recoil";
import { CityWeatherData, citiesWeatherStateAtom } from "../atoms/atom";
import { WeatherCard } from "../components/WeatherCard";
import { fetchWeatherData } from "../components/SearchBar";
import { useEffect, useRef } from "react";

export default function WeatherCardList() {
  const [cities, setCities] = useRecoilState(citiesWeatherStateAtom);
  const citiesRef = useRef(cities);

  const handleCloseButton = (id: number) => {
    const newCities = cities.filter((city: CityWeatherData) => city.id !== id);
    setCities(newCities);
  };

  useEffect(() => {
    const fetchWeatherForAllCities = async () => {
      const updatedCities = await Promise.all(
        citiesRef.current.map(async (city) => {
          const data = await fetchWeatherData(city.lat, city.lon, city.name);
          return data;
        }),
      );

      setCities(updatedCities);
    };

    fetchWeatherForAllCities();
    const intervalId = setInterval(
      () => {
        fetchWeatherForAllCities();
        console.log("Fetching weather data...");
      },
      60 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  return (
    <div className="lg:col-span-2">
      {cities.map((city) => (
        <WeatherCard
          city={city}
          key={city.id}
          onClose={() => handleCloseButton(city.id)}
        />
      ))}
    </div>
  );
}
