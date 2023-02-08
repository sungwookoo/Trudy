import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";

const categories = [
  {
    name : "Food",
    value : "Food"
  },
  {
    name : "Hotel",
    value : "Hotel"
  },
  {
    name : "Attractions",
    value : "Attractions"
  },
  {
    name : "Festival",
    value : "Festival"
  },
];


function Category() {



  const [category, setCatecory] = useState("all");
  
  return (
    <div>
      <CategoryFilter
        categories={categories}
        category={category}
        setCatecory={setCatecory}
      />
    </div>
  );

}
export default Category