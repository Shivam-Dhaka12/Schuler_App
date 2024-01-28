import { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        value={value}
        onChange={onChange}
        className="row-start-1 mx-auto rounded-md bg-slate-50 p-4 text-slate-800 shadow-md hover:shadow-xl md:p-6 lg:col-span-1"
      />
    </div>
  );
}

export default MyCalendar;
