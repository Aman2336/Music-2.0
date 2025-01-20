import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer/Footer";
import SearchResults from "./pages/SearchResults.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import SongRec from "./pages/SongRec.jsx";
import About from "./pages/About.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/results" element={<SearchResults />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/song-recommend" element={<SongRec />}></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
