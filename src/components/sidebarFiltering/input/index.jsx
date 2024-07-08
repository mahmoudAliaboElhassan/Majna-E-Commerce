import { Typography } from "@mui/material";

const Input = ({ handleChange, value, title, name, color, isCheck }) => {
  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleChange}
        type="radio"
        value={value}
        name={name}
        checked={isCheck}
      />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      <Typography
        sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "20px" } }}
      >
        {title}
      </Typography>
    </label>
  );
};

export default Input;
