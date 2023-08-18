import { TextField, Select, MenuItem, InputLabel, Button, InputAdornment } from "@mui/material";
import "../EditProduct.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BaseUrl } from "../Component/Const";
import LogeedNav from "../Component/LoggedNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../Component/Loader";
import FormControl from '@mui/material/FormControl';

export const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`${BaseUrl}api/category/all`).then((res) => {
            setCategories(res.data.result);
        })
    }, []);
    const initialValue = {
        name: "",
        description: "",
        price: 0,
        categoryId: 3,
        base64image: "",

    };
    const validateSchema = Yup.object().shape({
        name: Yup.string().required("required"),
        price: Yup.string().required("required"),
        description: Yup.string().required("required"),
    });

    function onClickSubmit(values) {
        setLoading(true);
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BaseUrl}api/book`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(values)
        };
        axios(config)
            .then(function (res) {
                console.log(res.status);
                if (res.status === 409) {
                    console.log("Already exist");
                    toast.success('Book already exist. Please update book if you want!');
                    setLoading(false);
                    <ToastContainer />
                } else if (res.status === 200) {
                    toast.success('Book Added successfully...');
                    Navigate('/productlist');
                    setLoading(false);
                    <ToastContainer />
                } else {
                    console.log(res.status);
                    toast.error('Something went wrong. Please try again!');
                    setLoading(false);
                }

            })
            .catch(function () {
                toast.error("Could'nt Add book");
                setLoading(false);
            });

        setLoading(false);
    }
    return (
        <>
            <LogeedNav />
            <div
                style={{
                    fontFamily: "Roboto",
                }}
            >
                <div id="heading">
                    <h1
                        style={{
                            fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                        }}
                    >
                        Add Product
                    </h1>
                    <div style={{
                        width: 170,
                        height: 0,
                        border: 1,
                        borderStyle: "solid",
                        borderColor: "rgb(255,89,92)",
                        marginBottom: 30
                    }}>
                    </div>
                    {loading ? <CircularIndeterminate /> : <span></span>}
                </div>
                <Formik
                    initialValues={initialValue}
                    validationSchema={validateSchema}
                    onSubmit={onClickSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                    }) => (
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="GridContainer">
                                <div className="itemContainer">

                                    <TextField
                                        id="outlined-basic"
                                        name="name"
                                        label="Book Name*"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.bookname && errors.bookname && (
                                        <div className="error">{errors.bookname}</div>
                                    )}
                                </div>

                                <div className="itemContainer">
                                    <TextField
                                        id="outlined-basic"
                                        label="Book Price(Rs)*"
                                        name="price"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.price && errors.price && (
                                        <div className="error">{errors.price}</div>
                                    )}
                                </div>
                                <div className="itemContainer">
                                    {/* <span>Category</span> */}
                                    <FormControl fullWidth>

                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            defaultValue=""
                                            name="categoryId"
                                            style={{
                                                width: "20",
                                            }}
                                            labelId="CategoryList"
                                            id="demo-simple-select"
                                            label="Category"
                                            fullWidth
                                            size="small"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {categories.map((i) => {
                                                return (
                                                    <MenuItem value={i.id} key={i.id}>{i.name}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="itemContainer">
                                    <TextField
                                        name="description"
                                        id="outlined-multiline-flexible"
                                        label="Description*"
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.description && errors.description && (
                                        <div className="error">{errors.description}</div>
                                    )}
                                </div>
                                <div
                                    style={{
                                        position: "relative",
                                        alignItems: "center",
                                    }}
                                >
                                    <label htmlFor="raised-button-file">
                                        <img
                                            style={{
                                                height: '70px',
                                                margin: '10px'

                                            }}
                                            src={values.base64image} />
                                        <Button
                                            variant="raised"
                                            component="span"
                                            style={{
                                                backgroundColor: "#F14d54",
                                                color: "white",
                                                height: "50px",
                                                marginBottom: '50px',
                                                width: "150px",
                                            }}
                                        >
                                            Upload Photo
                                        </Button>
                                    </label>
                                    <input
                                        accept="image/*"
                                        id="raised-button-file"
                                        name="base64image"
                                        multiple
                                        type="file"
                                        style={{
                                            width: "0px",
                                        }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {/* <TextField
                                        name="base64image"
                                        id="outlined-multiline-flexible"
                                        // label="Description"
                                        fullWidth
                                        multiline
                                        label="Or paste url here"
                                        size="small"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    /> */}
                                </div>


                                <br />
                                {/* <div></div> */}

                                <div
                                    style={{
                                        display: "flex",
                                        felxDirection: "row",
                                        columnGap: "1vh",
                                    }}
                                >
                                    <Button
                                        variant="raised"
                                        type="submit"
                                        style={{
                                            backgroundColor: "#7dc12b",
                                            color: "white",
                                            height: "40px",
                                            width: "100px",
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="raised"
                                        style={{
                                            backgroundColor: "#F14d54",
                                            color: "white",
                                            height: "40px",
                                            width: "100px",
                                        }}
                                        onClick={() => {
                                            Navigate('/productlist');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};
