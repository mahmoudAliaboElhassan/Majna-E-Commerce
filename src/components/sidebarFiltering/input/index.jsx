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
      {title}
    </label>
  );
};

export default Input;
