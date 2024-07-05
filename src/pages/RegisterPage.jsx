import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgimage from '../assets/register bg.jpg'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    reEnterPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formValid, setFormValid] = useState(false); // New state variable

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateForm = () => {
    const { name, username, email, phone, password, reEnterPassword } = user;
    let formErrors = {};
    let isValid = true;

    if (!name.trim()) {
      formErrors.name = "Full Name is required";
      isValid = false;
    } else if (name.length < 3) {
      formErrors.name = "Name must be between 3 and 15 characters";
      isValid = false;
    }

    if (!username.trim()) {
      formErrors.username = "User Name is required";
      isValid = false;
    } else if (username.length < 3) {
      formErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      formErrors.email = "Email address is invalid";
      isValid = false;
    }
    if (!phone) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(phone)) {
      formErrors.phone = "Phone number is invalid";
      isValid = false;
    }
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (password !== reEnterPassword) {
      formErrors.reEnterPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    let errorsTemp = { ...errors };

    switch (name) {
      case "name":
        if (!/^[a-zA-Z ]+$/.test(value)) {
          errorsTemp.name = "Name must contain only letters and spaces";
        } else if (!value.trim()) {
          errorsTemp.name = "Name is required";
        } else {
          errorsTemp.name =
            value.length >= 3 && value.length <= 15
              ? ""
              : "Name must be between 3 and 15 characters";
        }
        break;

      case "username":
        if (!/^\S+$/.test(value)) {
          errorsTemp.username = "Username cannot contain spaces";
        } else {
          errorsTemp.username =
            value.length >= 3 && value.length <= 15
              ? ""
              : "Username must be between 3 and 15 characters";
        }
        break;

      case "email":
        errorsTemp.email = validateEmail(value) ? "" : "Invalid email format";
        break;
      case "phone":
        if (!/^[7-9]/.test(value)) {
          errorsTemp.phone = "Invalid phone Number format ";
        } else {
          errorsTemp.phone = validatePhone(value)
            ? ""
            : "Phone number is invalid";
        }
        break;
      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(value)) {
          errorsTemp.password =
            "Password must contain at least one number, one special character, one uppercase character, one lowercase character, and be at least 8 characters long";
        } else {
          errorsTemp.password = "";
        }
      case "reEnterPassword":
        errorsTemp.reEnterPassword =
          value === user.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }
    setErrors(errorsTemp);
  };

  useEffect(() => {
    // Check if there are any errors
    const isValid = Object.values(errors).every((error) => error === "");
    // Update form validity state
    setFormValid(isValid);
  }, [errors]);

  

  const register = async (e) => {
    e.preventDefault();
    const { name, username, email, phone, password, reEnterPassword } = user;
    if (validateForm()) {
    try {
      // const role = email.endsWith("numetry.com") ? "admin" : "user";
      const res = await axios.post("https://book-master-backend-new-1.onrender.com/api/auth/register", {
        ...user,  
      });
      console.log(res);
     
      alert(res.data.message);

      if (res.data.success) {
        
        navigate("/login");
        // navigate("/verify-otp", { state: { email: user.email } });
        
      }
    } catch (err) {
      // console.error(err);
      alert("Registration failed. Please try again.");
    }
    }
  };

  return (
    <div className="w-full items-center justify-center" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
    <section className="flex justify-center items-center h-screen p-12">
      <div className="container mx-auto flex justify-center items-center w-full">
        <div className="flex shadow-2xl h-auto w-[30vw] backdrop-blur-sm bg-white bg-opacity-30 rounded-lg">
          <div className="login_form p-8 relative w-full flex flex-col justify-center shadow-lg rounded-lg">
            <h2 className="text-center font-medium antialiased mb-4 text-6xl text-[#0D014D] font-comforter">
              Register
            </h2>
            <Form onSubmit={register} className="flex  flex-col">
              <FormGroup className="relative pt-4 mb-2 flex flex-col">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your Full Name"
                  className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 placeholder-white text-white"
                  required
                />
                {errors.name && <span className="text-red-700 mt-2">{errors.name}</span>}
              </FormGroup>
              <FormGroup className="relative pt-4 mb-2 flex flex-col">
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Enter your Username"
                  className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 placeholder-white text-white"
                  required
                />
                {errors.username && <span className="text-red-700 mt-2">{errors.username}</span>}
              </FormGroup>
              <FormGroup className="relative pt-4 mb-2 flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 placeholder-white text-white"
                  required
                />
                {errors.email && <span className="text-red-700 mt-2">{errors.email}</span>}
              </FormGroup>
              <FormGroup className="relative pt-4 mb-2 flex flex-col">
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Enter your Phone No."
                  className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 placeholder-white text-white"
                  required
                />
                {errors.phone && <span className="text-red-700 mt-2">{errors.phone}</span>}
              </FormGroup>
              <FormGroup className="relative pt-4 mb-2 flex flex-col">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 placeholder-white text-white"
                  required
                />
                {errors.password && <span className="text-red-700 mt-2">{errors.password}</span>}
              </FormGroup>
              <FormGroup className="relative pt-4 mb-6 flex flex-col">
                <input
                  type="password"
                  name="reEnterPassword"
                  value={user.reEnterPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your Password"
                  className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 placeholder-white text-white "
                  required
                />
                {errors.reEnterPassword && <span className="text-red-700 mt-2">{errors.reEnterPassword}</span>}
              </FormGroup>
              <Button
                className="inline-block px-6 py-1 text-[#0D014D] font-medium border-2 border-black rounded hover:bg-[#0D014D] hover:text-white transition-colors duration-300"
                type="submit"
              >
                Register
              </Button>
            </Form>
            <p className="text-black text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-lg font-semibold text-[#0D014D]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Register;
