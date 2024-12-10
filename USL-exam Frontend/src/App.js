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
import OperatorSignIn from './Pages/OperatorSignIn/OperatorSignIn';
import OperatorSignUp from './Pages/OperatorSignUp/OperatorSignUp';


function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/register-passenger" element={<SignUp />} />
                <Route path="/login-passenger" element={<SignIn />} />
                <Route path="/register-operator" element={<OperatorSignUp />} />
                <Route path="/login-operator" element={<OperatorSignIn />} />
                <Route path="/" element={<Home />} />
                {/* <Route path="/Order" element={<Order />} /> */}
                <Route path="/contactus" element={<ContactUs/>} />
                <Route path="/about" element={<About/> } /> 
                <Route path="/book-ticket" element={<BookTicket/> } />
                <Route path="/admin/manage-routes" element={<AdminManageRoutes />} />
                <Route path="/buses" element={<AllBuses />} />
                <Route path="/tickets" element={<PassengerTickets />} />

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
