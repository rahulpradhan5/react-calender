import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const Calender = ({ data, setselectedDate, selectDate }) => {
  const today = new Date(selectDate);

  const [currentMonth, setCurrentMonth] = useState(today);
  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

  const daysInMonth = new Date(year, month, 0).getDate();
  const emptyDays = Array.from({ length: startingDay }, (_, i) => null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (date) => {
    setselectedDate(date);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg max-w-[400px] text-black ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        {/* opration buttons */}
        <div className="flex items-center justify-center gap-[8px]">
          <div
            className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer"
            onClick={prevMonth}
          >
            <ChevronLeft />
          </div>
          <div
            className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer"
            onClick={nextMonth}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
      {/* Change the month and year as needed */}
      <div className="grid grid-cols-7 gap-2 mt-[20px]">
        {/* days of the weeks */}
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Sun
        </div>
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Mon
        </div>
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Tue
        </div>
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Wed
        </div>
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Thu
        </div>
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Fri
        </div>
        <div className="p-[2px] flex flex-col items-center justify-center rounded-md cursor-pointer font-semibold">
          Sat
        </div>
        {/* empty days */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="min-w-15 h-15" />
        ))}
        {/* dates of the month */}
        {monthDays.map((day) => {
          const dateToCheck = `${currentMonth.getFullYear()}-${
            Number(currentMonth.getMonth() + 1) < 10
              ? "0" + (Number(currentMonth.getMonth()) + 1)
              : Number(currentMonth.getMonth()) + 1
          }-${day < 10 ? "0" + day : day}`;
          console.log(dateToCheck);
          //   date check from utc
          const dateData = data.find((data) => {
            const dataDate = data.date.split("T")[0]; // Extract the date portion from the full date
            return dataDate === dateToCheck;
          });
          const isAvailable = dateData ? dateData.isAvailable : false; //check available or not
          const renderDate = dateData && dateData.date; //
          return (
            <div
              key={`day-${day}`}
              className={`min-w-15 h-[40px] p-[2px] flex flex-col items-center justify-center border rounded-md hover:border  font-semibold 
              ${
                isAvailable
                  ? "text-black hover:border-green-500 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              } ${selectDate === renderDate ? "bg-green-500 text-white " : ""}
            `}
              onClick={() => {
                isAvailable && handleDateClick(dateData.date);
              }}
            >
              {day}
              <p className="text-[10px]">
                {isAvailable ? "₹ " + dateData.price : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
