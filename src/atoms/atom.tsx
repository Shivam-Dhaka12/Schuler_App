import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type CityState = {
  lat: number;
  lon: number;
};

export type CityWeatherData = {
  id: number;
  lat: number;
  lon: number;
  name: string;
  wind: number;
  temperature: number;
  humidity: number;
  description: string;
  timezone: number;
};

// const [cities, setCities] = useState([
//   {
//     id: 1,
//     name: "Delhi",
//     wind: "29",
//     temperature: "30",
//     humidity: "50",
//     description: "sunny",
//   },
//   {
//     id: 2,
//     name: "Berlin",
//     wind: "29",
//     temperature: "40",
//     humidity: "53",
//     description: "rainy",
//   },
// ]);

export const citiesWeatherStateAtom = atom<CityWeatherData[]>({
  key: "citiesWeatherState",
  default: [
    {
      id: 1,
      name: "Delhi",
      lat: 28.7,
      lon: 77.1,
      wind: 29,
      temperature: 30,
      humidity: 50,
      description: "sunny",
      timezone: 19800,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const cityStateAtom = atom<CityState>({
  key: "cityState",
  default: {
    lat: 0,
    lon: 0,
  },
});
