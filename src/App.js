import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SideBar } from './components/SideBar/SideBar';
import LoginPage from './page/Login/Login.page';
import StorePage from './page/Store/Store.page';
import LogoutPage from './page/Logout/Logout.page';
import EmployeePage from './page/Employee/Employee.page';
import CustomerPage from './page/Customer/Customer.page';
import StorageAreaPage from './page/StorageArea/StorageArea.page';
import CategoryPage from './page/Category/Category.Page';
import ShelvePage from './page/Shelve/Shelve.page';
import CellPage from './page/Cell/Cell.page';
import RackPage from './page/Rack/Rack.page';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <Header />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/storageAreas" element={<StorageAreaPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/shelve" element={<ShelvePage />} />
          <Route path="/cell" element={<CellPage />} />
          <Route path="/rack" element={<RackPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
