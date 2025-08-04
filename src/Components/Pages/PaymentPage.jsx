import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function RegisterPayment() {
  const navigate = useNavigate()
  const [people, setPeople] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);



   useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/people`);
        setPeople(res.data);
      } catch (err) {
        console.error("Error fetching members", err);
      }
    };

    fetchMembers();
  }, [people]);

  // console.log(people)

  const handleInputChange = (index, field, value) => {
    const updated = [...people];
    updated[index][field] = value;
    setPeople(updated);
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const totalAmount = 100.0;
  const taxAmount = 18.0;
  const grandTotal = totalAmount + taxAmount;

  

  const handleSubmit = async () => {
  if (selectedIndex === null) return alert('Please select a payer');
  const selectedPerson = people[selectedIndex];

  const payload = {
    payer: selectedPerson,
    amount: grandTotal,
  };

  try {
    const res = await axios.post('http://localhost:3000/api/payment/create-order', payload);
    const { orderId, key } = res.data;

    const options = {
      key,
      amount: grandTotal * 100,
      currency: "INR",
      name: "Delhi Public School",
      description: "Registration Payment",
      image: "https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png",
      order_id: orderId,
      handler: async function (response) {
        // Send response to backend to verify
        await axios.post('http://localhost:3000/api/payment/verify', {
          ...response,
          payer: selectedPerson,
          amount: grandTotal,
        });

        // alert('✅ Payment Successful');
        navigate("/SuccessPage")
      },
      prefill: {
        name: selectedPerson.name,
        email: "demo@school.com",
        contact: selectedPerson.mobile || "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert('❌ Payment Failed');
  }
};


  return (
    <div className="max-w-5xl mt-20 mx-auto p-6 border-2 border-[#CA8A04] rounded-lg shadow-md bg-white text-center space-y-6">
      <img
        src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png"
        alt="School Logo"
        className="w-20 mx-auto"
      />
      <h2 className="text-xl font-bold bg-[#CA8A04] text-white py-2 px-6 inline-block rounded shadow">
        Registration PAYMENT
      </h2>

      <div className="border border-yellow-800 p-4 space-y-4">
        {people.map((person, index) => (
          <div key={index} className="grid grid-cols-7 gap-2 items-center">
            <button
              onClick={() => handleSelect(index)}
              className={`px-3 py-1 rounded font-bold ${
                selectedIndex === index
                  ? 'bg-yellow-300 text-black border-2 border-yellow-700'
                  : 'bg-green-200 text-black'
              }`}
            >
              {selectedIndex === index ? '✓' : 'P'}
            </button>
            <input
              type="text"
              className="border p-1"
              value={person.firstName}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              className="border p-1"
              value={person.mobile}
              onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
              placeholder="Mobile"
            />
            <input
              type="text"
              className="border p-1"
              value={person.aadhaar}
              onChange={(e) => handleInputChange(index, 'aadhaar', e.target.value)}
              placeholder="Aadhaar"
            />
            <input
              type="date"
              className="border p-1"
              value={person.dob}
              onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
              placeholder="DOB"
            />
            <select
              className="border p-1"
              value={person.gender}
              onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="border p-1"
              value={person.relation}
              onChange={(e) => handleInputChange(index, 'relation', e.target.value)}
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Self">Self</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 border border-yellow-800 p-4 w-[60%] mx-auto">
        <label className="text-right font-semibold">Total Amount (Rs.)</label>
        <input
          className="border p-1 col-span-2"
          type="text"
          readOnly
          value={totalAmount.toFixed(2)}
        />
        <label className="text-right font-semibold">Tax Amount (Rs.)</label>
        <input
          className="border p-1 col-span-2"
          type="text"
          readOnly
          value={taxAmount.toFixed(2)}
        />
        <label className="text-right font-semibold">Grand Total Amount (Rs.)</label>
        <input
          className="border p-1 col-span-2"
          type="text"
          readOnly
          value={grandTotal.toFixed(2)}
        />
      </div>

      <button
        className="bg-[#CA8A04] hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
        onClick={handleSubmit}
      >
        PAYMENT NOW
      </button>
    </div>
  );
}
