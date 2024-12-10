import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import About from './Pages/About/About';
import ContactUs from './Pages/ContactUs/ContactUs';
import { AnimatePresence } from 'framer-motion';
import AdminManageRoutes from './Pages/AdminRoute/AdminManageRoutes';
import isAuthenticated from './Components/Authentication/IsAuthenticated';
import BookTicket from './Pages/BookingTicket/BookTicket'
import AllBuses from './Pages/AllBuses/BusList';
import PassengerTickets from './Pages/BookingTicket/TicketList';
import OperatorSignUp from './Pages/OperatorSignUp/OperatorSignUp';
import AdminUpdateRoutes from './Pages/AdminRoute/AdminUpdateRoutes.';
import OperatorsByRoute from './Pages/AllBuses/OperatorByRoute';
import SearchRoutes from './Pages/Routes Search/SearchRoutes';


function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/register-passenger" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register-operator" element={<OperatorSignUp />} />``
                <Route path="/" element={<Home />} />
                <Route path="/operator-route" element={<OperatorsByRoute />} />
                <Route path="/search-route" element={<SearchRoutes />} />
                <Route path="/contactus" element={<ContactUs/>} />
                <Route path="/about" element={<About/> } /> 
                <Route path="/book-ticket" element={<BookTicket/> } />
                <Route path="/admin/create-routes" element={<AdminManageRoutes />} />
                <Route path="/buses" element={<AllBuses />} />
                <Route path="/tickets" element={<PassengerTickets />} />
                <Route path="/admin/update-route" element={<AdminUpdateRoutes />} />
            {/* Render the Wishlist route only if the user is authenticated */}
                 {!isAuthenticated ? (
            <>
              
            </>
          ) : null}
       
       {/* Render the Wishlist route only if the user is authenticated */}
       {/* <Route path="/wishlist" element={<Wishlist /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/Order" element={<Order /> } /> */}

       {/* <Route path="/wishlist" element={<Wishlist handleOpenModal={handleOpenModal} />} />
       <Route path="/cart" element={<Cart handleOpenModal={handleOpenModal} />} /> */}
       {/* {isModalOpen && <LoginModal onClose={handleCloseModal} />} */}
       </Routes>
        </AnimatePresence>


    </div>
  );
}

export default App;
