import { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import "../loginComps/loginPage.css";
import { Select } from 'antd';
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import {
  newPost,
  getAllProducts,
  newfile
} from "../ApiService";

function NewProduct() {
  const history = useHistory();
  const { connectedUser, allCategories, allCities, setAllProducts, setConnectedUser } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState({
    categoryName: "",
    subCategory: "",
    details: "",
    city: "",
    photo: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(-1);

  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    if (storedUser && connectedUser === undefined) {
      const userData = JSON.parse(storedUser);
      setConnectedUser(userData);
    }
  }, []);

  const menuSub = categoryIndex !== -1 ? allCategories[categoryIndex]?.subCategories.map((subCategory: string) => ({
    value: subCategory,
    label: subCategory,
  })) : [];

  const menuCities = allCities.map(city => ({
    value: city,
    label: city,
  }));

  const menuCategories = allCategories.map(category => ({
    value: category.categoryName,
    label: category.categoryName,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      await handleDownload();
      const post = await newPost(connectedUser.userName, formValues);
      console.log("add", post);
      const products = await getAllProducts();
      setAllProducts(products.data);
      history.push("/landing");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDownload = async () => {
    if (selectedFile) {
      var guid = uuidv4();
      const fileExtension = selectedFile.name.split('.').pop();
      guid = guid + "." + fileExtension;
      formValues.photo = guid;

      const formData = new FormData();
      formData.append('image', selectedFile, guid);
      try {
        const res = await newfile(formData);
        return res;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected.');
    }
  };

  const onChangeCity = (value: string) => {
    formValues.city = value;
  };

  const onChangeCategory = (value: string) => {
    formValues.categoryName = value;
    setCategoryIndex(allCategories.findIndex(category => category.categoryName === value));
  };

  const onChangeSubCategory = (value: string) => {
    formValues.subCategory = value;
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    var preview = document.getElementById('preview') as HTMLImageElement;
    const file = event.target.files![0];
    setSelectedFile(file);
    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target!.result as string;
        };

        reader.readAsDataURL(file);
    } else {
        preview.src = ""; // Clear the preview if no file is selected
    }
};

  useEffect(() => {
    if (isSubmit) {
      console.log(formValues);
    }
  }, [formValues, isSubmit]);

  return (
    <>
      <div className="bgImg">
        <div className="container_login">
          <form onSubmit={handleSubmit}>
            <h1>upload product</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <Select
                  showSearch
                  placeholder="Select Category"
                  style={{ width: 150 }}
                  onChange={onChangeCategory}
                  options={menuCategories}
                />
              </div>
              <div className="field">
                <Select
                  showSearch
                  placeholder="Select Sub Category"
                  style={{ width: 150 }}
                  onChange={onChangeSubCategory}
                  options={menuSub}
                />
              </div>
              <div className="field">
                <Select
                  showSearch
                  placeholder="Select City"
                  style={{ width: 150 }}
                  onChange={onChangeCity}
                  options={menuCities}
                />
              </div>
              <div className="field">
                <label>details about your product:</label>
                <input
                  style={{ width: 200, height: 100 }}
                  name="details"
                  placeholder="write sum details"
                  value={formValues.details}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <div className="image-uploader-container">
                  <label className="file-input-label">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      id="imageInput"
                      accept="image/*"
                      className="file-input"
                    />
                    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                    Choose File
                  </label>
                  <img id="preview" src="" alt="Image Preview" style={{ maxWidth: 200, maxHeight: 200 }}></img>
                  {selectedFile !== null && <label>{selectedFile.name}</label>}
                </div>
              </div>
              <button className="singbutton">upload my product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProduct;




// import { useState, useEffect,useContext } from "react";
// import "../loginComps/loginPage.css";
// import { Select} from 'antd';
// import { useHistory } from "react-router-dom";
// import { GlobalContext } from "../GlobalContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import { v4 as uuidv4 } from 'uuid';

// import {
//     newPost,
//     getAllProducts,
//     newfile
//   } from "../ApiService";


// function NewProduct() {
//     const history = useHistory();
//     const {connectedUser, allCategories ,allCities ,setAllProducts,setConnectedUser } = useContext(GlobalContext);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const initialValues = {
//         categoryName: "",
//         subCategory: "",
//         details: "",
//         city: "",
//         photo:"",
//     };
//     const [formValues, setFormValues] = useState(initialValues);
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [categoryIndex,setCategoryIndex] =useState(-1);
//     const storedUser = localStorage.getItem('user')
//     let menuSub = [];
//     if (categoryIndex !== -1) {
//      menuSub = allCategories[categoryIndex]?.subCategories.map(subCategory => ({
//         value: subCategory,
//         label: subCategory,
//       }));
//     }
//     useEffect(() => {
//         // Check if user data exists in localStorage
//         if (storedUser && connectedUser===undefined) {
//           // Parse the stored user data
//           const userData = JSON.parse(storedUser);
//           setConnectedUser(userData);
          
//         }
//       }, []);
      
//       const menuCities = allCities.map(city => ({
//         value: city,
//         label: city,
//       }));

//       const menuCategories = allCategories.map(category => ({
//         value: category.categoryName,
//         label: category.categoryName,
//       }));

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };
   

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmit(true);
//         try {
//             await handleDownload();
//             const post = await newPost(connectedUser.userName,formValues);
//             console.log("add", post);
//             const products = await getAllProducts();
//             setAllProducts(products.data);
//             history.push("/landing");
//         } catch (error) {
//             console.error("Error adding user:", error);
//         }
//     };


//     const handleDownload = async() => {
//         if (selectedFile) {
//             var guid= uuidv4();
//             const fileExtension = selectedFile.name.split('.').pop();
//             guid = guid + "." + fileExtension;
//             formValues.photo=guid

//             //const fileName =formValues.photo;
//             const formData = new FormData();
//             formData.append('image', selectedFile, guid); 
//             try{
//                 const res = await newfile(formData)
//                 return res
//             }
//             catch(error){
//                 console.error('Error uploading file:');
//             }
//           } else {
//             console.error('No file selected.');
//           }
//       };

//     const onChangeCity = (value) => {
//         console.log(allCategories)
//         console.log(`selected ${value}`);
//         formValues.city = value
//     };
//     const onChangeCategory = (value) => {
//         console.log(`selected ${value}`);
//         formValues.categoryName = value;
//         setCategoryIndex(allCategories.findIndex(category => category.categoryName === value));
//     };
//     const onChangeSubCategory = (value) => {
//         console.log(`selected ${value}`);
//         formValues.subCategory = value;
//     };

//     const handleFileChange = (event) => {
//         var preview = document.getElementById('preview');
//         const file = event.target.files[0];
//         setSelectedFile(file);
//         if (file) {
//             var reader = new FileReader();
    
//             reader.onload = function(e) {
//               preview.src = e.target.result;
//             };
    
//             reader.readAsDataURL(file);
//           } else {
//             // Handle case where no file is selected
//             preview.src = ""; // Clear the preview if no file is selected
//           }
//     };
    
//     useEffect(() => {
//         if (isSubmit) {
//             console.log(formValues);
//         }
//         console.log(formValues)
//     }, [ formValues, isSubmit]);

//     return (
//         <>
//         <div className="bgImg">
//             <div className="container_login">
//                 <form onSubmit={handleSubmit}>
//                     <h1>upload product</h1>
//                     <div className="ui divider"></div>
//                     <div className="ui form">
//                     <div className="field">
//                         <Select
//                             showSearch
//                             placeholder="Select Category"
//                             style={{ width: 150 }}
//                             onChange={onChangeCategory}
//                             options={menuCategories}
//                         />
//                         </div>
//                         <div className="field">
//                         <Select
//                             showSearch
//                             placeholder="Select Sub Category"
//                             style={{ width: 150 }}
//                             onChange={onChangeSubCategory}
//                             options={menuSub}
//                         />
//                         </div>
//                         <div className="field">
//                         <Select
//                             showSearch
//                             placeholder="Select City"
//                             style={{ width: 150 }}
//                             onChange={onChangeCity}
//                             options={menuCities}
//                         />
//                         </div>
//                         <div className="field">
//                             <label>details about your product:</label>
//                             <input
//                                 style={{ width: 200, height:100 }}
//                                 name="details"
//                                 placeholder="write sum details"
//                                 value={formValues.details}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="field">
//                         <div className="image-uploader-container">
//                         <label className="file-input-label">
//                             <input
//                             type="file"
//                             onChange={handleFileChange}
//                             id="imageInput" accept="image/*"
//                             className="file-input"
//                             />
//                             <FontAwesomeIcon icon={faUpload} className="upload-icon" />
//                             Choose File
//                         </label>
//                         <img id="preview" src="" alt="Image Preview"style={{maxWidth: 200,  maxheight: 200}}></img>
//                         {selectedFile!== null && <label>{selectedFile.name}</label>}
//                         </div>
                            
                            
//                         </div>
                   
//                         <button className="singbutton">upload my product</button>
//                     </div>
//                 </form>   
//             </div>
//         </div>
//         </>
//     );
// }


//  export default NewProduct;
