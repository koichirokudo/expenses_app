import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { Test } from "./pages/test";
import { RegisterPage } from "./pages/RegisterPage";
import { InputPage } from "./pages/input";
import { MonthReportPage } from "./pages/monthReport";
import { CategoryReportPage } from "./pages/categoryReport";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/month_report" element={<MonthReportPage />} />
        <Route
          path="/category_report"
          element={<CategoryReportPage />}
          component={CategoryReportPage}
          render={() => <CategoryReportPage category={"kudo"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
