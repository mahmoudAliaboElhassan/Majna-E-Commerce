
import {useState}from "react";
const UseToggle = () => {
  const [status, setStatus] = useState(false);
  const toggle = (value) => {
    setStatus(value || ((status) => !status));
  };
  return [status, toggle];
};
export default UseToggle;
