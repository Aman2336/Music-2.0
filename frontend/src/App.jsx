import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer/Footer";
import SearchResults from "./pages/SearchResults.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/results" element={<SearchResults />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
