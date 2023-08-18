import React from "react";
import '../BookCard.css';
import { BaseUrl } from "./Const";
import { toast } from "react-toastify";
import axios from "axios";



const BookCard = (props) => {
    const values={
        bookId:props.id,
        userId:props.userId,
        quantity:1
        
    };
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BaseUrl}api/cart`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            bookId:props.id,
            userId:props.userId,
            quantity:1
            
        })
    };
    const addtocart=()=>{
        console.log(config.data);
        axios(config).then((res)=>{
            if(res.status===200){
                var totalprice = sessionStorage.getItem('totalprice');
                totalprice = totalprice + props.price;
                toast("Book Added to cart successfullt");
            }
        }).catch((e)=>{
            console.log("Could not add to cart");
            toast.error("Could not add to cart");
        });
    }
    return (
        <>
        
            <div className="Card">
                <img className="card_img" src={props.base64image} alt='product image' />
                {/*<img className="card_img" src="data:image/jpeg;base64,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" alt="Image of Movie/Series" />*/}
                <div className="card-info">
                    <h3 className="card-title">{props.name}</h3>
                    <span className="card-category">{props.category}</span>
                    <p className="card-description">{props.description}</p>
                    <h5 className="card-price">Rs.{props.price}</h5>
                    
                        <button 
                        onClick={addtocart}
                        className="card-button">Add To Cart</button>
                    
                </div>

            </div>

        </>
    );
}

export default BookCard;
