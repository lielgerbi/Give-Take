import { useState, useEffect,useContext } from "react";
import "../loginComps/loginPage.css";
import { Dropdown, Menu } from 'antd';
import { GlobalContext } from "../GlobalContext";

function NewProduct() {
  const { allCategories } = useContext(GlobalContext);
  var categories = allCategories.map(category => category.categoryName);
  var allSubCategories = allCategories.reduce((acc, category) => acc.concat(category.subCategories), []);

    const initialValues = {
        categoryName: "",
        subCategory: "",
        details: "",
        city: "",
        photo:"",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const menuCategories = (
      <Menu className="dropdown" onClick={(e) => handleMenuClick(e)}>
      {categories.map((item, index) => (
        <Menu.Item key={index.toString()}>{item}</Menu.Item>
      ))}
    </Menu>
  );
  const handleMenuClick = (e) => {
    formValues.categoryName=e.key
  };
//   const menuSubCategories = (
//     <Menu className={styles.dropdown}>
//     {categories.map((item, index) => (
//       <Menu.Item key={index.toString()}>{item}</Menu.Item>
//     ))}
//   </Menu>
// );

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
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
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>subCategory</label>
                            <input
                                type="text"
                                name="subCategory"
                                placeholder="Choose a username"
                                value={formValues.subCategory}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                        <Dropdown
                                overlay={menuCategories}
                                trigger={["click"]}
                                className="dropdown"
                            >
                              <span>Category</span>  
                        </Dropdown>
                        </div>
                        <div className="field">
                            <label>details</label>
                            <input
                                name="details"
                                placeholder="details"
                                value={formValues.details}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>city</label>
                            <input
                                name="city"
                                placeholder="city"
                                value={formValues.city}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="singbutton">Submit</button>
                    </div>
                </form>
                <div className="text">
                    Already have an account? <span>Login</span>
                </div>
            </div>
            </div>
        </>
    );
}


 export default NewProduct;
