import Image from "./Phone.jfif";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../GlobalContext";

function Product(props) {
  let {product} = props;
  const price = 10000;

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to="/products/1" href="!#" replace>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={Image}
          />
        </Link>
        <div className="card-body">
          <h3 className="card-title text-center text-dark text-truncate">
          {product?.subCategory} 
          </h3>
          <h4 className="card-title text-center text-dark text-truncate">{product?.categoryName}</h4>
          <p className="card-text text-center text-muted mb-0">{product?.details}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
