import React, { useEffect, useState } from "react";
import LogeedNav from "../Component/LoggedNav";
import "../Cart.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../Component/Const";
import axios from "axios";
import { toast } from "react-toastify";
// import bookimage from "./download.jpeg";

const Cart = () => {
    const Navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [totalprice,setTotalPrice]=useState(0);
    var user = JSON.parse(sessionStorage.getItem('user'));
    var tp = sessionStorage.getItem('totalprice')
    // var totalpriceCount = 0;
    useEffect(() => {
        // ${user.id}
        axios.get(`${BaseUrl}api/cart?userId=${user.id}`).then((res) => {
            var result = res.data.result;
            setBooks(result);
            setTotalPrice(tp);
            // books.map((i)=>{
            //     console.log(parseFloat(totalprice));
            //     console.log(i);
            //     setTotalPrice(parseInt(totalprice)+parseInt( i.book.price));
            // });
            console.log(result);
        }).catch((e) => {
            console.log("couldn't fetch data");
        });
    }, []);
    
    const updateqty=(prop)=>{
        console.log(prop);
        if(prop.opn==='+'){
            prop.obj.quantity+=1;
            console.log(prop.obj.quantity);
            setTotalPrice(totalprice + prop.obj.book.price)
            
        }else if(prop.opn==='-'){
            if(prop.obj.quantity!==1){
            prop.obj.quantity-=1;
            setTotalPrice(totalprice - prop.obj.book.price)
            }else{
            toast.error("Quantity should atleast one");
            return 0;
            }
            console.log(prop.obj.quantity);
        }
        const values={
            id:prop.obj.id,
            bookId:prop.obj.bookId,
            userId:prop.obj.userId,
            quantity:prop.obj.quantity,
            
        };
        var config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BaseUrl}api/cart`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(values)
        };
        axios(config).then((res)=>{
            if(res.status===200){
                axios.get(`${BaseUrl}api/cart?userId=${user.id}`).then((res) => {
                    var result = res.data.result;
                    setBooks(result);
                    sessionStorage.setItem('totalprice',totalprice);
                }).catch((e) => {
                    console.log("couldn't fetch data");
                });
            toast.success("Quantity changed successfully");
            }
        }).catch((e)=>{
            axios.get(`${BaseUrl}api/cart?userId=${user.id}`).then((res) => {
                var result = res.data.result;
                setBooks(result);
                console.log(result);
            }).catch((e) => {
                console.log("couldn't fetch data");
            });
            toast.error("Could not change quantity");
        });
    }
    const placeorder=()=>{
        var cardids=[books.map((i)=>{
            return i.id;
        })];
        if(cardids[0].length===0){
            toast.error("Please add book to cart");
            return 0;
        }
        // console.log(cardids[0]);
        const values={
                userId: user.id,
                cartIds: cardids[0]
            
        };
        console.log(values);
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BaseUrl}api/order`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(values)
        };
        axios(config).then((res)=>{
            toast.success("Order placed successfully");
            Navigate('/productlist');
        }).catch((r)=>{
            toast.error((e)=>{
                console.log(e);
                toast.error("Could not place order");

            });
        });
    }
    const removecart=(i)=>{
            console.log(i.id);
            axios.delete(`${BaseUrl}api/cart?id=${i.id}`).then((res)=>{
                toast.success("Removed form cart successfully");
                axios.get(`${BaseUrl}api/cart?userId=${user.id}`).then((res) => {
                    var result = res.data.result;
                    setBooks(result);
                }).catch((e) => {
                    console.log("couldn't fetch data");
                });
            }).catch((e)=>{
                axios.get(`${BaseUrl}api/cart?userId=${user.id}`).then((res) => {
                    var result = res.data.result;
                    setBooks(result);
                }).catch((e) => {
                    console.log("couldn't fetch data");
                });
                toast.error("Could not removed form cart");
            })
    }
    return (
        <>
            <LogeedNav />

            <div className="cart-page-wrapper">
                <div id="heading" >
                    <h1
                        style={{
                            fontSize: "35",
                            fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                        }}
                    >
                        Cart Page
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
                <div className="cart-page-subheading">
                    <h2>My Shopping Bag</h2>
                    <div className="cart-total-price">
                        {/* <h3>Total Price: {totalprice}</h3> */}
                    </div>
                </div>
                <div className="cart-page-card-wrapper">
                    {books.map((i) => {
                        return (
                            <div className="cart-card" key={i.id}>
                                <div className="left-content">

                                    <div className="img-wrapper">
                                        <img
                                            //    src={bookimage}
                                            src={i.book.base64image}
                                            alt="bookimage" className="book-image"></img>
                                    </div>
                                </div>
                                <div className="content-wrapper">
                                    <div className="card-content-top">
                                        <div className="content-top-left">
                                            <p className="book-name">{i.book.name}</p>
                                            <p className="book-author">{i.book.category}</p>
                                        </div>
                                        <div className="book-price">MRP:{i.book.price}</div>
                                    </div>
                                    <div className="card-content-bottom">
                                        <div className="quantity-group">
                                            <button onClick={()=>{updateqty({obj:i,opn:'+'})}} className="qty-button">
                                                <span>+</span>
                                            </button>
                                            <div className="qty-count">
                                                <span>{i.quantity}</span>
                                            </div>
                                            <button onClick={()=>{updateqty({obj:i,opn:'-'})}} className="qty-button">
                                                <span>-</span>
                                            </button>
                                        </div>
                                        <Button variant="outlined" style={{
                                            color: '#f14d54',
                                            border: '0px',
                                        }} className="remove"
                                        onClick={()=>{removecart(i)}}
                                        >Remove</Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="place-order">
                        <button className="place-order-btn"
                            onClick={() => {
                                placeorder();
                                // Navigate('/productlist');
                            }}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;