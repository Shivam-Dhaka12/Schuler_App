import { WeatherCard } from "./components/WeatherCard";
import { SearchBar, fetchWeatherData } from "./components/SearchBar";
import { Heading } from "./components/Heading";
import { useRecoilState } from "recoil";
import { CityWeatherData, citiesWeatherStateAtom } from "./atoms/atom";
import { useEffect, useRef } from "react";

function App() {
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
    <div className="mx-auto max-w-2xl px-6 py-8 md:px-8 lg:max-w-6xl lg:px-12">
      <Heading />
      <SearchBar />
      <div className="mt-12 lg:grid lg:grid-cols-3">
        {cities.map((city) => (
          <WeatherCard
            city={city}
            key={city.id}
            onClose={() => handleCloseButton(city.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
