import React, { useEffect, useState } from "react";
import { Dropdown, DropdownItem } from "./Dropdown";
import { citiesWeatherStateAtom } from "../atoms/atom";
import { useSetRecoilState } from "recoil";

const limit = 3;
const apiKey = import.meta.env.VITE_API_KEY;

type Option = {
  lon: number;
  lat: number;
  name: string;
  country: string;
  state?: string;
};

export async function fetchWeatherData(lat: number, lon: number, name: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );

  const data = await res.json();

  return {
    id: data.id,
    name,
    lat,
    lon,
    wind: data.wind.speed,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    timezone: data.timezone,
  };
}

export function SearchBar() {
  const [dropdownOption, setDropdownOption] = useState<Option[]>();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setCities = useSetRecoilState(citiesWeatherStateAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return setSearch("");
    setSearch(e.target.value);
  };

  async function handleOptionClick(lat: number, lon: number, name: string) {
    setDropdownOption([]);
    setSearch("");

    const data = await fetchWeatherData(lat, lon, name);

    setCities((prevCities) => {
      const isDuplicate = prevCities.some(
        (city) => city.lat === data.lat && city.lon === data.lon,
      );
      if (!isDuplicate) {
        return [...prevCities, data];
      }
      return prevCities;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (dropdownOption)
      handleOptionClick(
        dropdownOption[0].lat,
        dropdownOption[0].lon,
        dropdownOption[0].name,
      );
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCities() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${limit}&appid=${apiKey}`,
            {
              signal: controller.signal,
            },
          );

          const data = await res.json();

          setDropdownOption(data);
          setIsLoading(false);
        } catch (error: any) {
          console.log("error", error);
        }
      }

      if (search.length < 2) {
        setDropdownOption([]);
        return;
      }

      fetchCities();

      return function () {
        controller.abort();
      };
    },
    [search],
  );

  return (
    <>
      <div className="mb-2 mt-8">
        <form
          className="mx-auto flex rounded-t-lg border-b-4 border-b-sky-700 shadow-md shadow-sky-100 transition-all hover:border-b-sky-500"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="search"
            placeholder="Search City..."
            className=" bg-slate-100px-4 placeholder:text-md shadow-inner-bottom w-full rounded-t-lg bg-slate-50  px-4 py-2 text-lg text-slate-700 outline-none placeholder:tracking-wide placeholder:text-slate-800 focus:bg-slate-50 md:py-4 "
            onChange={(e) => handleInputChange(e)}
            value={search}
          />
        </form>
      </div>

      <Dropdown>
        {search.length > 0 &&
          (isLoading ? (
            <div className="cursor-pointer rounded-md border-slate-300 px-4 py-4 shadow-sm shadow-neutral-300 transition-shadow hover:shadow-md hover:shadow-neutral-300">
              Loading...
            </div>
          ) : (
            dropdownOption &&
            (dropdownOption.length > 0 ? (
              dropdownOption.map((option) => (
                <DropdownItem
                  key={`${option.lat} ${option.lon}`}
                  onOptionClick={() =>
                    handleOptionClick(option.lat, option.lon, option.name)
                  }
                >
                  {option.name}, {option.state ? option.state + ", " : ""}
                  {option.country ? option.country : ""}
                </DropdownItem>
              ))
            ) : (
              <div className="cursor-pointer rounded-md border-slate-300 px-4 py-4 shadow-sm shadow-neutral-300 transition-shadow hover:shadow-md hover:shadow-neutral-300">
                No results found...
              </div>
            ))
          ))}
      </Dropdown>
    </>
  );
}
