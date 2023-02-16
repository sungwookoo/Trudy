import React from "react";
// import restaurant from "../assets/res";

interface PropsType {
  onClick: (categoryId: number) => void;
  selectedCategories: number[];
}

const categories: { [key: string]: number } = {
  Food: 82,
  Accommodation: 80,
  Festival: 85,
  Attraction: 76,
  Sports: 75,
  Culture: 78,
  Shopping: 79,
};

const CategoryButtons = ({ selectedCategories, onClick }: PropsType) => {
  return (
    <>
      <div className="">
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onClick(value)}
            className={`p-2 m-2 rounded-md border border-1 border-black ${selectedCategories.includes(value) ? "bg-green-600 text-white text" : "bg-gray-300 text-slate-500"}`}
          >
            {key}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryButtons;
