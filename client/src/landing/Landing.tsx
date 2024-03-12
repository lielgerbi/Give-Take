import React from "react";
import Banner from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <>
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            See new product
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>

      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Landing;



// import React, { useEffect } from "react";
// import Banner from "./Banner";
// // import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";

// function Landing() {

//   return (
//     <>
//       <Banner />
//       <div className="d-flex flex-column bg-white py-4">
//         <div className="d-flex justify-content-center">
//           <Link to="/products" className="btn btn-primary" replace>
//               See new product
//           </Link>
//         </div>
//       </div>
//       <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
   

   
//       <div className="d-flex flex-column bg-white py-4">
//         <h5 className="text-center mb-3">Follow us on</h5>
//         <div className="d-flex justify-content-center">
//           <a href="!#" className="me-3">
//             <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
//           </a>
//           <a href="!#">
//             <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
//           </a>
//           <a href="!#" className="ms-3">
//             <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Landing;
