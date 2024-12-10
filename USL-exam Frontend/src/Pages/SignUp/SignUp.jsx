import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Style from "./SignUp.module.css";
import { useState } from "react";
import register from "../../Assets/register.jpg"
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {BASE_URL} from "../../config";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [user , setUser] = useState
  ({firstName:'',
    lastName:'',
    email: '', 
    phoneNumber:'',
    password:'',
    confirmPassword:''});  

const validateFields = () => {
      const errors = {};
      if (!user.firstName.trim()) errors.firstName = "First Name is required.";
      if (!user.lastName.trim()) errors.lastName = "Last Name is required.";
      if (!user.email.trim()) {
        errors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        errors.email = "Enter a valid email address.";
      }
      if (!user.phoneNumber.trim()) errors.phoneNumber = "Phone Number is required.";
      if (!user.password.trim()) {
        errors.password = "Password is required.";
      }
      if (!user.confirmPassword.trim()) errors.lastName = "Confirm Password is required.";
      return errors;
};

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        // Check if passwords match
    if (user.password !== user.confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    // Password strength checking logic
    const hasMinimumLength = user.password.length >= 8;
    const hasUppercase = /[A-Z]/.test(user.password);
    const hasLowercase = /[a-z]/.test(user.password);
    const hasNumber = /\d/.test(user.password);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(user.password);

   // const isValidPassword = hasMinimumLength && hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

    if (!hasMinimumLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialCharacter) {
      setError('Password must meet the following criteria:\n' +
        '- Minimum 8 characters\n' +
        '- At least one uppercase letter\n' +
        '- At least one lowercase letter\n' +
        '- At least one number\n' +
        '- At least one special character (!@#$%^&*)');
      return;
    } 
    const errors = validateFields();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setError("");

      const response = await
        axios.post(`${BASE_URL}/auth/register-passenger`, user,
        {
        headers:{
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        toast.success('Registration Successful, proceed for verification');
        navigate('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      if (err.response?.status === 400) {
        console.error('Error during registration:', err);
        toast.error("User already exists or invalid data.");
        setError("User already exists or invalid data.");
      } else {
        toast.error("Failed to sign up. Please try again later.");
        setError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  
    // Password strength checking logic
    const hasMinimumLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(value);
  
    // Create an object to store the error messages with their respective conditions
    const errors = {
      hasMinimumLength: {
        message: 'Minimum 8 characters',
        isMet: hasMinimumLength
      },
      hasUppercase: {
        message: 'At least one uppercase letter',
        isMet: hasUppercase
      },
      hasLowercase: {
        message: 'At least one lowercase letter',
        isMet: hasLowercase
      },
      hasNumber: {
        message: 'At least one number',
        isMet: hasNumber
      },
      hasSpecialCharacter: {
        message: 'At least one special character (!@#$%^&*)',
        isMet: hasSpecialCharacter
      }
    };
  
    // Generate the error message with appropriate color
    const errorMessages = Object.values(errors).map((error, index) => (
      <p key={index} style={{ color: error.isMet ? 'green' : 'red' }}>
      {error.isMet ? '✔️' : '✖️'} {error.message}
      </p>
    ));
  
    // Check if all conditions are met
    const allConditionsMet = Object.values(errors).every(error => error.isMet);
  
    if (!allConditionsMet) {
      setPasswordError(errorMessages);
      return;
    }
  
    // Reset password error message if all conditions are met
    setPasswordError('');
  };

  const handlePasswordMatchChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));


      // Check if passwords match
      const isPasswordMatch = name === 'confirmPassword' ? value === user.password : true;

    if (!isPasswordMatch) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError('');
    }
  }
  
  return (   
  <>
  <Navbar/>
  <div className={Style.container}>
      <div className={Style.form}>
        <form onSubmit={handleSignUp}>
          <h1>Register</h1>
          <label>First Name:</label>
          {validationErrors.firstName && (
          <p className={Style.error}>{validationErrors.firstName}</p>
        )}
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="Enter your First name" required />
          <label>Last Name:</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Enter your Last name" required/>
          {validationErrors.lastName && (
          <p className={Style.error}>{validationErrors.lastName}</p>
        )}
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" required/>
          {validationErrors.email && (
          <p className={Style.error}>{validationErrors.email}</p>
        )}
          <label>Phone number:</label>
          <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Enter your phone no" required/>
          {validationErrors.phoneNumber && (
          <p className={Style.error}>{validationErrors.phoneNumber}</p>
        )}
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handlePasswordChange} placeholder="Enter your password" style={{ borderColor: passwordError ? 'red' : 'green'}} required/>
          {validationErrors.password && (
          <p className={Style.error}>{validationErrors.password}</p>
        )}
        {passwordError}
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handlePasswordMatchChange} placeholder="Confirm your password" required/>
          {validationErrors.confirmPassword && (
          <p className={Style.error}>{validationErrors.confirmPassword}</p>
        )}
          {passwordMatchError && <p className={Style.error}>{passwordMatchError}</p>}
          <button className={Style.register} disabled={isLoading} type="submit"> {isLoading ? "Signing Up...." : "Sign Up"} </button>
          {error && <p className={Style.error}>{error}</p>}
          <p style={{marginLeft:'20px', marginTop:'25px'}}>Already have an account? <Link to="/login-passenger">Log In</Link></p>
        </form>
      </div>
      <div className={Style.imageContainer}>
        <img className={Style.image} src={register} alt="user" />
      </div>
    </div>
    <Footer/> 
    <ToastContainer />
   </>
   
  );
};

export default SignUp;
