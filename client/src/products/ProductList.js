import { Link } from "react-router-dom";
import Product from "./Product";
import { useState,useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../GlobalContext";
// import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

function FilterMenuLeft({ updateFilteredProducts }) {
   const { allCategories } = useContext(GlobalContext);
   const {allCities} = useContext(GlobalContext);
   const { allProducts } = useContext(GlobalContext);
   const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    subCategories: [],
    cities: [],
  });
  //  var categories = allCategories.map(category => category.categoryName);
   var cities = allCities.map(city => city.name);
   //var allSubnamesReduce = allCategories.reduce((acc, category) => acc.concat(category.subCategories), []);


    // Handler for checkbox changes
    const handleCheckboxChange = (type, value) => {
      setSelectedFilters(prevState => ({
        ...prevState,
        [type]: prevState[type].includes(value)
          ? prevState[type].filter(filter => filter !== value)
          : [...prevState[type], value],
      }));
    };
  
    // Apply button click handler
    const handleApplyFilters = () => {
      // Do something with selected filters, e.g., send to the server or update state
      console.log(selectedFilters);

        // Filter products based on selected criteria
    const filteredProducts = allProducts.filter(product => {
    // Check if the product's category is in the selected categories
    const categoryMatch = selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.categoryName);

    // Check if the product's subcategory is in the selected subcategories
    const subCategoryMatch = selectedFilters.subCategories.length === 0 || selectedFilters.subCategories.includes(product.subCategory);

    // Check if the product's city is in the selected cities
    const cityMatch = selectedFilters.cities.length === 0 || selectedFilters.cities.includes(product.city);

    // Return true only if all criteria match
    return categoryMatch && subCategoryMatch && cityMatch;
  });
  updateFilteredProducts(filteredProducts);
  console.log(filteredProducts);
    };
  return (
    <ul className="list-group list-group-flush rounded">
      {/* <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Categories</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => {
            return (
              <Link
                key={i}
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                replace
                onClick={() => handleCheckboxChange('categories', v)}
              >
                {v}
              </Link>
            );
          })}
        </div>
      </li> */}

       {allCategories.map((category, i) => {
            return (<li className="list-group-item">
        <h5 className="mt-1 mb-1">{category.categoryName}</h5>
        <div className="d-flex flex-column">
          {category.subCategories.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox"  onClick={() => {handleCheckboxChange('subCategories', v) ; handleCheckboxChange('categories', category.categoryName)}} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
       );
      })}
   
      {/* <li className="list-group-item">
        <h5 className="mt-1 mb-1">{category.categoryName}</h5>
        <div className="d-flex flex-column">
          {allSubnamesReduce.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox"  onClick={() => handleCheckboxChange('subCategories', v)} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li> */}
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Cities</h5>
        <div className="d-flex flex-column">
          {cities.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox"  onChange={() => handleCheckboxChange('cities', v)}/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        
        <div className="d-grid d-block mb-3">
          <button className="btn btn-dark" onClick={handleApplyFilters}>Apply</button>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const { allProducts } = useContext(GlobalContext);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
   // Function to update filtered products based on selected filters
   const updateFilteredProducts = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    setFilteredProducts(allProducts);
 }, [allProducts]);


  return (
    <div className="container mt-5 py-4 px-xl-5">
      {/* <ScrollToTopOnMount /> */}
      

 

      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter Products
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft updateFilteredProducts={updateFilteredProducts}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft updateFilteredProducts={updateFilteredProducts} />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
            {filteredProducts.map((product, index) => {
                    if (product.isAvailable)
                    return (<Product key={index} product={product} />);
                })}
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;


// import { Link } from "react-router-dom";
// import Product from "./Product";
// import { useState,useEffect, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { GlobalContext } from "../GlobalContext";
// // import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

// function FilterMenuLeft() {
//    const { allCategories } = useContext(GlobalContext);
//    const {allCities} = useContext(GlobalContext);
//    const { allProducts } = useContext(GlobalContext);
//    const [selectedFilters, setSelectedFilters] = useState({
//     categories: [],
//     subCategories: [],
//     cities: [],
//   });
//   //  var categories = allCategories.map(category => category.categoryName);
//    var cities = allCities.map(city => city.name);
//    //var allSubnamesReduce = allCategories.reduce((acc, category) => acc.concat(category.subCategories), []);


//     // Handler for checkbox changes
//     const handleCheckboxChange = (type, value) => {
//       setSelectedFilters(prevState => ({
//         ...prevState,
//         [type]: prevState[type].includes(value)
//           ? prevState[type].filter(filter => filter !== value)
//           : [...prevState[type], value],
//       }));
//     };
  
//     // Apply button click handler
//     const handleApplyFilters = () => {
//       // Do something with selected filters, e.g., send to the server or update state
//       console.log(selectedFilters);

//         // Filter products based on selected criteria
//     const filteredProducts = allProducts.filter(product => {
//     // Check if the product's category is in the selected categories
//     const categoryMatch = selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.categoryName);

//     // Check if the product's subcategory is in the selected subcategories
//     const subCategoryMatch = selectedFilters.subCategories.length === 0 || selectedFilters.subCategories.includes(product.subCategory);

//     // Check if the product's city is in the selected cities
//     const cityMatch = selectedFilters.cities.length === 0 || selectedFilters.cities.includes(product.city);

//     // Return true only if all criteria match
//     return categoryMatch || subCategoryMatch || cityMatch;
//   });
//   console.log(filteredProducts);
  
//     };
//   return (
//     <ul className="list-group list-group-flush rounded">
//       {/* <li className="list-group-item d-none d-lg-block">
//         <h5 className="mt-1 mb-2">Categories</h5>
//         <div className="d-flex flex-wrap my-2">
//           {categories.map((v, i) => {
//             return (
//               <Link
//                 key={i}
//                 to="/products"
//                 className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
//                 replace
//                 onClick={() => handleCheckboxChange('categories', v)}
//               >
//                 {v}
//               </Link>
//             );
//           })}
//         </div>
//       </li> */}

//        {allCategories.map((category, i) => {
//             return (<li className="list-group-item">
//         <h5 className="mt-1 mb-1">{category.categoryName}</h5>
//         <div className="d-flex flex-column">
//           {category.subCategories.map((v, i) => {
//             return (
//               <div key={i} className="form-check">
//                 <input className="form-check-input" type="checkbox"  onClick={() => {handleCheckboxChange('subCategories', v) ; handleCheckboxChange('categories', category.categoryName)}} />
//                 <label className="form-check-label" htmlFor="flexCheckDefault">
//                   {v}
//                 </label>
//               </div>
//             );
//           })}
//         </div>
//       </li>
//        );
//       })}
   
//       {/* <li className="list-group-item">
//         <h5 className="mt-1 mb-1">{category.categoryName}</h5>
//         <div className="d-flex flex-column">
//           {allSubnamesReduce.map((v, i) => {
//             return (
//               <div key={i} className="form-check">
//                 <input className="form-check-input" type="checkbox"  onClick={() => handleCheckboxChange('subCategories', v)} />
//                 <label className="form-check-label" htmlFor="flexCheckDefault">
//                   {v}
//                 </label>
//               </div>
//             );
//           })}
//         </div>
//       </li> */}
//       <li className="list-group-item">
//         <h5 className="mt-1 mb-1">Cities</h5>
//         <div className="d-flex flex-column">
//           {cities.map((v, i) => {
//             return (
//               <div key={i} className="form-check">
//                 <input className="form-check-input" type="checkbox"  onChange={() => handleCheckboxChange('cities', v)}/>
//                 <label className="form-check-label" htmlFor="flexCheckDefault">
//                   {v}
//                 </label>
//               </div>
//             );
//           })}
//         </div>
//       </li>
//       <li className="list-group-item">
        
//         <div className="d-grid d-block mb-3">
//           <button className="btn btn-dark" onClick={handleApplyFilters}>Apply</button>
//         </div>
//       </li>
//     </ul>
//   );
// }

// function ProductList() {
//   const { allProducts } = useContext(GlobalContext);
//   // const [filteredProducts, setFilteredProducts] = useState(allProducts);
// //   useEffect(() => {
// //     setFilteredProducts(allProducts);
// //     console.log(filteredProducts);
// //     debugger
// //  }, []);

//   // Function to update filtered products based on selected filters
//   // const updateFilteredProducts = (filteredProducts) => {
//   //   debugger
//   //   setFilteredProducts(filteredProducts);
//   //   console.log(filteredProducts)
//   //   debugger
//   // };


//   return (
//     <div className="container mt-5 py-4 px-xl-5">
//       {/* <ScrollToTopOnMount /> */}
      

 

//       <div className="row mb-3 d-block d-lg-none">
//         <div className="col-12">
//           <div id="accordionFilter" className="accordion shadow-sm">
//             <div className="accordion-item">
//               <h2 className="accordion-header" id="headingOne">
//                 <button
//                   className="accordion-button fw-bold collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#collapseFilter"
//                   aria-expanded="false"
//                   aria-controls="collapseFilter"
//                 >
//                   Filter Products
//                 </button>
//               </h2>
//             </div>
//             <div
//               id="collapseFilter"
//               className="accordion-collapse collapse"
//               data-bs-parent="#accordionFilter"
//             >
//               <div className="accordion-body p-0">
//                 <FilterMenuLeft/>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row mb-4 mt-lg-3">
//         <div className="d-none d-lg-block col-lg-3">
//           <div className="border rounded shadow-sm">
//             <FilterMenuLeft />
//           </div>
//         </div>
//         <div className="col-lg-9">
//           <div className="d-flex flex-column h-100">
            
//             <div
//               className={
//                 "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-3"
//               }
//             >
//             {allProducts.map((product, index) => {
//                     if (product.isAvailable)
//                     return (<Product key={index} product={product}/>);
//                 })}
//             </div>
           
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductList;
