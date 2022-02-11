// Components
import ProductCard from "../product-card/product-card.component";

import classes from "./products-list.styles.module.css";

const ProductsList = ({ products }) => {
  return (
    <div className={classes.products__list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
