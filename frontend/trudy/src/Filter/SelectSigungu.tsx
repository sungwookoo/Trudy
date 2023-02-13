import React, { useState, useEffect } from "react";
import { AreaPlusSigungu } from "../Filter/AreaPlusSigunguCode";

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
  selectSigunguCode: SigunguCodeType;
  selectedSigungu: number[];
  setConvertSigungu: React.Dispatch<React.SetStateAction<any>>;
  setSelectedSigungu: React.Dispatch<React.SetStateAction<number[]>>;
};

const SigunguSelect = ({
  area,
  selectSigunguCode,
  selectedSigungu,
  setSelectedSigungu,
  setConvertSigungu,
}: Props) => {
  useEffect(() => {
    const tempSigunCodeArray: any = [];
    selectedSigungu.map((codeId: any, i: any) => {
      tempSigunCodeArray.push(...AreaPlusSigungu[codeId]);
    });
    setConvertSigungu(tempSigunCodeArray);
  }, [selectedSigungu]);

  return (
    <div className="flex flex-row flex-wrap nowrap">
      {selectSigunguCode[area].map((sigunguInfo: any, i: number) => (
        <div key={i} className="flex items-center mb-2">
          <input
            className="mr-2"
            type="checkbox"
            id={`sigungu-${sigunguInfo.id}`}
            checked={selectedSigungu.includes(sigunguInfo.id)}
            onChange={() => {
              if (selectedSigungu.includes(sigunguInfo.id)) {
                const filteredSigungu = selectedSigungu.filter(
                  (id: number) => id !== sigunguInfo.id
                );
                setSelectedSigungu(filteredSigungu);
              } else {
                setSelectedSigungu([...selectedSigungu, sigunguInfo.id]);
              }
            }}
          />
          <label htmlFor={`sigungu-${sigunguInfo.id}`}>
            {sigunguInfo.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SigunguSelect;
