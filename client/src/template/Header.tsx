import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import "./headrer.css";

interface User {
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  isManager: boolean;
  email: string;
  photo: string;
}
function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined); // Specify User type
  const { connectedUser, setConnectedUser } = useContext(GlobalContext);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Parse the stored user data
      const userData: User = JSON.parse(storedUser); // Parse as User type

      // Update state only if necessary
      if (userData !== connectedUser) {
        setCurrentUser(userData);
      }
    }
  }, [connectedUser]);

  function changeNav(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  function changeNavLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setConnectedUser(undefined); // Update with undefined
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          {currentUser !== undefined &&
            <Link className="navbar-brand" to="/landing" onClick={changeNav}>
              <FontAwesomeIcon
                icon={["fab", "bootstrap"]}
                className="ms-1"
                size="lg"
              />
              <span className="ms-2 h5">Shop</span>
            </Link>
          }

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '') + (currentUser === undefined ? "left" : '')}>
            {currentUser !== undefined &&
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to="/NewProduct" className="nav-link" replace onClick={changeNav}>
                    Add new product
                  </Link>
                </li>
              </ul>
            }
            <ul className="navbar-nav mb-2 mb-lg-0" >
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {currentUser === undefined ?
                    <>
                      <li>
                        <Link to="/" className="dropdown-item" onClick={changeNav}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/signUp" className="dropdown-item" onClick={changeNav}>
                          Sign Up
                        </Link>
                      </li>
                    </> :
                    <>
                      <li>
                        <Link to="/home" className="dropdown-item" onClick={changeNav}>
                          home page
                        </Link>
                      </li>
                      <li>
                        <Link to="/myPost" className="dropdown-item" onClick={changeNav}>
                          my products
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-item" onClick={changeNavLogout}>
                          logout
                        </Link>
                      </li>
                    </>
                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;




// import { useContext,useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { GlobalContext } from "../GlobalContext";
// import "./headrer.css";

// function Header() {
//   const [openedDrawer, setOpenedDrawer] = useState(false)
//   const [currentUser,setCurrentUser] = useState(undefined)
//   const {connectedUser , setConnectedUser} = useContext(GlobalContext);
//   useEffect(() => {
//     // Check if user data exists in localStorage
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       // Parse the stored user data
//       const userData = JSON.parse(storedUser);

//       // Update state only if necessary
//       if (userData !== connectedUser) {
//         setCurrentUser(userData);
//       }
//     }
//   }, []);

//   function changeNav(event) {
//     if (openedDrawer) {
//       setOpenedDrawer(false)
//     }
//   }
//   function changeNavLogout(event) {
//     setConnectedUser()
//     localStorage.removeItem('user');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     if (openedDrawer) {
//       setOpenedDrawer(false)
//     }
//   }


//   return (
//     <header>
//       <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
//         <div className="container-fluid">
//           {currentUser !== undefined &&
//           <Link className="navbar-brand" to="/landing" onClick={changeNav}>
//             <FontAwesomeIcon
//               icon={["fab", "bootstrap"]}
//               className="ms-1"
//               size="lg"
//             />
//             <span className="ms-2 h5">Shop</span>
//           </Link>
//           }

//           <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')+ (currentUser===undefined? "left" :'')}>
//             {currentUser !== undefined &&
//             <ul className="navbar-nav me-auto mb-lg-0">
//               <li className="nav-item">
//                 <Link to="/NewProduct" className="nav-link" replace onClick={changeNav}>
//                   Add new product
//                 </Link>
//               </li>
//             </ul>
//             }
//             <ul className="navbar-nav mb-2 mb-lg-0" >
//               <li className="nav-item dropdown">
//                 <a
//                   href="!#"
//                   className="nav-link dropdown-toggle"
//                   data-toggle="dropdown"
//                   id="userDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <FontAwesomeIcon icon={["fas", "user-alt"]} />
//                 </a>
//                 <ul
//                   className="dropdown-menu dropdown-menu-end"
//                   aria-labelledby="userDropdown"
//                 >
//                   {currentUser === undefined ?
//                   <>
//                   <li>
//                   <Link to="/" className="dropdown-item" onClick={changeNav}>
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/signUp" className="dropdown-item" onClick={changeNav}>
//                     Sign Up
//                   </Link>
//                 </li></> :
//                 <> <li>
//                 <Link to="/home" className="dropdown-item" onClick={changeNav}>
//                   home page
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="dropdown-item" onClick={changeNavLogout}>
//                    logout
//                 </Link>
//               </li></> }
//               </ul>  
                
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;
