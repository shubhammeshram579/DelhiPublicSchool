import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const maskAadhar = (aadhar) => aadhar.replace(/\d(?=\d{4})/g, "X");

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const mobile = localStorage.getItem("mobile") || "9345235033"; // Fallback
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `https://delhi-public-school-backend.vercel.app/api/members`
        );
        const res2 = await axios.get(
          `https://delhi-public-school-backend.vercel.app/api/people`
        );
        setMembers([...res.data, ...res2.data]);

        setToken(localStorage.getItem("authToken"));
      } catch (err) {
        console.error("Error fetching members", err);
      }
    };

    fetchMembers();
  }, [mobile, token]);

  console.log("token2", token);

  const handleNavBtn = (id) => {
    if (id === "FILLDETAILS") navigate("/FillDetails");
    else if (id === "PAYMENTS") navigate("/PaymentPage");
    else navigate("/");
  };

  console.log(members);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-20">
      {/* Header */}
      <div className="text-center mb-6">
        <img
          src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png"
          alt="School Logo"
          className="h-24 mx-auto mb-4"
        />
        <h1 className="font-bold text-lg underline mb-1">
          Delhi Public School
        </h1>
        <p className="text-sm text-gray-700 leading-tight">
          Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune,
          <br />
          Autadwadi Handewadi, Maharashtra 411060
        </p>
      </div>

      {/* Welcome Box */}
      <div className="border-2 border-yellow-600 bg-[#f7f6e9] text-black font-semibold text-lg px-6 py-3 rounded mb-4">
        Welcome
        {/* &nbsp;&nbsp; Mr. {mobile} */}
      </div>

      {/* Members Table */}
      <div className="w-full max-w-6xl border-2 border-yellow-700 rounded-md shadow-sm">
        <div className="bg-yellow-500 text-white font-semibold text-center py-2 rounded-t">
          Members
        </div>
        <div className="grid grid-cols-6 text-center font-semibold py-2 bg-yellow-100 border-b border-yellow-700">
          <div>S.no</div>
          <div>Name</div>
          <div>Aadhaar</div>
          <div>Role</div>
          <div>Gender</div>
          <div>DOB</div>
        </div>
        {members.map((member, idx) => (
          <div
            key={member._id}
            className="grid grid-cols-6 gap-1 items-center text-center px-4 py-2 border-b"
          >
            <div className="font-medium">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div>{member.name || member.firstName}</div>
            <div>{maskAadhar(member.aadhar || member.aadhaar)}</div>
            <div>{member.role || member.type}</div>
            <div>{member.gender}</div>
            <div>{member?.dob}</div>
          </div>
        ))}
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-center mt-10 gap-4 flex-wrap">
        <button
          onClick={() => handleNavBtn("FILLDETAILS")}
          className="bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-700"
        >
          FILL DETAILS
        </button>
        <span className="text-2xl text-blue-600">➡️</span>
        <button
          onClick={() => handleNavBtn("PAYMENTS")}
          className="bg-yellow-500 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-600"
        >
          PAYMENTS
        </button>
      </div>
    </div>
  );
};

export default MemberDashboard;
