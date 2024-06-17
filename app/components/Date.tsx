import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface DateComponentProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({ date, setDate }) => {
  const monthName = new Intl.DateTimeFormat("es-ES", { month: "long" })
    .format(date)
    .replace(/^\w/, (c) => c.toUpperCase());

  const handlePrevDay = () => {
    const prevDate = new Date(date);
    prevDate.setDate(date.getDate() - 1);
    setDate(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    setDate(nextDate);
  };

  return (
    <div className="text-2xl text-white font-bold mb-4 flex justify-between">
      <div className="flex flex-row space-x-2">
        <div>
          <FontAwesomeIcon
            onClick={handlePrevDay}
            icon={faChevronLeft}
            className="size-10 cursor-pointer hover:text-purple-400"
          />
        </div>
        <div className="select-none">{`Día ${date.getDate()}`}</div>
        <div>
          <FontAwesomeIcon
            onClick={handleNextDay}
            icon={faChevronRight}
            className="size-10 cursor-pointer hover:text-purple-400"
          />
        </div>
      </div>
      <div className="select-none">{`${monthName} - ${date.getFullYear()}`}</div>
    </div>
  );
};

export default DateComponent;
