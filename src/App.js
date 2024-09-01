import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homework from "./components/Homework";
import Example from "./components/example";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homework />} />
        <Route path="/example" element={<Example />} />
        {/* <Route path="/list" element={<DataList />} />  */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
