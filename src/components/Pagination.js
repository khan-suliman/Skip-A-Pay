import PropTypes from "prop-types";
import { useState } from "react";
import {
    Pagination,
    Stack
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CustomPaginations = ({ current }) => {
    const navigate = useNavigate();
    // testing pagination count
    // const paginationCount = 100;
    const [page, setPage] = useState(current);
    // let items = [];
    // let [checkFirst, setCheckFirst] = useState(current === 1);
    // console.log(checkFirst);
    const handleNext = () => {
        // const skip = window
        navigate(`?skip=${page}`);
    }
    const handleCurrentPage = (value) => {
        console.log(value.target.getAttribute('value'));
        navigate(`?skip=${value.target.getAttribute('value')}`, { replace: true });
    }
    return (
        <Stack>
            <Pagination className="justify-content-center">
                <Pagination.First />
                <Pagination.Prev />
                {/* <Pagination.Item as={Link} to="/page1" active>{1}</Pagination.Item>
                <Pagination.Item as={Link} to="/page2">{2}</Pagination.Item> */}
                {Array.from({ length: 10 }, (_, index) => {
                    let pageNumber = index + 1;
                    if (pageNumber === page) {
                        return <Pagination.Item key={pageNumber} active>
                            {pageNumber}
                        </Pagination.Item>
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
                })}
                {/* <Pagination.Ellipsis />

                <Pagination.Item href='google.com'>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Ellipsis /> */}
                {/* <Pagination.Item>{20}</Pagination.Item> */}
                <Pagination.Next onClick={handleNext} />
                <Pagination.Last />
            </Pagination>
        </Stack>
    );
};
CustomPaginations.propTypes = {
    userdetails: PropTypes.object,
};
export default CustomPaginations;
