import React, { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import Comp from "@components/comp";

function SearchParamsComponent() {
  // Initialize searchParams state
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state for input values
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
  });

  // useEffect(() => {
  //   // Populate input values from searchParams when component mounts
  //   const params = Object.fromEntries(searchParams);
  //   console.log(params);
  //   setInputValues(params);
  // }, [searchParams]);

  // Function to update input value and corresponding query parameter
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(searchParams);
    // Update searchParams with both parameters included
    setSearchParams({ ...inputValues, [name]: value });
  };
  const urlSearchParams = new URLSearchParams(window.location.search);

  // Create an empty object to store the parameters and their values
  const params = {};

  // Loop through each parameter in the URL search params
  for (const [key, value] of urlSearchParams.entries()) {
    // Add each parameter and its value to the params object
    params[key] = value;
  }

  console.log(params);
  return (
    <div>
      <input
        type="text"
        name="input1"
        value={inputValues.input1}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="input2"
        value={inputValues.input2}
        onChange={handleInputChange}
      />
      <select name="type" onChange={handleInputChange}>
        <option value="man">Man</option>
        <option value="Woman">Woman</option>
        <option value="accessoir">Accessoir</option>
      </select>
      <Comp {...params} />
    </div>
  );
}
export default SearchParamsComponent;
