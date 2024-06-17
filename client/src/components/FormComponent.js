import React, { useState, useEffect } from "react";
import '../styles/styles.css'

const FormComponent = ({ formType }) => {
  const countryCodes = [
    { code: "+1", name: "USA" },
    { code: "+91", name: "India" },
    { code: "+44", name: "United Kingdom" },
    { code: "+61", name: "Australia" },
    { code: "+86", name: "China" },
    { code: "+33", name: "France" },
    { code: "+49", name: "Germany" },
    { code: "+81", name: "Japan" },
    { code: "+7", name: "Russia" },
    { code: "+34", name: "Spain" },
    { code: "+54", name: "Argentina" },
    { code: "+55", name: "Brazil" },
    { code: "+357", name: "Cyprus" },
    { code: "+20", name: "Egypt" },
    { code: "+30", name: "Greece" },
    { code: "+62", name: "Indonesia" },
    { code: "+972", name: "Israel" },
    { code: "+254", name: "Kenya" },
    { code: "+60", name: "Malaysia" },
    { code: "+31", name: "Netherlands" },
  ];

  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [countryCode, setCountryCode] = useState(
    () => localStorage.getItem("countryCode") || countryCodes[0].code
  );
  const [phoneNumber, setPhoneNumber] = useState(
    () => localStorage.getItem("phoneNumber") || ""
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedCountryCode =
      localStorage.getItem("countryCode") || countryCodes[0].code;
    const storedPhoneNumber = localStorage.getItem("phoneNumber") || "";
    setName(storedName);
    setCountryCode(storedCountryCode);
    setPhoneNumber(storedPhoneNumber);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.match(/^[A-Za-z]+$/)) {
      newErrors.name = "Name must contain only alphabetic characters";
    }
    if (!phoneNumber.match(/^\d+$/)) {
      newErrors.phoneNumber = "Phone number must be numeric";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValid = validate();
      if (!isValid) return;

      localStorage.setItem("name", name);
      localStorage.setItem("countryCode", countryCode);
      localStorage.setItem("phoneNumber", phoneNumber);

      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, name, countryCode, phoneNumber }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">{formType}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country Code:</label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          >
            {countryCodes.map((code) => (
              <option key={code.code} value={code.code}>
                {code.name} ({code.code})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
