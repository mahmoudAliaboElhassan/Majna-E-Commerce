import Input from "@components/sidebarFiltering/input";

const Price = ({ handleChangePrice,price }) => {
  return (
    <>
      <div style={{ marginLeft: "20px" }}>
        <h2 className="sidebar-title price-title" style={{ marginTop: "20px" }}>
          Price
        </h2>

        <label className="sidebar-label-container">
          <input
            onChange={handleChangePrice}
            type="radio"
            value=""
            name="test2"
            checked={price===""}
          />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChangePrice}
          value={50}
          title="$0 - 50"
          name="test2"
        />

        <Input
          handleChange={handleChangePrice}
          value={100}
          title="$50 - $100"
          name="test2"
        />

        <Input
          handleChangePrice={handleChangePrice}
          value={150}
          title="$100 - $150"
          name="test2"
        />

        <Input
          handleChange={handleChangePrice}
          value={200}
          title="Over $150"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
