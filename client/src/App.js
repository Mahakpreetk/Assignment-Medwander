import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FormA from "./pages/FormA";
import FormB from "./pages/FormB";

function App() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetch("http://localhost:5000/api/sync-excel")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message); // Show message in an alert
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error syncing Excel:", error);
        setRefreshing(false);
      });
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home handleRefresh={handleRefresh} />} />
          <Route path="/form-a" element={<FormA />} />
          <Route path="/form-b" element={<FormB />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
