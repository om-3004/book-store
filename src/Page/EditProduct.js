import { TextField, Select, MenuItem, InputLabel, Button, InputAdornment } from "@mui/material";
import "../EditProduct.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BaseUrl } from "../Component/Const";
import LogeedNav from "../Component/LoggedNav";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularIndeterminate from "../Component/Loader";
import FormControl from '@mui/material/FormControl';

export const EditProduct = () => {
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`${BaseUrl}api/category/all`).then((res) => {
            setCategories(res.data.result);
        })
    }, []);
    const Navigate = useNavigate();
    const location = useLocation();
    const bookprop = location.state;
    console.log(bookprop);
    const initialValue = {
        id: bookprop.id,
        // id: 20,
        name: bookprop.name,
        description: bookprop.description,
        price: bookprop.price,
        categoryId: bookprop.categoryId,
        base64image: bookprop.base64image,

    };
    const validateSchema = Yup.object().shape({
        name: Yup.string().required("required"),
        price: Yup.string().required("required"),
        description: Yup.string().required("required"),
    });

    function onClickSubmit(values) {
        setLoading(true);
        var config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BaseUrl}api/book`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(values)
        };
        axios(config)
            .then(function (res) {
                console.log(res.status);
                if (res.status === 200) {
                    toast.success('Book updated successfully...');
                    Navigate('/productlist');
                    setLoading(false);
                    <ToastContainer />

                } else {
                    setLoading(false);
                    toast.error('Something went wrong. Please try again!');
                }
                setLoading(false);
            })
            .catch(function () {
                toast.error("Could'nt Update");
                setLoading(false);
            });

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
                            // fontSize: "35",
                            fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                        }}
                    >
                        Edit Product
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
                </div>
                {loading ? <CircularIndeterminate /> : <span></span>}
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
                                    {/* <span>Book Name*</span> */}
                                    <TextField
                                        id="outlined-basic"
                                        name="name"
                                        label="Book Name*"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.bookname && errors.bookname && (
                                        <div className="error">{errors.bookname}</div>
                                    )}
                                </div>

                                <div className="itemContainer">
                                    {/* <span>Book Price(Rs)*</span> */}
                                    <TextField
                                        id="outlined-basic"
                                        label="Book Price(Rs)*"
                                        // label={bookprop.price}
                                        value={values.price}
                                        // label="Price"
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label ">Category</InputLabel>
                                        <Select
                                            defaultValue=""
                                            name="CategoryId"
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
                                            value={values.categoryId}
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
                                        label="Description"
                                        fullWidth
                                        multiline
                                        value={values.description}
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
                                                width: "70px",
                                                marginRight: "10px"
                                            }}
                                            src={values.base64image} />
                                        <Button
                                            variant="raised"
                                            component="span"
                                            style={{
                                                backgroundColor: "#F14d54",
                                                color: "white",
                                                height: "40px",
                                                marginBottom: '50px',
                                                width: "120px",
                                            }}
                                        >
                                            Upload photo
                                        </Button>
                                        <input
                                            accept="image/*"
                                            //   className={classes.input}
                                            //   style={{ display:  }}
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

                                    </label>
                                </div>

                                <br />

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