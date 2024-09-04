import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homework from "./components/Homework";
import Example from "./components/example";
import Note from "./components/Note";
import Diary from "./components/Diary";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homework />} />
        <Route path="/example" element={<Example />} />
        <Route path="/note" element={<Note />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
