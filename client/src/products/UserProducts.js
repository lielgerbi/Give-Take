import { useHistory  } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../GlobalContext";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {
  deletePostUser,
  getAllProducts,
} from "../ApiService";

function UserProducts() {
  const history = useHistory();
  const {connectedUser, allProducts, setAllProducts ,setEditPost} = useContext(GlobalContext);
  const [currentUser,setCurrentUser] = useState(undefined)
  useEffect(() => {
    console.log(allProducts)
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Parse the stored user data
      const userData = JSON.parse(storedUser);
      // Update state only if necessary
      if (userData !== connectedUser) {
        setCurrentUser(userData);
      }
    }
  }, []);
  const handleDelete = async (post) => {
    try {
      let res = await deletePostUser(post);
      console.log(res);
      if(res.status === 200){
        let products = await getAllProducts();
        setAllProducts(products.data);

      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    setEditPost(post)
    history.push('/editPost')
   
  };

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <div className="row mb-4 mt-lg-3">
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0  row-cols-xl-3"
              }
            >
            {allProducts.map((product, index) => {
                    if (product?.userName === currentUser?.userName && currentUser && product.isAvailable=== true)
                    return (<div className="col" key={index}>
                    <div className="card shadow-sm">
                        {product.photo!=="" && product.photo && <img src={'http://10.10.248.226:443/'+product.photo} alt="Uploaded Image" className="card-img-top bg-dark cover" />}
                      <div className="card-body">
                      <h5 className="card-title text-center text-dark text-truncate">
                        {product?.subCategory} {product?.categoryName}
                      </h5>
                      <p className="card-text text-center text-muted mb-0">{product?.details.length>20 ? product?.details.substring(0, 20) + '...': product?.details==""? "no details were added":product?.details}</p>
                            
                      <div className="d-grid d-block">
                          <button className="btn btn-outline-dark mt-3" onClick={() => handleDelete(product)}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                          </button>
                          <button onClick={() => handleEdit(product)}>
                            <FontAwesomeIcon icon={faPencilAlt} /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>);
                })}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProducts;

