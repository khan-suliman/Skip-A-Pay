import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Pagination, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useQuery from "hooks/useQuery";
import "./style/customPagination.scss";

const CustomPagination = ({ count, className }) => {
  const query = useQuery();
  let skip = query.get("skip") ?? 1;
  const navigate = useNavigate();
  const [page, setPage] = useState(skip);

  // for check page
  const [isFirst, setisFirst] = useState(page === 1);
  const [isLast, setisLast] = useState(parseInt(page) >= count);
  useEffect(() => {
    setPage(parseInt(skip));
    setisFirst(parseInt(skip) === 1);
    setisLast(parseInt(skip) >= count);
  }, [skip, count]);
  const handleNext = () => {
    // const skip = window
    const nextSkip = parseInt(skip) + 1;
    navigate(`?skip=${nextSkip}`);
  };
  const handlePrev = () => {
    // const skip = window
    const nextSkip = parseInt(skip) - 1;
    navigate(`?skip=${nextSkip}`);
  };
  const handleCurrentPage = (value) => {
    navigate(`?skip=${value.target.getAttribute("value")}`, { replace: true });
  };
  const updateFirst = (value) => {
    // const skip = window
    const nextSkip = 1;
    navigate(`?skip=${nextSkip}`);
  };
  const updateLast = (value) => {
    // const skip = window
    const nextSkip = count;
    navigate(`?skip=${nextSkip}`);
  };
  // classes for pagination
  let classes = `justify-content-center custom-paginations ${className}`;

  // handling paging numbers.
  const renderPageItems = () => {
    const items = [];
    if (count <= 10) {
      for (let pageNumber = 1; pageNumber < count; pageNumber++) {
        items.push(
          <Pagination.Item
            value={pageNumber}
            key={pageNumber}
            active={pageNumber === page}
            onClick={handleCurrentPage}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }
    } else {
      for (let pageNumber = 1; pageNumber < 10; pageNumber++) {
        if (page < 5 && pageNumber < 5) {
          items.push(
            <Pagination.Item
              value={pageNumber}
              key={pageNumber}
              active={pageNumber === page}
              onClick={handleCurrentPage}
            >
              {pageNumber}
            </Pagination.Item>
          );
        } else {
          items.push(
            <Pagination.Item
              value={count - pageNumber}
              key={count - pageNumber}
              active={(count - pageNumber) === page}
              onClick={handleCurrentPage}
            >
              {count - pageNumber}
            </Pagination.Item>
          );
        }
      }
    }
    return items;
  }
  return (
    <Stack>
      <Pagination className={classes}>
        <Pagination.First onClick={updateFirst} disabled={isFirst} />
        <Pagination.Prev onClick={handlePrev} disabled={isFirst} />
        {renderPageItems()}
        {/* <Pagination.Item as={Link} to="/page1" active>{1}</Pagination.Item>
                <Pagination.Item as={Link} to="/page2">{2}</Pagination.Item> */}
        {/* {Array.from({ length: count }, (_, index) => {
          let pageNumber = index + 1;
          if (pageNumber === page) {
            return (
              <Pagination.Item key={pageNumber} active>
                {pageNumber}
              </Pagination.Item>
            );
          }
          return (
            <Pagination.Item
              value={pageNumber}
              key={pageNumber}
              onClick={handleCurrentPage}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })} */}
        {/* <Pagination.Ellipsis />

                <Pagination.Item href='google.com'>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Ellipsis /> */}
        {/* <Pagination.Item>{20}</Pagination.Item> */}
        <Pagination.Next onClick={handleNext} disabled={isLast} />
        <Pagination.Last onClick={updateLast} disabled={isLast} />
      </Pagination>
    </Stack>
  );
};
CustomPagination.propTypes = {
  userdetails: PropTypes.object,
};
export default CustomPagination;
