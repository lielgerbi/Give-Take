import BannerZero from './upload1.jpg';
import BannerOne from "./products.jpg";
import BannerTwo from "./homePage.jpg";
import { useHistory } from 'react-router-dom'; 
import "./banner.css";

interface BannerIncidatorProps {
  index: number;
  active?: boolean;
}

function BannerIncidator(props: BannerIncidatorProps): JSX.Element {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active ? "true" : undefined}
    />
  );
}

interface BannerImageProps {
  image: string;
  active?: boolean;
}

function BannerImage(props: BannerImageProps): JSX.Element {
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      <div
        className="banner"
        
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block">
        <h5>Banner Header</h5>
        <p>Some representative placeholder content for the banner.</p>
      </div>
    </div>
  );
}

function Banner(): JSX.Element {
  const history = useHistory();

  const handleImageClick = (index: number): void => {
    // Logic to determine the page URL based on the index
    let pageUrl: string  = '';
    if(index===0){
      pageUrl='/newProduct'
    }
    if(index===1){
      pageUrl='/products'
    }
    if(index===2){
      pageUrl='/logIn'
    }
    // Navigate to the desired page
    if(pageUrl!== ''){
      history.push(pageUrl);
    }
    
    
  };
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      <div className="carousel-indicators">
        <BannerIncidator index={0} active />
        <BannerIncidator index={1} />
        <BannerIncidator index={2} />
      </div>
      <div className="carousel-inner">
        <a onClick={() => handleImageClick(0)} role="button" tabIndex={0}>
          <BannerImage image={BannerZero} active />
        </a>
        <a onClick={() => handleImageClick(1)} role="button" tabIndex={0}>
          <BannerImage image={BannerOne} />
        </a>
        <a onClick={() => handleImageClick(2)} role="button" tabIndex={0}>
          <BannerImage image={BannerTwo} />
        </a>
      </div>
    </div>
  );
}

export default Banner;



// import BannerZero from "./upload1.jpg";
// import BannerOne from "./products.jpg";
// import BannerTwo from "./login2.webp";
// import { useHistory } from 'react-router-dom'; 

// function BannerIncidator(props) {
//   return (
//     <button
//       type="button"
//       data-bs-target="#bannerIndicators"
//       data-bs-slide-to={props.index}
//       className={props.active ? "active" : ""}
//       aria-current={props.active}
//     />
//   );
// }

// function BannerImage(props) {
//   return (
//     <div
//       className={"carousel-item " + (props.active ? "active" : "")}
//       data-bs-interval="5000"
//     >
//       <div
//         className="ratio"
//         style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
//       >
//         <img
//           className="d-block w-100 h-100 bg-dark cover"
//           alt=""
//           src={props.image}
//         />
//       </div>
//       <div className="carousel-caption d-none d-lg-block">
//         <h5>Banner Header</h5>
//         <p>Some representative placeholder content for the banner.</p>
//       </div>
//     </div>
//   );
// }

// function Banner() {
//   const history = useHistory();

//   const handleImageClick = (index) => {
//     // Logic to determine the page URL based on the index
//     let pageUrl;
//     if(index===0){
//       pageUrl='/newProduct'
//     }
//     if(index===1){
//       pageUrl='/products'
//     }
//     if(index===2){
//       pageUrl='/logIn'
//     }
//     // Navigate to the desired page
//     history.push(pageUrl);
//   };
//   return (
//     <div
//       id="bannerIndicators"
//       className="carousel slide"
//       data-bs-ride="carousel"
//       style={{ marginTop: "56px" }}
//     >
//       <div className="carousel-indicators">
//         <BannerIncidator index="0" active={true} />
//         <BannerIncidator index="1" />
//         <BannerIncidator index="2" />
//       </div>
//       <div className="carousel-inner">
//         <a onClick={() => handleImageClick(0)}>
//         <BannerImage image={BannerZero} active={true} />
//         </a>
//         <a onClick={() => handleImageClick(1)}>
//         <BannerImage image={BannerOne} />
//         </a>
//         <a onClick={() => handleImageClick(2)}>
//         <BannerImage image={BannerTwo} />
//         </a>
//       </div>
//     </div>
//   );
// }

// export default Banner;
