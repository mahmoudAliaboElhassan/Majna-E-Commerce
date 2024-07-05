const ShowProducts = ({ records, renderProducts }) => {
  return <>{records?.map((record) => renderProducts(record))}</>;
};
export default ShowProducts;
