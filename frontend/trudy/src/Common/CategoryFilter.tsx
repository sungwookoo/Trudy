//CategoryFilter.js
import React, { useEffect } from "react";
import "./CategoryFilter.css";
interface Category {
  name: string;
  value: string;
}

interface Props {
  categories: Category[];
  category: string;
  setCatecory: (category: string) => void;
}



const LS_KEY_CATEGORY = "LS_KEY_CATEGORY";

const CategoryFilter = (props: Props) => {
  const { categories, category, setCatecory } = props;

  const makeCategories = () => {
    if (categories.length === 0) return;

    return categories.map((item, idx) => (
      <div
        key={idx}
        className={
          item.value === category ? "category-child selected" : "category-child"
        }
        onClick={() => {
          setCatecory(item.value);
          localStorage.setItem(LS_KEY_CATEGORY, item.value);
        }}
      >
        {item.name}
      </div>
    ));
  };

  const init = () => {
    let data = localStorage.getItem(LS_KEY_CATEGORY);
    if (data !== null) setCatecory(data);
  };

  useEffect(init, []);

  return (
    <div>
      <div className="category-set">{makeCategories()}</div>
    </div>
  );
};

export default CategoryFilter;