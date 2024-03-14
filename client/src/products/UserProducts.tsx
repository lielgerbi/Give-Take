import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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
  const { connectedUser, allProducts, setAllProducts, setEditPost } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState<{ userName: string } | null>(null); // Define type for currentUser

  useEffect(() => {
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
  const handleClickUpload = () => {
    history.push('/newProduct');
  };

  const handleDelete = async (post: any) => { // Define type for post
    try {
      let res = await deletePostUser(post);
      if (res.status === 200) {
        let products = await getAllProducts();
        setAllProducts(products.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post: any) => { // Define type for post
    setEditPost(post);
    history.push('/editPost');
  };

  return (
    <div className="container mt-5 py-4 pr-xl-4">
  <div className="row mb-4 mt-lg-3">
    <div className="col-lg-9">
      <div className="d-flex flex-column h-100">

          {allProducts.length>0?
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 g-3 mb-4 flex-shrink-0"
              }
            >
              {allProducts.map((product, index) => {
                if (product?.userName === currentUser?.userName && currentUser && product.isAvailable === true)
                  return (
                    <div className="col" key={index}>
                      <div className="card shadow-sm">
                        {product.photo !== "" && product.photo && <img src={process.env.REACT_APP_API_URL + '/' + product.photo} alt="Uploaded Image" className="card-img-top bg-dark cover productImg" />}
                        <div className="card-body">
                          <h5 className="card-title text-center text-dark text-truncate">
                            {product?.subCategory} {product?.categoryName}
                          </h5>
                          <p className="card-text text-center text-muted mb-0">{product?.details.length > 20 ? product?.details.substring(0, 20) + '...' : product?.details == "" ? "no details were added" : product?.details}</p>

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
                    </div>
                  );
              })}
            </div>:
            <div style={{paddingTop:"50px"}}>
              <h1>You haven't upload products yet</h1>
              <span onClick={handleClickUpload}>upload now</span>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProducts;