import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Common/Header/Header";
import { Detail } from "./Pages/Detail/Detail";
import { Home } from "./Pages/Home/Home";
import { Top } from "./Pages/Top/Top";
import { Footer } from "./Components/Common/Footer/Footer";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/top" element={<Top />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
