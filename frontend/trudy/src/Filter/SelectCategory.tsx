import React from "react";

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
      {Object.entries(categories).map(([key, value]) => (
        <button
          key={key}
          onClick={() => onClick(value)}
          className={`p-2 m-2 rounded-md border border-2 border-black shadow-md ${
            selectedCategories.includes(value)
              ? "bg-green-600 text-white"
              : "bg-green-100"
          }`}
        >
          {key}
        </button>
      ))}
    </>
  );
};

export default CategoryButtons;
