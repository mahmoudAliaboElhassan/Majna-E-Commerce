import { Fragment, useEffect, useState } from "react";
// import { Pagination } from "react-bootstrap";

const ReactBootstrap = () => {
  const [page, setPage] = useState(1);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const Fetchdata = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?_page=${page}`
      );
      const postid = await data.json();
      console.log(postid);
      setPost(postid);
      console.log(`page is ${page}`);
    };
    Fetchdata();
  }, [page]);

  let items = [];
  for (let number = 1; number <= 10; number++) {
    // items.push(
    //   <Pagination.Item
    //     key={number}
    //     active={number === page}
    //     onClick={() => setPage(number)}
    //   >
    //     {number}
    //   </Pagination.Item>
    // );
  }

  return (
    <Fragment>
      <div>
        {" "}
        Hello{" "}
        {post?.map((p) => (
          <div item md={6} key={p.id}>
            {p.id}
          </div>
        ))}
        <div>
          {/* <Pagination>{items}</Pagination> */}
          <br />
        </div>
      </div>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Increase
      </button>
    </Fragment>
  );
};

export default ReactBootstrap;
