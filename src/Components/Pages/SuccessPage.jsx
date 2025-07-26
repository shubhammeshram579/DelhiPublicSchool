import React from 'react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border-2 border-blue-500 p-6 max-w-3xl w-full text-center rounded-lg shadow">
        <img src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png" alt="DPS Logo" className="mx-auto h-24 mb-4" />

        <h1 className="text-xl font-semibold text-gray-800">
          <span className="font-bold">Delhi Public School</span>
        </h1>

        <p className="text-gray-600 mt-1">
          Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,
          Maharashtra 411060
        </p>

        <div className="my-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Symbol_thumbs_up.svg/765px-Symbol_thumbs_up.svg.png" alt="Success" className="w-20 mx-auto mb-6" />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow text-lg"
            onClick={() => window.location.href = '/MemberDashboard'} // or redirect to dashboard/home
          >
            Registration Successful
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
