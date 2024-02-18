import Navbar from "./components/Navbar/Navbar";
import BaseLayout from "./layouts/BaseLayout/BaseLayout";

import { useState, useMemo } from "react";

import dayjs from "dayjs";
import Calendar from "./components/Calendar/Calendar";

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const { formattedCurrentDate, days } = useMemo(() => {
    const monthDate = currentDate.startOf("month");

    return {
      formattedCurrentDate: currentDate.format("MMMM YYYY"),
      days: [...Array(monthDate.daysInMonth())].map((_, i) => monthDate.clone().add(i, "day"))
    }
  }, [currentDate]);  
  
  const handleNextMonth = () => {
    setCurrentDate(prev => prev.add(1, "month"));
  }

  const handlePreviousMonth = () => {
    setCurrentDate(prev => prev.subtract(1, "month"));
  }  

  return (
    <BaseLayout>
      <Navbar
        currentDate={formattedCurrentDate}
        handleNextMonth={handleNextMonth}
        handlePreviousMonth={handlePreviousMonth}
      />
      <Calendar
        days={days}
      />
    </BaseLayout>
  )
};

export default App;
