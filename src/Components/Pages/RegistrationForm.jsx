import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPLogin = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const generateOtp = async () => {
    if (mobile.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      return;
    }
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/send-otp", {
        mobile,
      });
      if (res.data.success) {
        setOtpSent(true);
        setTimer(45);
        setResendAttempts((prev) => prev + 1);
        console.log("OTP sent successfully");
      } else {
        setError("Failed to send OTP");
      }
      console.log(res.data)
      setTimeout(() => {
        alert(`OTP is: ${res.data.otp}`); 
      }, 5000);
    } catch (err) {
      console.error(err);
      setError("Error sending OTP");
    }
  };

  const validateOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/verify-otp", {
        mobile,
        otp,
      });
      if (res.data.success) {
        navigate("/MemberDashboard");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("OTP validation failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-10">
      <div className="text-center">
        <img
          src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png"
          alt="School Logo"
          className="h-40 mx-auto mb-4"
        />
        <h1 className="font-bold underline mb-1 text-4xl">Delhi Public School</h1>
        <p className="text-sm text-gray-700 leading-tight">
          Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune,<br />
          Autadwadi Handewadi, Maharashtra 411060
        </p>
      </div>

      <div className="mt-6 w-full max-w-sm bg-white shadow-lg rounded-md p-6 space-y-4 border">
        <input
          type="tel"
          maxLength={10}
          placeholder="Enter Your Mobile No"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none"
        />

        <button
          onClick={generateOtp}
          disabled={timer > 0 || resendAttempts >= 3}
          className={`w-full py-2 text-white font-semibold rounded ${
            timer > 0 || resendAttempts >= 3
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#CA8A04] hover:bg-green-700"
          }`}
        >
          Generate OTP
        </button>

        {otpSent && (
          <>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none"
            />
            <button
              onClick={validateOtp}
              className="w-full bg-green-600 text-white py-2 font-semibold rounded hover:bg-green-700"
            >
              Validate OTP
            </button>

            <div className="text-right mt-2 text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              ) : resendAttempts < 3 ? (
                <button
                  onClick={generateOtp}
                  className="text-green-600 hover:text-red-600 font-medium"
                >
                  RESEND OTP
                </button>
              ) : (
                <span className="text-red-500">Max 3 attempts reached</span>
              )}
            </div>
          </>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="text-center">
          <a href="/register" className="text-[#CA8A04] text-sm hover:underline">
            Not Registered? Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;
