import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Common/Header/Header";
import { Detail } from "./Pages/Detail/Detail";
import Home from "./Pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
