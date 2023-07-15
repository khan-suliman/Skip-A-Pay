import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Pagination, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useQuery from "hooks/useQuery";
import "./style/customPagination.scss";

const CustomPagination = ({ count, className }) => {
  const query = useQuery();
  let skip = query.get("skip") ?? 1;
  const navigate = useNavigate();
  // this page is actually an active page where it come from url. 
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
    const nextSkip = parseInt(skip) + 1;
    navigate(`?skip=${nextSkip}`);
  };
  const handlePrev = () => {
    const nextSkip = parseInt(skip) - 1;
    navigate(`?skip=${nextSkip}`);
  };
  const handleCurrentPage = (value) => {
    navigate(`?skip=${value.target.getAttribute("value")}`, { replace: true });
  };
  const updateFirst = (value) => {
    const nextSkip = 1;
    navigate(`?skip=${nextSkip}`);
  };
  const updateLast = (value) => {
    const nextSkip = count;
    navigate(`?skip=${nextSkip}`);
  };
  // classes for pagination
  let classes = `justify-content-center custom-paginations ${className}`;

  // handling paging numbers.
  const renderPageItems = () => {
    // least number for when pagenumbers more then 100
    let checkActivePage = 0;

    const items = [];
    // if all pages is less then 10 the it will static direct give those pages.  
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
      // here page is an active page.
      if (page < (count - 10)) {
        for (let pageNumber = 1; pageNumber <= 10; pageNumber++) {
          items.push(
            <Pagination.Item
              value={page}
              key={page + checkActivePage}
              active={page + checkActivePage === page}
              onClick={handleCurrentPage}
            >
              {page + checkActivePage}
            </Pagination.Item>
          );
          if (pageNumber === 10) {
            items.push(<Pagination.Ellipsis disabled key={`eclipse-${pageNumber}`} />)
            items.push(
              <Pagination.Item
                value={count}
                key={count}
                active={count === page}
                onClick={handleCurrentPage}
              >
                {count}
              </Pagination.Item>
            );
          }
          checkActivePage++;
        }
      } else {
        for (let pageNumber = 10; pageNumber >= 1; pageNumber--) {
          if (pageNumber === 10) {
            items.push(<Pagination.Ellipsis disabled key={`eclipse-${pageNumber}`} />)
          }
          items.push(
            <Pagination.Item
              value={count - pageNumber}
              key={count - pageNumber}
              active={count - pageNumber === page}
              onClick={handleCurrentPage}
            >
              {count - pageNumber}
            </Pagination.Item>
          );
          // checkActivePage++;
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
