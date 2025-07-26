import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TABS = ["First Parent", "Second Parent", "Student"];

const initialForm = {
  firstName: "",
  mobile: "",
  relation: "",
  gender: "",
  aadhaar: "",
  dob: "",
  email: "",
};

const FillDetails = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("First Parent");
  const [formData, setFormData] = useState({
    "First Parent": { ...initialForm },
    "Second Parent": { ...initialForm },
    Student: { ...initialForm },
  });

  const handleChange = (tab, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post("https://delhi-public-school-backend.vercel.app/api/save-form", formData);
    alert("Form submitted successfully!");
    console.log(response.data);
    // Optionally navigate to another page
    navigate("/PaymentPage")
  } catch (error) {
    alert("Error submitting form: " + error.response?.data?.error || error.message);
  }
};

  const currentData = formData[activeTab];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <img src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png" alt="DPS Logo" className="h-24 mx-auto mb-4" />
        <h1 className="font-bold text-lg underline">Delhi Public School</h1>
        <p className="text-sm text-gray-700 leading-tight">
          Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune,<br />
          Autadwadi Handewadi, Maharashtra 411060
        </p>
      </div>

      {/* Title */}
      <button className="bg-yellow-600 text-white font-semibold px-6 py-2 rounded mb-6 shadow-md">
        FILL DETAILS
      </button>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md font-semibold ${
              activeTab === tab
                ? "bg-blue-700 text-white"
                : "bg-blue-300 text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="w-full max-w-4xl border-2 border-[#CA8A04] rounded-b-md p-6 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* First Name */}
          <div>
            <label className="block text-sm text-start font-medium mb-1">First Name *</label>
            <input
              type="text"
              value={currentData.firstName}
              onChange={(e) => handleChange(activeTab, "firstName", e.target.value)}
              className="w-full border border-yellow-600 px-3 py-2 rounded"
              placeholder="Enter First Name"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm text-start font-medium mb-1">Mobile Number *</label>
            <input
              type="tel"
              value={currentData.mobile}
              maxLength={10}
              onChange={(e) => handleChange(activeTab, "mobile", e.target.value)}
              className="w-full border border-yellow-600 px-3 py-2 rounded"
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          {/* Relation */}
          <div>
            <label className="block text-sm text-start font-medium mb-1">Relation *</label>
            <select
              value={currentData.relation}
              onChange={(e) => handleChange(activeTab, "relation", e.target.value)}
              className="w-full border border-yellow-600 px-3 py-2 rounded"
              required
            >
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
              <option value="Self">Self</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-start font-medium mb-1">Gender *</label>
            <div className="flex gap-4 mt-1">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`gender-${activeTab}`}
                    value={g}
                    checked={currentData.gender === g}
                    onChange={(e) => handleChange(activeTab, "gender", e.target.value)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="block text-sm text-start font-medium mb-1">Aadhaar Number *</label>
            <input
              type="text"
              maxLength={12}
              value={currentData.aadhaar}
              onChange={(e) => handleChange(activeTab, "aadhaar", e.target.value)}
              className="w-full border border-yellow-600 px-3 py-2 rounded"
              placeholder="Enter Aadhaar Number"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm  text-start font-medium mb-1">Date of Birth *</label>
            <input
              type="date"
              value={currentData.dob}
              onChange={(e) => handleChange(activeTab, "dob", e.target.value)}
              className="w-full border border-yellow-600 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Optional Email */}
          <div className="md:col-span-2">
            <label className="block text-sm text-start font-medium mb-1">Email (Optional)</label>
            <input
              type="email"
              value={currentData.email}
              onChange={(e) => handleChange(activeTab, "email", e.target.value)}
              className="w-full border border-yellow-600 px-3 py-2 rounded"
              placeholder="Enter Email ID"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-[#CA8A04] text-white font-semibold px-8 py-2 rounded hover:bg-blue-800"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillDetails;
