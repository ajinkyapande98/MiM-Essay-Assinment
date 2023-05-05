import React, { useState, useRef } from "react";

function PhoneVerificationPopup() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== " ") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "") {
        focusNextInput(index);
      }
    }
  };

  const focusPrevInput = (e, index) => {
    if (e.target.value === "") {
      if (inputs.current[index - 1]) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const focusPrevInputwithArrow = (e, index) => {
    if (inputs.current[index - 1]) {
      inputs.current[index - 1].focus();
    }
  };

  const focusNextInput = (index) => {
    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const otpArray = pastedData.match(/\d/g);
    if (otpArray && otpArray.length === 6) {
      const newOtp = otpArray.slice(0, 6);
      setOtp(newOtp);
      inputs.current[0].focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    alert(`OTP submitted: ${enteredOtp}`);
  };

  return (
    <div className=" text-center mt-20">
      {/* <button onClick={() => alert("Phone verification popup triggered!")}>
        Trigger Phone Verification Popup
      </button> */}
      <h1 className=" m-2 font-semibold text-lg">Phone Number Verification</h1>
      <div>
        <h1>Enter Otp Here</h1>
        {otp.map((value, index) => (
          <input
            key={index}
            className=" border-b-2 m-2 w-12 outline-none"
            type="text"
            maxLength="1"
            value={value}
            ref={(input) => (inputs.current[index] = input)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                focusPrevInputwithArrow(e, index);
              } else if (e.key === "ArrowRight") {
                focusNextInput(index);
              } else if (e.key === "Backspace") {
                focusPrevInput(e, index);
              }
            }}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className=" flex  justify-center">
        <div className="flex gap-28 text-blue-600">
          <p>Change Number</p>
          <p>Resend Otp</p>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className=" bg-green-500 text-white rounded-lg p-1 mt-6"
      >
        Verify Phone Number
      </button>
    </div>
  );
}

export default PhoneVerificationPopup;
