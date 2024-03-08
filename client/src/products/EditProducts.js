import { useState, useEffect,useContext } from "react";
import "../loginComps/loginPage.css";
import { Select} from 'antd';
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
    updatePost,
    getAllProducts
  } from "../ApiService";


function NewProduct() {
    const history = useHistory();
    const { allCategories ,allCities,editPost , setAllProducts} = useContext(GlobalContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const initialValues = {
        categoryName: editPost.categoryName,
        subCategory: editPost.subCategory,
        details: editPost.details,
        city: editPost.city,
        photo: "", // TODO
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [categoryIndex,setCategoryIndex] =useState(-1);
    let menuSub = [];
    if (categoryIndex !== -1) {
     menuSub = allCategories[categoryIndex]?.subCategories.map(subCategory => ({
        value: subCategory,
        label: subCategory,
      }));
    }

      const menuCities = allCities.map(city => ({
        value: city.name,
        label: city.name,
      }));

      const menuCategories = allCategories.map(category => ({
        value: category.categoryName,
        label: category.categoryName,
      }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
   

    const handleSubmit = async (e) => {
        handleDownload();
        e.preventDefault();
        setIsSubmit(true);

        try {
            const post = await updatePost(editPost._id,formValues);
            console.log("edit", post);
            const products = await getAllProducts();
            setAllProducts(products.data);
            history.push("/landing");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleDownload = () => {
        if (selectedFile) {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(selectedFile);
          downloadLink.download = selectedFile.name;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else {
          console.log('No file selected.');
        }
      };

    const onChangeCity = (value) => {
        console.log(allCategories)
        console.log(`selected ${value}`);
        formValues.city = value
    };
    const onChangeCategory = (value) => {
        console.log(`selected ${value}`);
        formValues.categoryName = value;
        setCategoryIndex(allCategories.findIndex(category => category.categoryName === value));
    };
    const onChangeSubCategory = (value) => {
        console.log(`selected ${value}`);
        formValues.subCategory = value;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    
    useEffect(() => {
        if (isSubmit) {
            console.log(formValues);
        }
        console.log(formValues)
    }, [ formValues, isSubmit]);

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
                            defaultValue={editPost.categoryName}
                        />
                        </div>
                        <div className="field">
                        <Select
                            showSearch
                            placeholder="Select Sub Category"
                            style={{ width: 150 }}
                            onChange={onChangeSubCategory}
                            options={menuSub}
                            defaultValue={editPost.subCategory}
                        />
                        </div>
                        <div className="field">
                        <Select
                            showSearch
                            placeholder="Select City"
                            style={{ width: 150 }}
                            onChange={onChangeCity}
                            options={menuCities}
                            defaultValue={editPost.city}
                        />
                        </div>
                        <div className="field">
                            <label>details about your product:</label>
                            <input
                                style={{ width: 200, height:100 }}
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
                            className="file-input"
                            />
                            <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                            Choose File
                        </label>
                        {selectedFile!== null && <label>{selectedFile.name}</label>}
                        </div>
                            
                            
                        </div>
                   
                        <button className="singbutton">edit my product</button>
                    </div>
                </form>
                
            </div>
            </div>
        </>
    );
}


 export default NewProduct;
