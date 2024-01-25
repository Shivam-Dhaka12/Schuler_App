import React, { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
const limit = 3;

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([
    {
      id: 1,
      name: "Delhi",
      wind: "29",
      temperature: "30",
      humidity: "50",
      description: "sunny",
    },
    {
      id: 2,
      name: "Berlin",
      wind: "29",
      temperature: "40",
      humidity: "53",
      description: "rainy",
    },
  ]);

  useEffect(
    function () {
      // handleCloseMovie();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          // setIsLoading(true);
          // setError('');

          // const res = await fetch(
          //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8a004603cbcad31c3b429e1e53b14e85`,
          //   { signal: controller.signal },
          // );

          const res = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=8a004603cbcad31c3b429e1e53b14e85`,
            {
              signal: controller.signal,
            },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          // console. (data);

          if (data.Response === "False") throw new Error("Movie not found");

          setWeatherData(data);
        } catch (error: any) {
          if (error.name !== "AbortError") {
            // setError(() => error.message);
            console.log("error", error);
          }
        } finally {
          // setIsLoading(false);
        }
      }

      if (city.length < 2) {
        setWeatherData(null);
        // setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [city],
  );

  let filterTimeout: number | undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout);
    if (!e.target.value) return setCity("");

    filterTimeout = setTimeout(() => {
      setCity(e.target.value);
      console.log("city " + city, weatherData);
    }, 200);
  };

  const handleCloseButton = (id: number) => {
    const newCities = cities.filter((city) => city.id !== id);
    setCities(newCities);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 md:px-8 lg:max-w-6xl lg:px-12">
      <Heading />
      <SearchBar onSearch={handleInputChange} />
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

function WeatherCard({
  onClose,
  city,
}: {
  onClose: () => void;
  city: {
    description: string;
    id: number;
    name: string;
    wind: string;
    temperature: string;
    humidity: string;
  };
}) {
  return (
    <div className="relative mx-auto mb-6 max-w-xl  rounded-lg border bg-slate-100 bg-opacity-45  py-4 text-slate-500 shadow-md transition-shadow hover:shadow-lg lg:col-span-2 lg:mx-0">
      <div className="grid grid-cols-10  flex-col items-stretch">
        <div className="col-span-7 px-2">
          <p className="text-md px-4 pt-2 font-semibold md:px-6">{city.name}</p>
          <div className="grid grid-cols-2 px-2 py-4 text-center md:px-6">
            <div className="py-2">
              <img
                src="./src/assets/wind.png"
                className="mx-2 inline"
                width={20}
              />
              <span className="text-sm">{city.wind} m/h</span>
            </div>
            <div className="py-2">
              <img
                src="./src/assets/thermometer.png"
                className="mx-2 inline"
                width={20}
              />
              <span className="text-sm">{city.temperature}&#176;C</span>
            </div>{" "}
            <div className="py-2">
              <img
                src="./src/assets/humidity.png"
                className="mx-2 inline"
                width={20}
              />
              <span className="text-sm">{city.humidity} mm</span>
            </div>{" "}
            <div className="py-2">
              <img
                src="./src/assets/sunny.png"
                className="mx-2 inline"
                width={20}
              />
              <span className="text-sm">{city.description}</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex  flex-col justify-center border-l border-l-slate-300 text-center font-medium text-slate-500">
          <span className="text-xl">2:00</span>
          <span className=" text-lg">PM</span>
        </div>
      </div>
      <img
        src="./src/assets/close_button.png"
        alt="close button"
        width={30}
        className="absolute right-1 top-1  cursor-pointer opacity-70 transition-opacity hover:opacity-100"
        onClick={() => onClose()}
      />
    </div>
  );
}

function SearchBar({
  onSearch,
}: {
  onSearch: (value: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="mb-2 mt-8">
        <form className="mx-auto flex rounded-t-lg border-b-4 border-b-slate-200 shadow-md transition-all hover:border-b-slate-300">
          <input
            type="search"
            placeholder="Search City..."
            className=" bg-slate-100px-4 placeholder:text-md shadow-inner-bottom w-full rounded-t-lg bg-slate-50  px-4 py-4 text-lg text-slate-600 outline-none placeholder:tracking-wide placeholder:text-slate-700 focus:bg-slate-50 "
            onChange={(e) => onSearch(e)}
          />
        </form>
      </div>
      <Dropdown />
    </>
  );
}

function Heading() {
  return (
    <p className="text-center font-sans text-3xl font-bold text-slate-700">
      Schuler App
    </p>
  );
}
