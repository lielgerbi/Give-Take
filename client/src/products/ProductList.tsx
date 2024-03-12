import React, { useState, useEffect, useContext } from "react";
import { Select } from 'antd';
import { GlobalContext } from "../GlobalContext";
import { ProductProps } from "./Product";
import Product from "./Product";

interface City {
    value: string;
    label: string;
}

interface SelectedFilters {
    categories: string[];
    subCategories: string[];
    cities: string[];
}

function FilterMenuLeft({ updateFilteredProducts }: { updateFilteredProducts: (filteredProducts: ProductProps[]) => void }) {
    const { allCategories } = useContext(GlobalContext);
    const { allCities } = useContext(GlobalContext);
    const { allProducts } = useContext(GlobalContext);
    const [selectCity, setSelectCity] = useState<string | undefined>();
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        categories: [],
        subCategories: [],
        cities: [],
    });
    const menuCities: City[] = allCities.map(city => ({
        value: city,
        label: city,
    }));

    // Handler for checkbox changes
    const handleCheckboxChange = (type: keyof SelectedFilters, value: string) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            [type]: prevState[type].includes(value)
                ? prevState[type].filter(filter => filter !== value)
                : [...prevState[type], value],
        }));
    };

    const onChangeCity = (value: string) => {
        console.log(`selected ${value}`);
        setSelectCity(value)
    };

    const handleApplyFilters = () => {
        // Filter products based on selected criteria
        var filteredProducts = allProducts.filter(product => {
            // Check if the product's category is in the selected categories
            const categoryMatch = selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.categoryName);

            // Check if the product's subcategory is in the selected subcategories
            const subCategoryMatch = selectedFilters.subCategories.length === 0 || selectedFilters.subCategories.includes(product.subCategory);

            // Return true only if all criteria match
            return categoryMatch && subCategoryMatch;
        });

        filteredProducts = filteredProducts.filter(product => {
            return product.city === selectCity;
        });

        updateFilteredProducts(filteredProducts);
    };

    return (
        <ul className="list-group list-group-flush rounded">
            {allCategories.map((category, i) => (
                <li className="list-group-item" key={i}>
                    <h5 className="mt-1 mb-1">{category.categoryName}</h5>
                    <div className="d-flex flex-column">
                        {category.subCategories.map((v: string, i: number) => (
                            <div key={i} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    onClick={() => { handleCheckboxChange('subCategories', v); handleCheckboxChange('categories', category.categoryName) }}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {v}
                                </label>
                            </div>
                        ))}
                    </div>
                </li>
            ))}
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Cities</h5>
                <div className="d-flex flex-column">
                    <Select
                        showSearch
                        placeholder="Select City"
                        style={{ width: 150 }}
                        onChange={onChangeCity}
                        options={menuCities}
                    />
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
    const { allProducts } = useContext(GlobalContext);
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(allProducts);
    const updateFilteredProducts = (filteredProducts: ProductProps[]) => {
        setFilteredProducts(filteredProducts);
    };

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, [allProducts]);

    return (
        <div className="container mt-5 py-4 px-xl-5">
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
                            data-bs-parent="#accordionFilter">
                            <div className="accordion-body p-0">
                                <FilterMenuLeft updateFilteredProducts={updateFilteredProducts} />
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
                                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-3"
                            }
                        >
                            {filteredProducts.map((product, index) => {
                                return (<Product key={index} product={product as ProductProps['product']} />);
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
// import { Select} from 'antd';
// import { GlobalContext } from "../GlobalContext";

// function FilterMenuLeft({ updateFilteredProducts }) {
//    const { allCategories } = useContext(GlobalContext);
//    const {allCities} = useContext(GlobalContext);
//    const { allProducts } = useContext(GlobalContext);
//    const [selectCity, setSelectCity] = useState()
//    const [selectedFilters, setSelectedFilters] = useState({
//     categories: [],
//     subCategories: [],
//     cities: [],
//   });
//   const menuCities = allCities.map(city => ({
//     value: city,
//     label: city,
//   }));

  
//     // Handler for checkbox changes
//     const handleCheckboxChange = (type, value) => {
//       setSelectedFilters(prevState => ({
//         ...prevState,
//         [type]: prevState[type].includes(value)
//           ? prevState[type].filter(filter => filter !== value)
//           : [...prevState[type], value],
//       }));
//     };
//     const onChangeCity = (value) => {
//       console.log(`selected ${value}`);
//       setSelectCity(value)
//   };
//     const handleApplyFilters = () => {
//     // Filter products based on selected criteria
//     var filteredProducts = allProducts.filter(product => {
//     // Check if the product's category is in the selected categories
//     const categoryMatch = selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.categoryName);

//     // Check if the product's subcategory is in the selected subcategories
//     const subCategoryMatch = selectedFilters.subCategories.length === 0 || selectedFilters.subCategories.includes(product.subCategory);
//     // Return true only if all criteria match
//     return categoryMatch && subCategoryMatch ;
//   });

//   filteredProducts = filteredProducts.filter(product => {
//     return product.city === selectCity;
//     });
//   updateFilteredProducts(filteredProducts);
  
//   };
//   return (
//     <ul className="list-group list-group-flush rounded">
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
//       <li className="list-group-item">
//         <h5 className="mt-1 mb-1">Cities</h5>
//         <div className="d-flex flex-column">
//           <Select
//                             showSearch
//                             placeholder="Select City"
//                             style={{ width: 150 }}
//                             onChange={onChangeCity}
//                             options={menuCities}
//                         />
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
//   const [filteredProducts, setFilteredProducts] = useState(allProducts);
//   const updateFilteredProducts = (filteredProducts) => {
//     setFilteredProducts(filteredProducts);
//   };

//   useEffect(() => {
//     setFilteredProducts(allProducts);
//  }, [allProducts]);


//   return (
//     <div className="container mt-5 py-4 px-xl-5">
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
//               data-bs-parent="#accordionFilter">
//               <div className="accordion-body p-0">
//                 <FilterMenuLeft updateFilteredProducts={updateFilteredProducts}/>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row mb-4 mt-lg-3">
//         <div className="d-none d-lg-block col-lg-3">
//           <div className="border rounded shadow-sm">
//             <FilterMenuLeft updateFilteredProducts={updateFilteredProducts} />
//           </div>
//         </div>
//         <div className="col-lg-9">
//           <div className="d-flex flex-column h-100">
//             <div
//               className={
//                 "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-3"
//               }
//             >
//             {filteredProducts.map((product, index) => {
//                     if (product.isAvailable)
//                     return (<Product key={index} product={product} />);
//                 })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductList;