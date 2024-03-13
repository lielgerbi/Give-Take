import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from 'antd';
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import "./product.css";
import {
  updatePost,
  getAllProducts,
} from "../ApiService";

interface Comment {
  userName: string;
  text: string;
}

// Exporting the ProductProps interface
export interface ProductProps { 
  product: {
      _id?: string;
      photo?: string;
      subCategory?: string;
      categoryName?: string;
      details?: string;
      comments?: Comment[];
      isAvailable?: boolean;
      userName?: string;
      city?: string;
  };
}

const Product: React.FC<ProductProps> = ({product}) => {
  const history = useHistory();
  const [commentPopUp, setCommentPopUp] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { connectedUser, setAllProducts, setConnectedUser } = useContext(GlobalContext);
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    // Check if user data exists in localStorage
    if (storedUser && connectedUser === undefined) {
      // Parse the stored user data
      const userData = JSON.parse(storedUser);
      setConnectedUser(userData);
    }
    setNewComment("");
  }, []);

  // Update Input value
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNewComment(e.target.value)
  }

async function addComment() {
  debugger
      if (newComment.length && product.comments !== undefined && product._id!==undefined) {
        const comment: Comment = { userName: connectedUser.userName, text: newComment };
        product.comments.push(comment);
        const post = await updatePost(product._id, product);
        console.log("edit", post);
        const products = await getAllProducts();
        setNewComment("");
        setAllProducts(products.data);
        setCommentPopUp(false);
        history.push("/products");
      } else {
        // Handle the case where product.comments is undefined
        console.error("Product comments are undefined");
      }
    }

  return (
    <>
      <Modal
        visible={commentPopUp}
        onCancel={() => setCommentPopUp(false)}
        onOk={addComment}
        closable={false}
        zIndex={100}
        centered
      >
        <div className="modalTitle">
          <div className="textTitle">{product?.subCategory} - {product.details}</div>
        </div>
        <div className="divCenter" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <div className="nofictaion">
            <div className="modalContiner">
              <div className="comment">
                {product.comments && (
                  product.comments.map((comment, index) => (
                    <div className="textBody" key={index}>{comment.text} - {comment.userName}</div>
                  ))
                )}
                <input type="text" placeholder="enter comment" onInput={handleInput} onChange={handleInput} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="col">
        <div className="card shadow-sm">
          {product.photo !== "" && product.photo && <img src={process.env.REACT_APP_API_URL + '/' + product.photo} height="200" alt="Uploaded Image" className="card-img-top bg-dark cover productImg" />}
          <div className="card-body">
            <h5 className="card-title text-center text-dark text-truncate">
              {product?.subCategory} {product?.categoryName}
            </h5>
            <p className="card-text text-center text-muted mb-0">
              {product?.details && product.details.length > 20
                ? product.details.substring(0, 20) + '...'
                : product?.details === "" || product?.details === undefined
                ? "No details were added"
                : product?.details}
            </p>
            <div className="d-grid d-block">
              total comments {product.comments === undefined ? 0 : product.comments.length}
              <button className="btn btn-outline-dark mt-3" onClick={() => setCommentPopUp(true)}>
                <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Write comments
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;




// import React, { useEffect,useState,useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Modal } from 'antd';
// import { useHistory } from "react-router-dom";
// import { ReactComponent as X } from "./closeModal.svg";
// import { GlobalContext } from "../GlobalContext";
// import "./product.css";
// import {
//   updatePost,
//   getAllProducts,
//   deletePostUser
// } from "../ApiService";


// function Product(props ,onDelete) {
//   const history = useHistory();
//   const [commentPopUp,setCommentPopUp] = useState(false);
//   const [newComment , setNewComment] = useState("");
//   const {connectedUser ,setAllProducts ,setConnectedUser } = useContext(GlobalContext);
//   const storedUser = localStorage.getItem('user');
//   let {product} = props;
//   let {allowEdit} = props;
  
//   useEffect(() => {
//     // Check if user data exists in localStorage
//     if (storedUser && connectedUser===undefined) {
//       // Parse the stored user data
//       const userData = JSON.parse(storedUser);
//       setConnectedUser(userData);
//     }
//     setNewComment("")
//   }, []);
//     // Update Input value
//     function handleInput(e) {
//       setNewComment(e.target.value)
//    }

//    async function addComment(){
//      if (newComment.length)
//      {
//       var comment = { userName: connectedUser.userName, text: newComment};
//       product.comments.push(comment);
//       const post = await updatePost(product._id,product);
//       console.log("edit", post);
//       const products = await getAllProducts();
//       setNewComment("")
//       setAllProducts(products.data);
//       setCommentPopUp(false);
//       history.push("/products");
//      }
     

//    }

//   const handleDelete = () => {
//     const res = deletePostUser(product._id);
//     onDelete(product.id);
//   };
  

//   return (
//     <>
//     <Modal
//       // height={400}
//       title={product.details}
//       visible={commentPopUp}
//       onCancel={() => setCommentPopUp(false)}
//       onOk={()=> addComment()}
//       closable={false}
//       zIndex={100}
//       centered
//     >
      

//     <div className="modalTitle">
//         <X height={24} width={24} className="XIcon" onClick={() => { setCommentPopUp(false) }} />
//         <div className="textTitle">{product?.subCategory} - {product.details}</div>
//       </div >
//       <div className="divCenter" style={{ paddingTop: "10px", paddingBottom: "10px" }} >
//         <div className="nofictaion">
//             <div className="modalContiner">
//             <div className="comment">
//                {product.comments && (
//                   product.comments.map((comment, index) => (
//                     <div className="textBody" key={index}>{comment.text} - {comment.userName}</div>
//                   ))
//                 )}
//                 <input type="text"  placeholder="enter comment" onInput={event => handleInput(event)} onChange={event => handleInput(event)} />
//               </div>
                 
                       
//             </div>
         
//         </div>
//       </div>
    
//     </Modal>
//     <div className="col">
//       <div className="card shadow-sm">
//             {product.photo!=="" && product.photo && <img src={process.env.REACT_APP_API_URL+'/'+product.photo} height="200" alt="Uploaded Image" className="card-img-top bg-dark cover" />}
//         <div className="card-body">
//           <h5 className="card-title text-center text-dark text-truncate">
//           {product?.subCategory} {product?.categoryName}
//           </h5>
//           <p className="card-text text-center text-muted mb-0">{product?.details.length>20 ? product?.details.substring(0, 20) + '...': product?.details==""? "no details were added":product?.details}</p>

//           <div className="d-grid d-block">
//             total comments {product.comments ===undefined ? 0: product.comments.length}
//             <button className="btn btn-outline-dark mt-3" onClick={() => setCommentPopUp(true)}>
//               <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Write comments
//             </button>
//             {allowEdit && <button className="btn btn-outline-dark mt-3" onClick={handleDelete}>
//               <FontAwesomeIcon icon={["fas", "cart-plus"]} /> delete
//             </button>}
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default Product;
