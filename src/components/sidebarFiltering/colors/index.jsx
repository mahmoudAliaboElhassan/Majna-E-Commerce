import Input from "@components/sidebarFiltering/input";

import Typography from "@mui/material/Typography";

const Colors = ({ handleChangeColor, color }) => {
  return (
    <>
      <div>
        <Typography
          sx={{ fontSize: { xs: "15px", sm: "18px", md: "21px", lg: "24px" } }}
          className="sidebar-title"
        >
          colors
        </Typography>
        <label className="sidebar-label-container">
          <input
            onChange={handleChangeColor}
            type="radio"
            value=""
            name="test1"
            checked={color === ""}
          />
          <span className="checkmark all"></span>
          All
        </label>

        <Input
          handleChange={handleChangeColor}
          value="black"
          title="Black"
          name="test1"
          color="black"
        />

        <Input
          handleChange={handleChangeColor}
          value="blue"
          title="Blue"
          name="test1"
          color="blue"
        />

        <Input
          handleChange={handleChangeColor}
          value="red"
          title="Red"
          name="test1"
          color="red"
        />

        <Input
          handleChange={handleChangeColor}
          value="green"
          title="Green"
          name="test1"
          color="green"
        />

        <label className="sidebar-label-container">
          <input
            onChange={handleChangeColor}
            type="radio"
            value="white"
            name="test1"
          />
          <span
            className="checkmark"
            style={{ background: "white", border: "2px solid black" }}
          ></span>
          White
        </label>
      </div>
    </>
  );
};

export default Colors;
