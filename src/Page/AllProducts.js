import React from "react";
import axios from "axios";
import BookCard from "../Component/BookCard";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { BaseUrl } from "../Component/Const";
import LogeedNav from "../Component/LoggedNav";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../AllProducts.css'
import CircularIndeterminate from "../Component/Loader";

const AllProducts = () => {
    const Navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        setLoading(true);
        axios.get(`${BaseUrl}api/book/all`).then((res) => {
            var a = res.data.result;
            setBooks(a);
            setLoading(false);
        });

    }, []);
    function SortOrder(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }
    function sortlist(prop) {
        if (prop == 2) {
            books.sort(SortOrder('name'));
            setBooks(books);
            console.log(books);
        } else {
            books.sort(SortOrder('name')).reverse();
            setBooks(books);
            console.log(books);
        }
    }
    const searchbook = (prop) => {
        prop.value = prop.value.replace('  ', '');
        console.log(prop.value);
        if (prop.value == "" || prop.value == " ") {
            axios.get(`${BaseUrl}api/book/all`).then((res) => {
                var a = res.data.result;
                setBooks(a);
            });
        } else {
            axios.get(`${BaseUrl}api/book/search?keyword=${prop.value}`).then((res) => {
                setBooks(res.data.result);
            })
        }
    }
    return (
        <>
            <LogeedNav />

            <div id='heading'>
                <div style={{
                    fontSize: 32,
                    fontWeight: "bolder",
                    color: "#2E2E2E",
                }}>
                    Book Listing
                </div>
                {/* </h1> */}
                <br />
                <div style={{
                    width: 140,
                    height: 0,
                    border: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(255,89,92)",
                    marginBottom: 30
                }}>
                </div>
                <div
                    className='search-div'
                >
                    <TextField
                        name='search'
                        label='Search...'
                        placeholder="Search..."
                        size='small'
                        style={{
                            fontStyle: 'italic',
                            width: '350px',

                        }}
                        onChange={(val) => {
                            searchbook(val.target);
                        }}
                    /><div>
                        <span className="sort-style">Sort-By</span>
                        <Select
                            style={{
                                width: "200px",
                            }}
                            name="sort"
                            labelId="CategoryList"
                            fullWidth
                            size="small"
                            onChange={(e) => sortlist(e.target.value)}
                        >
                            <MenuItem className="menu" value="2">A-Z</MenuItem>
                            <MenuItem className="menu" value="3">Z-A</MenuItem>

                        </Select>
                    </div></div></div>

            {loading ? <CircularIndeterminate /> : <span></span>}
            <div style={{
                padding: '15px',
                marginLeft: '25px',
                display: 'grid',

            }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {books.map((i) => {
                        return (
                            <Grid item xs={2} sm={4} md={3} key={i.id}>
                                <BookCard

                                    id={i.id}
                                    name={i.name}
                                    price={i.price}
                                    category={i.category}
                                    base64image={i.base64image}
                                    description={i.description}
                                    userId={user.id}

                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </>
    );
}

export default AllProducts;