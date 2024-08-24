import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.scss";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const pincode = e.target.pincode.value;
    if (pincode.length < 6) {
      setError(true);
      return;
    }
    navigate(`pincode/${pincode}`);
  };
  return (
    <form id="main_form" onSubmit={handleSubmit}>
      <h1>Enter Pincode</h1>
      <div>
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
        />
        {error && <p className="error_msg">the code is not 6 digits</p>}
      </div>

      <button>Lookup</button>
    </form>
  );
};

export default Form;
