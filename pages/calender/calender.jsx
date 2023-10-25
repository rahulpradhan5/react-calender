import React, { useState,useEffect } from "react";
import Calender from "@/components/calender/calender";

const calender = () => {
  const [calenderShow, setcalenderShow] = useState(false);

  //   data of the calender
  const monthData = [
    { date: "2023-10-27T18:30:00.000+00:00", price: "40", isAvailable: false },
    { date: "2023-10-28T18:30:00.000+00:00", price: "40", isAvailable: true },
    { date: "2023-10-29T18:30:00.000+00:00", price: "40", isAvailable: true },
    { date: "2023-10-30T18:30:00.000+00:00", price: "40", isAvailable: true },
    { date: "2023-11-01T18:30:00.000+00:00", price: "40", isAvailable: true },
    { date: "2024-01-01T18:30:00.000+00:00", price: "40", isAvailable: true },
  ];
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const firstAvailable = monthData.find((data) => data.isAvailable);
    if (firstAvailable) {
      setSelectedDate(firstAvailable.date);
    }
  }, []);
  return (
    <>
      <div className="flex">
        <input
          type="text"
          className="text-black"
          name=""
          id=""
          value={selectedDate}
        />
        <button
          className="border bg-green-500 "
          onClick={() => {
            calenderShow ? setcalenderShow(false) : setcalenderShow(true);
          }}
        >
          Date
        </button>
      </div>

      {calenderShow && (
        <Calender data={monthData} setselectedDate={setSelectedDate} selectDate={selectedDate}/>
      )}
    </>
  );
};

export default calender;
