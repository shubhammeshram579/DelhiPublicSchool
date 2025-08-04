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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("First Parent");
  const [formData, setFormData] = useState({
    "First Parent": { ...initialForm },
    "Second Parent": { ...initialForm },
    Student: { ...initialForm },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (tab, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value,
      },
    }));
  };
  const [loadingTab, setLoadingTab] = useState(false);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.firstName || !/^[a-zA-Z\s]+$/.test(data.firstName)) {
      newErrors.firstName = "Valid First Name is required";
    }

    if (!/^[6-9]\d{9}$/.test(data.mobile)) {
      newErrors.mobile = "Enter a valid Indian mobile number";
    }

    if (!data.relation) {
      newErrors.relation = "Relation is required";
    }

    if (!data.gender) {
      newErrors.gender = "Gender is required";
    }

    const aadhaarSanitized = data.aadhaar.replace(/\s+/g, "");

    if (!/^\d{12}$/.test(aadhaarSanitized)) {
      newErrors.aadhaar =
        "Aadhaar must be a 12-digit number (with or without spaces)";
    }

    if (!data.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      const today = new Date();
      const dobDate = new Date(data.dob);
      if (dobDate > today) {
        newErrors.dob = "DOB cannot be in the future";
      }
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const currentData = formData[activeTab];
    const validationErrors = validateForm(currentData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.post(
        "http://localhost:3000/api/save-form",
        formData
      );
      alert("Form submitted successfully!");
      navigate("/PaymentPage");
    } catch (error) {
      alert(
        "Error submitting form: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const formatAadhaar = (value) => {
    return value
      .replace(/\D/g, "") // remove non-digit characters
      .slice(0, 12) // keep max 12 digits
      .replace(/(\d{4})(\d{4})(\d{0,4})/, (_, a, b, c) =>
        [a, b, c].filter(Boolean).join(" ")
      );
  };

  const currentData = formData[activeTab];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="text-center mb-6">
        <img
          src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png"
          alt="DPS Logo"
          className="h-24 mx-auto mb-4"
        />
        <h1 className="font-bold text-lg underline">Delhi Public School</h1>
        <p className="text-sm text-gray-700 leading-tight">
          Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune,
          <br />
          Autadwadi Handewadi, Maharashtra 411060
        </p>
      </div>

      <button className="bg-yellow-600 text-white font-semibold px-6 py-2 rounded mb-6 shadow-md">
        FILL DETAILS
      </button>

      <div className="flex space-x-4 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            // onClick={() => setActiveTab(tab)}
            onClick={() => {
              setLoadingTab(true);
              setTimeout(() => {
                setActiveTab(tab);
                setLoadingTab(false);
              }, 100);
            }}
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

      {loadingTab ? (
        <div className="text-center p-6 text-blue-600 font-semibold">
          Loading form...
        </div>
      ) : (
        <div className="w-full max-w-4xl border-2 border-[#CA8A04] rounded-b-md p-6 bg-white shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-start font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={currentData.firstName}
                onChange={(e) =>
                  handleChange(activeTab, "firstName", e.target.value)
                }
                className="w-full border border-yellow-600 px-3 py-2 rounded"
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-start font-medium mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={currentData.mobile}
                maxLength={10}
                onChange={(e) =>
                  handleChange(activeTab, "mobile", e.target.value)
                }
                className="w-full border border-yellow-600 px-3 py-2 rounded"
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && (
                <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-start font-medium mb-1">
                Relation *
              </label>
              <select
                value={currentData.relation}
                onChange={(e) =>
                  handleChange(activeTab, "relation", e.target.value)
                }
                className="w-full border border-yellow-600 px-3 py-2 rounded"
              >
                <option value="">Select Relation</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
                <option value="Self">Self</option>
              </select>
              {errors.relation && (
                <p className="text-red-600 text-sm mt-1">{errors.relation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-start font-medium mb-1">
                Gender *
              </label>
              <div className="flex gap-4 mt-1">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`gender-${activeTab}`}
                      value={g}
                      checked={currentData.gender === g}
                      onChange={(e) =>
                        handleChange(activeTab, "gender", e.target.value)
                      }
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-start font-medium mb-1">
                Aadhaar Number *
              </label>
              <input
                type="text"
                maxLength={14} // includes 2 spaces
                value={currentData.aadhaar}
                onChange={(e) =>
                  handleChange(
                    activeTab,
                    "aadhaar",
                    formatAadhaar(e.target.value)
                  )
                }
                className="w-full border border-yellow-600 px-3 py-2 rounded"
                placeholder="Enter Aadhaar Number"
              />
              {errors.aadhaar && (
                <p className="text-red-600 text-sm mt-1">{errors.aadhaar}</p>
              )}
            </div>

            <div>
              <label className="block text-sm  text-start font-medium mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                value={currentData.dob}
                onChange={(e) => handleChange(activeTab, "dob", e.target.value)}
                className="w-full border border-yellow-600 px-3 py-2 rounded"
              />
              {errors.dob && (
                <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-start font-medium mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={currentData.email}
                onChange={(e) =>
                  handleChange(activeTab, "email", e.target.value)
                }
                className="w-full border border-yellow-600 px-3 py-2 rounded"
                placeholder="Enter Email ID"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-[#CA8A04] text-white font-semibold px-8 py-2 rounded hover:bg-blue-800"
            >
              Save & Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FillDetails;
