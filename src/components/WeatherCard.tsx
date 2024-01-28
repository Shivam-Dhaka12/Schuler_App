import { CityWeatherData } from "../atoms/atom";
import Clock from "./Clock";

export function WeatherCard({
  onClose,
  city,
}: {
  onClose: () => void;
  city: CityWeatherData;
}) {
  return (
    <div className="group relative mx-auto mb-6 max-h-52 max-w-xl  rounded-lg bg-slate-50 py-4 text-slate-900  shadow-md transition-shadow  hover:shadow-lg  lg:mx-0">
      <div className="grid grid-cols-10  flex-col items-stretch">
        <div className="col-span-7 px-2">
          <p className="text-md px-4 pt-2 font-semibold text-sky-600 md:px-6 ">
            {city.name}
          </p>
          <div className="grid grid-cols-2 px-2 py-4 text-center md:px-6">
            <div className="py-2">
              <img
                src="./src/assets/wind.png"
                className="mx-2 inline"
                width={20}
              />
              <span className="text-sm">{city.wind} m/s</span>
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
              <span className="text-sm">{city.humidity} %</span>
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
        <Clock timezone={city.timezone} />
      </div>
      <img
        src="./src/assets/close_button.png"
        alt="close button"
        width={25}
        className="absolute right-1 top-1  hidden cursor-pointer opacity-70 transition-opacity hover:opacity-100 group-hover:block"
        onClick={() => onClose()}
      />
    </div>
  );
}
