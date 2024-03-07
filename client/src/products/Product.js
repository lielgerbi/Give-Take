import React, { useContext, useEffect, useState } from "react";
import Image from "./Phone.jfif";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../GlobalContext";
import { Modal } from 'antd';
import {
  deletePost
} from "../ApiService";
import { ReactComponent as X } from "./closeModal.svg";
import "./product.css";
function Product(props) {
  const [commentPopUp,setCommentPopUp] = useState(false);
  const [newComment , setNewComment] = useState("");
  let {product} = props;
  let {allowEdit} = props;
  
    // Update Input value
    function handleInput(e) {
      setNewComment(e.target.value)
   }

   function addComment(){
     if (newComment.length)
     {
       console.log("TODO - "+newComment);
     }
     setCommentPopUp(false);

   }

   async function deletePost(){
     await deletePost(product._id)

   }
  return (
    <>
    <Modal
      height={400}
      visible={commentPopUp}
      onCancel={() => setCommentPopUp(false)}
      onOk={()=> addComment()}
      closable={false}
      zIndex={100}
      centered
    >
      


<div className="modalTitle">
        <X height={24} width={24} className="XIcon" onClick={() => { setCommentPopUp(false) }} />
        <div className="textTitle">{product?.subCategory} - {product.details}</div>
      </div >
      <div className="divCenter" style={{ paddingTop: "10px", paddingBottom: "10px" }} >
        <div className="nofictaion">
          
            {/* <div className={styles.divCenter}></div> */}
            <div className="modalContiner">
            {/* <div>
              <lable className="details"></lable>
            </div> */}
            <div className="comment">
               {product.comments && (
                  product.comments.map((comment, index) => (
                    <div className="textBody" key={index}>{comment.text} - {comment.userid}</div>
                  ))
                )}
                <input type="text"  placeholder="enter comment" onInput={event => handleInput(event)} onChange={event => handleInput(event)} />
              </div>
                 
                       
            </div>
         
        </div>
      </div>
    
    </Modal>
    <div className="col">
      <div className="card shadow-sm">
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={Image}
          />
        <div className="card-body">
          <h3 className="card-title text-center text-dark text-truncate">
          {product?.subCategory} 
          </h3>
          <h4 className="card-title text-center text-dark text-truncate">{product?.categoryName}</h4>
          <p className="card-text text-center text-muted mb-0">{product?.details}</p>

          <div className="d-grid d-block">
            total comments {product.comments ==undefined ? 0: product.comments.length}
            <button className="btn btn-outline-dark mt-3" onClick={() => setCommentPopUp(true)}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Write comments
            </button>
            {allowEdit && <button className="btn btn-outline-dark mt-3" onClick={deletePost}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> delete
            </button>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Product;
