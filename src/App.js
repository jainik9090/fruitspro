import { Route, Routes } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Not from './container/404/Not';
import Cart from './container/Cart/Cart';
import Chackout from './container/Chackout/Chackout';
import Contact from './container/Contact/Contact';
import Home from './container/Home/Home';
import Shopdetail from './container/Shop-detail/Shopdetail';
import Shop from './container/Shop/Shop';
import Testumonial from './container/Testimonial/Testumonial';
import Layout from './admin/component/Layout/Layout';
import Category from './admin/container/Category/Category';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <>
       <Routes>
                <Route path='/*' element={<UserRoutes />}/>    
                <Route path='/admin/*' element={<AdminRoutes />}/>      
        </Routes>
    </>
   
  );
}

export default App;
