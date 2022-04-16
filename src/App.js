import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Test} from './pages/test';
import {Login} from './pages/login';
import {Register} from './pages/register';
import {Initial} from './pages/initial';
import {InputPage} from './pages/input';
import {MonthReportPage} from './pages/monthReport';
import {CategoryReportPage} from './pages/categoryReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/initial" element={<Initial/>}/>
        <Route path="/input" element={<InputPage/>}/>
        <Route path="/month_report" element={<MonthReportPage/>} />
        <Route path="/category_report" element={<CategoryReportPage/>} component={CategoryReportPage}
               render={()=> <CategoryReportPage category={'kudo'}/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;