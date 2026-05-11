import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail1 from "./pages/Detail1";
import TableuDiabetes from "./pages/TableuDiabates";
import Sales_dashboard1 from "./pages/Sales_dashboard1";
import HRDashboard from "./pages/HRDashboard";
import MiliterRanks from "./pages/MiliterRanks";
import Gdp from "./pages/Gdp";
import Lifeexpetancy from "./pages/lifeexpetancy";
import PowerBI1 from "./pages/PowerBI1";
import Excell1 from "./pages/Excell1";
import Scrap_bappenas from "./pages/Scrap_bappenas";
import Excell2 from "./pages/Excell2";

const App = () => {
  return (
    <>
      <Routes>
        {/* Halaman Utama */}
        <Route index element={<Home />} />

        {/* Halaman Detail (Gunakan path internal yang bersih) */}
        <Route path="/jumlahkeracunanmbg" element={<Detail1 />} />
        <Route path="/tableudiabates" element={<TableuDiabetes />} />
        <Route path="/sales_dashboard1" element={<Sales_dashboard1 />} />
        <Route path="/hRDashboard" element={<HRDashboard />} />
        <Route path="/militerranks" element={<MiliterRanks />} />
        <Route path="/gdp" element={<Gdp />} />
        <Route path="/lifeexpectancy" element={<Lifeexpetancy />} />
        <Route path="/powerBI1" element={<PowerBI1 />} />
        <Route path="/excell1" element={<Excell1 />} />
        <Route path="/scrapbappenas" element={<Scrap_bappenas />} />
        <Route path="/excel2" element={<Excell2 />} />
      </Routes>
    </>
  );
};

export default App;
