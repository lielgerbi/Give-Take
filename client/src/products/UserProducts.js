import { useHistory  } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../GlobalContext";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {
  deletePostUser,
  getAllProducts,
  getFile
} from "../ApiService";
// import ScrollToTopOnMount from "../template/ScrollToTopOnMount";



function UserProducts() {
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [viewType, setViewType] = useState({ grid: true });
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
   // Function to update filtered products based on selected filters
  //  const updateFilteredProducts = (filteredProducts) => {
  //   setFilteredProducts(filteredProducts);
  // };
  const handleDelete = async (post) => {
    try {
      // Assuming deletePostUser is an asynchronous function
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
//   const handleFileChange = (event) => {
//     var preview = document.getElementById('preview');
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//         var reader = new FileReader();

//         reader.onload = function(e) {
//           preview.src = e.target.result;
//         };

//         reader.readAsDataURL(file);
//       } else {
//         // Handle case where no file is selected
//         preview.src = ""; // Clear the preview if no file is selected
//       }
// };



  return (
    <div className="container mt-5 py-4 px-xl-5">
      {/* <ScrollToTopOnMount /> */}
    

      <div className="row mb-4 mt-lg-3">
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
            {allProducts.map((product, index) => {
                    if (product?.userName === currentUser?.userName && currentUser && product.isAvailable=== true)
                    return (<div className="col" key={index}>
                    <div className="card shadow-sm">
                        {/* <img
                          className="card-img-top bg-dark cover"
                          height="200"
                          alt=""
                          src={Image}
                          <img src={'http://10.10.248.226/:443/'+product.photo}
                        /> */}
                        {product.photo!=="" && product.photo && <img src='http://10.10.248.226/:443/ca9aeb40-f99f-44e6-8943-c62f1c6e25fd.jpg' alt="Uploaded Image" className="card-img-top bg-dark cover" />}
                      <div className="card-body">
                        <h3 className="card-title text-center text-dark text-truncate">
                        {product?.subCategory} 
                        </h3>
                        <h4 className="card-title text-center text-dark text-truncate">{product?.categoryName}</h4>
                        <p className="card-text text-center text-muted mb-0">{product?.details}</p>
              
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

