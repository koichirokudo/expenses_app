import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { InputPage } from "../pages/InputPage";
import { MonthReportPage } from "../pages/MonthReportPage";
import { CategoryReportPage } from "../pages/CategoryReportPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RouteAuthGuard } from "../components/RouteAuthGuard";

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouteAuthGuard component={<InputPage />} redirect="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/month_report"
            element={
              <RouteAuthGuard
                component={<MonthReportPage />}
                redirect="/login"
              />
            }
          />
          <Route
            path="/category_report"
            element={
              <RouteAuthGuard
                component={<CategoryReportPage />}
                redirect="/login"
              />
            }
            component={<CategoryReportPage />}
            render={() => <CategoryReportPage category={"kudo"} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
