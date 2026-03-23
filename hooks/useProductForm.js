// hooks/useProductForm.js
import { useState } from "react";
import { INITIAL_FORM } from "../constants/product";

export function useProductForm() {
  const [form,       setForm]       = useState(INITIAL_FORM);
  const [images,     setImages]     = useState([]);
  const [tags,       setTags]       = useState([]);
  const [compatible, setCompatible] = useState([]);
  const [isActive,   setIsActive]   = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [errors,     setErrors]     = useState({});

  /** Returns onChange handler for a given form key */
  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name     = "Tên sản phẩm không được để trống";
    if (!form.category)    e.category = "Vui lòng chọn danh mục";
    if (!form.price)       e.price    = "Vui lòng nhập giá bán";
    if (form.stock === "") e.stock    = "Vui lòng nhập tồn kho";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: call API
    console.log("Submit payload:", {
      form, images, tags, compatible, isActive, isFeatured,
    });
  };

  /** Computed profit stats shown when price + costPrice filled */
  const profit = form.price && form.costPrice
    ? {
        amount: Number(form.price) - Number(form.costPrice),
        margin: (((Number(form.price) - Number(form.costPrice)) / Number(form.price)) * 100).toFixed(1),
      }
    : null;

  return {
    form, setField,
    images, setImages,
    tags, setTags,
    compatible, setCompatible,
    isActive, setIsActive,
    isFeatured, setIsFeatured,
    errors, profit,
    handleSubmit,
  };
}