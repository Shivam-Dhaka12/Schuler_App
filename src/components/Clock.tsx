import { useEffect, useRef, useState } from "react";

export default function Clock({ timezone }: { timezone: number }) {
  const [currentTime, setCurrentTime] = useState(getTimeForTimezone(timezone));
  const intervalId = useRef<number | undefined>();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentTime(getTimeForTimezone(timezone));
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [timezone]);

  function getTimeForTimezone(offsetSeconds: number) {
    const currentUTC = new Date();
    const offsetMillis = offsetSeconds * 1000;
    const localTime = new Date(currentUTC.getTime() + offsetMillis);

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
    };
    return localTime.toLocaleTimeString("en-US", options).split(" ");
  }

  return (
    <div className="col-span-3 flex  flex-col justify-center border-l border-l-slate-300 text-center font-medium text-sky-600 ">
      <span className="text-xl">{currentTime[0]}</span>
      <span className=" text-lg">{currentTime[1]}</span>
    </div>
  );
}
