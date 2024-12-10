import { Link, useLocation, useNavigate } from 'react-router-dom';
import Style from './Navbar.module.css'
import logo from "../../Assets/logo.png"
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import { useState} from 'react';
import { LogoutOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import LoginModal from '../Modals/LoginModal';
import isAuthenticated from '../Authentication/IsAuthenticated'
import { BASE_URL } from '../../config';
import { RiTicket2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const onClose = () => setIsModalOpen(false);

  const popup = (e) => {
    e.preventDefault();
    isAuthenticated() ? handleTicket() : setIsModalOpen(true);
    
  };


  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/logout`, { credentials: 'include' });
      response.ok ? navigate('/') : console.error('Logout failed:', response.statusText);
    } catch (error) {
      toast.error('Error logging out:', error);
    }
  };

  const handleTicket = () => navigate("/book-ticket");
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/contactus", label: "CONTACT US" }
  ];

  return (
    <>
      <nav>
        <h1 className={Style.name}>
          <Link to={'/'} className={Style.box}>
            <img className={Style.logo} src={logo} alt="logo" />
          </Link>
        </h1>

        <span className={Style.links}>
          {navLinks.map((link, index) => (
            <span key={index}>
              <Link style={{ color: "black" }} to={link.path}>{link.label}</Link>
            </span>
          ))}
        </span>

        <span className={Style.icons}>

          <Tooltip title="Buy Ticket">
            <IconButton onClick={popup} style={{ objectFit: "contain", paddingBottom: "20px", width: "30px", height: "25px", margin: "15px 10px" }} aria-label="Ticket">
                <RiTicket2Fill style={{ color: "black" }} />
            </IconButton>
          </Tooltip>

          {location.pathname === '/Home' && (
            <Tooltip title="Logout">
              <LogoutOutlined onClick={handleLogout} className={Style.logout} />
            </Tooltip>
          )}

          <div className={Style.icon}>
            <Tooltip title="Menu">
              <Menu className={Style.menuicon} onClick={toggleMenu} />
            </Tooltip>
            {isOpen && (
              <div className={Style.menu}>
                <ul>
                  {navLinks.map((link, index) => (
                    <li key={index}><Link to={link.path}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </span>
      </nav>

      <LoginModal isOpen={isModalOpen} onClose={onClose} />
    </>
  );
}

export default Navbar;
