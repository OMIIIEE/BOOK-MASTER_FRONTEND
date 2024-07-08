import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";


const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};


  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://book-master-backend-new-1.onrender.com/api/otp/verify-otp", { email, otp });
      console.log(res);
      alert(res.data.message);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="w-full items-center justify-center">
      {/* <Navbar/> */}
      <section className="flex justify-center items-center h-3/4 p-12">
        <Container className="flex justify-center items-center w-full">
          <Row>
            <Col lg="8" className="m-auto">
              <div className="flex justify-between shadow-lg h-[50vh] w-[40vw]">
                <div className="login_form p-8 bg-[#F68D2E] relative w-full flex flex-col justify-center">
                  <h2 className="text-center mb-6 text-3xl text-[#FFFF80] font-comforter">Verify OTP</h2>
                  <Form onSubmit={verifyOtp} className="flex gap-4 flex-col">
                    <FormGroup>
                      <input
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                        className="w-full p-2.5 rounded-lg border-none text-base"
                      />
                    </FormGroup>
                    {error && <p className="text-red-700">{error}</p>}
                    <Button
                      className="inline-block px-6 py-1 bg-white text-[#F68D2E] font-medium border-2 rounded hover:bg-transparent hover:text-white transition-colors duration-300"
                      type="submit"
                    >
                      Verify OTP
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default OtpVerification;