import React, { useState } from "react";
import * as Yup from 'yup';
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../Login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseUrl } from "../Component/Const";
import LoginNav from "../Component/LoginNav";
import CircularIndeterminate from "../Component/Loader";

const Login = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const initialValue = {
        // name: "",
        email: "",
        password: "",
    };

    const loginisubmit = async (value) => {
        setLoading(true);
        console.log("Submit clicked...", value);

        await axios.get(`${BaseUrl}api/user/all`).then((res) => {
            console.log("Inside authcheck");
            // console.log(value);
            if (res.status === 200) {
                // console.log(res.data);
                console.log(value.email, " ", value.password);
                var userdata = res.data.result;
                userdata.map((i) => {
                    if (i.email === value.email && i.password === value.password) {
                        // console.log("Done...");
                        setLoading(false);
                        toast.success("successfully log in");
                        console.log(i);
                        sessionStorage.setItem('user', JSON.stringify(i));
                        sessionStorage.setItem('totalprice', 0);
                        Navigate('/productlist');
                    }
                    else {
                        setLoading(false);
                    }
                })
            } else {
                // console.log("No data fetched !!!");
                toast.error("No user found");
                setLoading(false);
            }
        }).catch((r) => {
            toast.error("Couldn't Login");
            setLoading(false);
        });

    }
    const validateSchema = Yup.object().shape({
        email: Yup.string().email("Please enter valid email").required("Please provide an email address"),
        password: Yup.string().oneOf([Yup.ref('password'), null]).matches(/[A-Z]/, "Password must require atleast 1 capital letter character").matches(/[a-z]/, "Password must require atleast 1 small letter character").min(8, 'Password must require minimum 8 character').required("Please provide a valid password"),

    });

    return (
        <>
            <LoginNav />
            <div className="login-page">
                <div className="signup-in-box">
                    <div className="registered-customer">

                        <Formik
                            initialValues={initialValue}
                            validationSchema={validateSchema}
                            onSubmit={loginisubmit}
                        >
                            {({
                                values,
                                touched,
                                errors,
                                handleSubmit,
                                handleChange,
                                handleBlur,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div style={{
                                        margin: '10px',
                                        padding: '10px',

                                    }}>
                                        <div className="head-login">Login</div>
                                        <div className="customer-heading"> Registered Customers </div>
                                        <span className="sign-up-in-title">If you have an account with us, please log in</span><br></br>
                                        <br></br>
                                        <TextField
                                            id="outlined-basic"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            className="input-field"
                                            fullWidth
                                        />
                                        <br></br>
                                        <span className="err-msg">

                                            {touched.email && errors.email && <div
                                            //   className={appStyle.error}
                                            >{errors.email}</div>}
                                        </span>

                                        <br></br>
                                        <TextField

                                            id="outlined-basic"
                                            name="password"
                                            label="Password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            type={'password'}
                                            className="input-field"
                                            fullWidth
                                        />
                                        <br></br>
                                        <span className="err-msg">
                                            {touched.password && errors.password && <div
                                            //   className={appStyle.error}
                                            >{errors.password}</div>}
                                        </span>

                                        <br></br>
                                        <div>
                                            <a href="/signup">Or create an account</a>
                                        </div>
                                        <Button type="submit" variant="contained" style={{
                                            backgroundColor: '#f14d54',
                                            color: 'white',
                                            marginTop: '20px',
                                        }}
                                        >
                                            LogIn
                                        </Button>
                                        <br></br>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;