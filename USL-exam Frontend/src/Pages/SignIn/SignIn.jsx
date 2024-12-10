import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Style from "./Signin.module.css";
import buses from "../../Assets/register.jpg";
import Footer from "../../Components/Footer/Footer";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const setToken = (token) => {
  localStorage.setItem("token", token);
};
const SignIn = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateFields = () => {
    const errors = {};
    if (!credentials.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!credentials.password.trim()) {
      errors.password = "Password is required.";
    }
    return errors;
  };


  const handleCreate = () => {
      navigate("/register-passenger");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const errors = validateFields();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setToken(data.token);

      toast.success("Logged in successfully", {
        position: "top-right",
      });

      navigate("/home");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
        toast.error("Invalid email or password", {
          position: "top-right",
        });
      } else {
        setError("");
        toast.error("An unexpected error occurred", {
          position: "top-right",
        });
        console.error("Error signing in:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setError(""); // Clear error when modifying input
  };

  return (
    <>
      <div className={Style.container}>
    <div className={Style.form}>
    <form onSubmit={handleSignIn}>
      <h1>Login</h1>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <p className={Style.forgot}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      {validationErrors.email && (
          <p className={Style.error}>{validationErrors.email}</p>
        )}
      <label>Password:</label>
      <div className={Style.passwordContainer}>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className={Style.passwordInput}
        />
        {passwordVisible ? (
          <RiEyeFill
            onClick={togglePasswordVisibility}
            className={Style.eyeIcon}
          />
        ) : (
          <RiEyeOffFill
            onClick={togglePasswordVisibility}
            className={Style.eyeIcon}
          />
        )}
      </div>
      {validationErrors.password && (
          <p className={Style.error}>{validationErrors.password}</p>
        )}
            <button className={Style.send} disabled={isLoading} type="submit">
              {isLoading ? "Logging In..." : "Log In"}
            </button>
            {error && <p className={Style.error}>{error}</p>}
          </form>
          <div className={Style.demarcation}>
            <div className={Style.line}></div>
            <div className={Style.text}>or</div>
            <div className={Style.line}></div>
          </div>
          <button className={Style.create} onClick={handleCreate} type="submit">
            Create Account
          </button>
        </div>
        <div className={Style.VideoContainer}>
        <img className={Style.image} src={buses} alt="Passengers boarding a bus" />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SignIn;
