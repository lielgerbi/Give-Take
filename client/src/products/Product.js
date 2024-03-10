import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'antd';
import { ReactComponent as X } from "./closeModal.svg";
import "./product.css";
import {
  deletePostUser
} from "../ApiService";


function Product(props ,onDelete) {
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


const handleDelete = () => {
  const res = deletePostUser(product._id);
  onDelete(product.id);
};
  

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
            <div className="modalContiner">
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
            {product.photo!=="" && product.photo && <img src={'http://10.10.248.226:443/'+product.photo} height="200" alt="Uploaded Image" className="card-img-top bg-dark cover" />}
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
          {product?.subCategory} {product?.categoryName}
          </h5>
          <p className="card-text text-center text-muted mb-0">{product?.details}</p>

          <div className="d-grid d-block">
            total comments {product.comments ===undefined ? 0: product.comments.length}
            <button className="btn btn-outline-dark mt-3" onClick={() => setCommentPopUp(true)}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Write comments
            </button>
            {allowEdit && <button className="btn btn-outline-dark mt-3" onClick={handleDelete}>
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
