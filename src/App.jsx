import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail1 from "./pages/Detail1";
import TableuDiabetes from "./pages/TableuDiabates";
import HRDashboard from "./pages/HRDashboard";
import MiliterRanks from "./pages/MiliterRanks";
import Gdp from "./pages/Gdp";
import Lifeexpetancy from "./pages/lifeexpetancy";
import PowerBI1 from "./pages/PowerBI1";
import Excell1 from "./pages/Excell1";
import Excell2 from "./pages/Excell2";
import EcommerceAnalytics from "./pages/EcommercePy";
import Powerbi2Hijab from "./pages/Powerbi2Hijab";
import Salesdashboard1 from "./pages/Salesdashboard1";
import Scrapbappenas from "./pages/Scrapbappenas";

const App = () => {
  return (
    <>
      <Routes>
        {/* Halaman Utama */}
        <Route index element={<Home />} />

        {/* Halaman Detail (Gunakan path internal yang bersih) */}
        <Route path="/jumlahkeracunanmbg" element={<Detail1 />} />
        <Route path="/tableudiabates" element={<TableuDiabetes />} />
        <Route path="/salesdashboard1" element={<Salesdashboard1 />} />
        <Route path="/hRDashboard" element={<HRDashboard />} />
        <Route path="/militerranks" element={<MiliterRanks />} />
        <Route path="/gdp" element={<Gdp />} />
        <Route path="/lifeexpectancy" element={<Lifeexpetancy />} />
        <Route path="/powerBI1" element={<PowerBI1 />} />
        <Route path="/Powerbi2Hijab" element={<Powerbi2Hijab />} />
        <Route path="/excell1" element={<Excell1 />} />
        <Route path="/scrapbappenas" element={<Scrapbappenas />} />
        <Route path="/excel2" element={<Excell2 />} />
        <Route path="/EcommerceAnalytics" element={<EcommerceAnalytics />} />
      </Routes>
    </>
  );
};

export default App;
