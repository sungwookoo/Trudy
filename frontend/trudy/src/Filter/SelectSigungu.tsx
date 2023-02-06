import React, { useState } from "react";

type SigunguCodeType = {
  [key: number]: Array<{
    id: number;
    code: number;
    areaCode: {
      code: number;
      name: string;
    };
    name: string;
  }>;
};

type Props = {
  area: number;
  sigunguCode: SigunguCodeType;
  selectedSigungu: number[];
  setSelectedSigungu: React.Dispatch<React.SetStateAction<number[]>>;
};

const SigunguSelect = ({ area, sigunguCode, selectedSigungu, setSelectedSigungu }: Props) => {
  return (
    <div className="flex flex-col">
      {sigunguCode[area].map((sigunguInfo: any, i: number) => (
        <div key={i} className="flex items-center mb-2">
          <input
            className="mr-2"
            type="checkbox"
            id={`sigungu-${sigunguInfo.id}`}
            checked={selectedSigungu.includes(sigunguInfo.id)}
            onChange={() => {
              if (selectedSigungu.includes(sigunguInfo.id)) {
                const filteredSigungu = selectedSigungu.filter((id: number) => id !== sigunguInfo.id);
                setSelectedSigungu(filteredSigungu);
              } else {
                setSelectedSigungu([...selectedSigungu, sigunguInfo.id]);
              }
            }}
          />
          <label htmlFor={`sigungu-${sigunguInfo.id}`}>{sigunguInfo.name}</label>
        </div>
      ))}
    </div>
  );
};

export default SigunguSelect;
