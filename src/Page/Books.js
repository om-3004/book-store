import React, { useEffect, useState } from 'react'
import LogeedNav from '../Component/LoggedNav'
import axios from 'axios';
import { BaseUrl } from '../Component/Const';
import '../Books.css';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularIndeterminate from '../Component/Loader';

const BooksPagList = () => {
    const Navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(`${BaseUrl}api/book/all`).then((res) => {
            var a = res.data.result;
            // console.log(a);
            setLoading(false);
            setBooks(a);
            // console.log(res.data.result);
            // console.log(books);
        });

    }, []);
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

    const deletecall = (b) => {
        setLoading(true);

        console.log(b.id);

        // const {b.id}=useParams();
        axios.delete(`${BaseUrl}api/book?id=${b.id}`).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                window.location.reload(false);
                setLoading(false);
                toast.success("Book Deleted Successfully...");
            } else {
                setLoading(false);
                toast.error("Something went wrong !!!");
            }
        });

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
                    Book Page
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
                        size='small'
                        style={{
                            fontStyle: 'italic',
                            // color:''
                            width: '350px',

                        }}
                        onChange={(val) => {
                            searchbook(val.target);
                        }}
                    />
                    <button className='add-btn'
                        onClick={() => {
                            Navigate('/addproduct');
                        }}
                    >
                        Add
                    </button>
                </div>
            {loading?<CircularIndeterminate />:<span></span>}
                <div>

                    <TableContainer>
                        <Table sx={{ minWidth: 1100 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={7}
                                        style={{

                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Book Name
                                    </TableCell>
                                    <TableCell
                                        style={{

                                            fontWeight: 'bold',
                                        }}
                                        colSpan={4} >Price</TableCell>
                                    <TableCell
                                        style={{

                                            fontWeight: 'bold',
                                        }}
                                        colSpan={4} >Category</TableCell>
                                    <TableCell
                                        style={{

                                            fontWeight: 'bold',
                                        }}
                                        colSpan={2} ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {books.map((i) => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell colSpan={7} >{i.name}</TableCell>
                                            <TableCell colSpan={4} >{i.price}</TableCell>
                                            <TableCell colSpan={4} >{i.category}</TableCell>
                                            <TableCell colSpan={2} >
                                                <button className='edit-btn'
                                                    onClick={() => {
                                                        Navigate('/editbook', {
                                                            state: {
                                                                id: i.id,
                                                                name: `${i.name}`,
                                                                price: i.price,
                                                                category: `${i.category}`,
                                                                categoryId: i.categoryId,
                                                                description: `${i.description}`,
                                                                base64image: `${i.base64image}`,
                                                            }
                                                        });
                                                    }}
                                                >
                                                    Edit</button>
                                                <button className='delete-btn'
                                                    onClick={() => {
                                                        deletecall(i);

                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </TableCell>
                                        </TableRow>

                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <table className='table-style'>
                        <tr>
                            <th>Book Name</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                        <tr>

                        </tr>

                    </table> */}
                </div>
            </div >
        </>
    )
}

export default BooksPagList
