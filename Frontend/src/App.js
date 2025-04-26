import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import About from './Pages/About/About';
import ContactUs from './Pages/ContactUs/ContactUs';
import { AnimatePresence } from 'framer-motion';
import AdminManageRoutes from './Pages/AdminRoute/AdminManageRoutes';
import BookTicket from './Pages/BookingTicket/BookTicket'
import AllBuses from './Pages/AllBuses/BusList';
import PassengerTickets from './Pages/BookingTicket/TicketList';
import OperatorSignUp from './Pages/OperatorSignUp/OperatorSignUp';
import AdminUpdateRoutes from './Pages/AdminRoute/AdminUpdateRoutes.';
import OperatorsByRoute from './Pages/AllBuses/OperatorByRoute';
import SearchRoutes from './Pages/Routes Search/SearchRoutes';
import RoutesList from './Pages/Routes Search/RoutesList';
import PrivateRoute from './Components/Authentication/PrivateRoute';


function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/register-passenger" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/admin/register-operator" element={<PrivateRoute element={OperatorSignUp} />} />
                <Route path="/" element={<Home />} />
                <Route path="/operator-route" element={<PrivateRoute element={OperatorsByRoute} />} />
                <Route path="/search-route" element={<PrivateRoute element={SearchRoutes} />} />
                <Route path="/contactus" element={<ContactUs/>} />
                <Route path="/about" element={<About/> } /> 
                <Route path="/book-ticket/:routeId" element={<PrivateRoute element={BookTicket} />} />
                <Route path="/admin/create-routes" element={<PrivateRoute element={AdminManageRoutes} />} />
                <Route path="/all-buses" element={<PrivateRoute element={AllBuses} />} />
                <Route path="/all-routes" element={<PrivateRoute element={RoutesList} />} />
                <Route path="/my-tickets" element={<PrivateRoute element={PassengerTickets} />} />
                <Route path="/admin/update-route" element={<PrivateRoute element={AdminUpdateRoutes} />} />
       </Routes>
        </AnimatePresence>


    </div>
  );
}

export default App;
