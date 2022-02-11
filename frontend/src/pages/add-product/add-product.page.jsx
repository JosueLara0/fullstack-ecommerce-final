// Libraries
import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux actions
import { createProduct } from "../../store/actions/products.actions";

// Components
import Input from "../../components/UI/input/input.component";
import Button from "../../components/UI/button/button.component";

// Styles
import classes from "./add-product.styles.module.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Refs
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();
  const categoryInputRef = useRef();
  const imageInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Use this syntax when handling files, this converts it to multipart/form-data
    const productFormData = new FormData();

    productFormData.append("name", nameInputRef.current.value);
    productFormData.append("description", descriptionInputRef.current.value);
    productFormData.append("price", +priceInputRef.current.value);
    productFormData.append("quantity", +quantityInputRef.current.value);
    productFormData.append("category", categoryInputRef.current.value);
    productFormData.append("productImgs", imageInputRef.current.files[0]);

    dispatch(createProduct(productFormData));

    navigate("/");
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitHandler} className={classes["add-product-form"]}>
        <h2>Add a new product</h2>
        <Input label="Name" input={{ type: "text", ref: nameInputRef }} />
        <Input
          label="Description"
          input={{ type: "text", ref: descriptionInputRef }}
        />
        <Input label="Price" input={{ type: "number", ref: priceInputRef }} />
        <Input
          label="Quantity"
          input={{ type: "number", ref: quantityInputRef }}
        />
        <Input
          label="Category"
          input={{ type: "text", ref: categoryInputRef }}
        />
        <Input
          label="Image"
          input={{ type: "file", accept: "image/*", ref: imageInputRef }}
        />

        <Button type="submit" label="Add product" />
      </form>
    </Fragment>
  );
};

export default AddProduct;
