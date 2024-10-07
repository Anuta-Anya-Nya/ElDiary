import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homework from "./components/Homework";
import Note from "./components/Note";
import Diary from "./components/Diary";
import Schedule from "./components/Schedule";
import Settings from "./components/Settings";
import ScheduleCreate from "./components/blocks/SheduleCreate";
import Error404 from "./components/Error404";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homework />} />
        <Route path="/note" element={<Note />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/weekShedule" element={<Schedule />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/scheduleCreate" element={<ScheduleCreate />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
