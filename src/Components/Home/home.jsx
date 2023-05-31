
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./home.css";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn, MDBCotainer } from 'mdb-react-ui-kit'

function App() {
    const [items, setItems] = useState([]);
    const [values, setValues] = useState([]);
    const [sortValues, setSortValues] = useState("");
    const [sortFilterValues, setSortFilterValues] = useState("");
    const [operation, setOperation] = useState("");

    const sortOptions = ["title", "subject", "author", "published_date"];

    const [currentPage, setCurrentpage] = useState(0);

    let limit = 6;


    useEffect(() => {
        loadBooksData(0, limit, 0);
    }, []);

    const loadBooksData = async (start, end, increase, opType = null, SearchByValue) => {


        switch (opType) {
            case "search":
                setOperation(opType);
                setValues("");
                console.log(values);
                return await axios.get(`https://books-data-0y74.onrender.com/books?q=${values}&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setItems(response.data);
                        setCurrentpage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));

            case "searchBy":
                setOperation(opType);
                setSortFilterValues(sortFilterValues);
                return await axios.get(`https://books-data-0y74.onrender.com/books?_sort=${SearchByValue}&_order=asc&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setItems(response.data);
                        setCurrentpage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));

            default:
                return await axios.get(`https://books-data-0y74.onrender.com/books?_start=${start}&_end=${end}`)
                    .then((response) => {
                        setItems(response.data);
                        setCurrentpage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));

        }

    };

    const handleSearch = async (e) => {
        e.preventDefault();
        loadBooksData(0,limit,0,"search")
    };

    const handleSearchBy = async (e) => {
        let value = e.target.value;
        setSortValues(value);
        loadBooksData(0, limit, 0, "searchBy", value);
    };

    const handleReset = () => {
        loadBooksData(0, limit, 0)
    };

    const pagination = () => {
        if (currentPage === 0 && items.length < limit) {
            return null;
        }
        else if (currentPage === 0) {

            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            1
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadBooksData(limit, limit * 2, 1, operation, sortFilterValues)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        }
        else if (currentPage < limit - 1 && items.length === limit) {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadBooksData((currentPage - 1) * limit, currentPage * limit, -1, operation, sortFilterValues)}>
                            Prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            {currentPage + 1}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadBooksData((currentPage + 1) * limit, (currentPage + 2) * limit, 1, operation, sortFilterValues)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
        else {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadBooksData((currentPage - 1) * limit, currentPage * limit, -1, operation, sortFilterValues)}>
                            Prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            {currentPage + 1}
                        </MDBPaginationLink>
                    </MDBPaginationItem>

                </MDBPagination>
            )
        }
    };

    return (
        <div className="container">
            <div className="row m-2">
                <div className="search-container">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Enter Your Book Name" className="input"
                            value={values} onChange={e => setValues(e.target.value)} />
                        <button type="sbmit" className="search-btn">Search</button>
                    </form>
                </div>
                <div>
                    <br />
                    <h5>Search by:</h5>
                    <p>It will sort the books in asending order depending on the field selected</p>
                    <select onChange={handleSearchBy} value={sortValues} className="select">
                        <option>Please select the option</option>
                        {sortOptions.map((item, index) => (
                            <option value={item} key={index}> {item}</option>
                        ))}
                    </select>
                </div>
                <br />
                <h5>Book List:</h5>
                <h6>Number of Books : {items.length}</h6>
                {items.map((item) => {
                    return (
                        <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                            <div class="book-card">
                                <img src={item.image} alt="Book Image" class="book-image" />
                                <div class="book-details">
                                    <h2 class="book-title">{item.title}</h2>
                                    <p class="book-author">{item.author}</p>
                                    <p class="book-subject">{item.subject}</p>
                                    <p class="book-published-date">{item.published_date}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="pagination">{pagination()}</div>

        </div>
    );
}

export default App;
