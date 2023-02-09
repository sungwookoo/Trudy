import React, { useState } from "react";
import { AreaPlusSigungu } from '../Filter/AreaPlusSigunguCode'


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
  setConvertSigungu : React.Dispatch<React.SetStateAction<any>>
  setSelectedSigungu: React.Dispatch<React.SetStateAction<number[]>>;
};

const SigunguSelect = ({ area, sigunguCode, selectedSigungu, setSelectedSigungu, setConvertSigungu }: Props) => {
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

                // 요청위해 변환해주기
                // 요청위해 변환해주기
                filteredSigungu.map((codeId :any, i :any) => {
                  const areaAndSigungu:any = AreaPlusSigungu[codeId];
                    setConvertSigungu(areaAndSigungu);
                  })
              } else {
                setSelectedSigungu([...selectedSigungu, sigunguInfo.id]);
                selectedSigungu.map((codeId :any, i :any) => {
                  const areaAndSigungu:any = AreaPlusSigungu[codeId];
                    setConvertSigungu(areaAndSigungu);
              })
            }}}
          />
          <label htmlFor={`sigungu-${sigunguInfo.id}`}>{sigunguInfo.name}</label>
        </div>
      ))}
    </div>
  );
};

export default SigunguSelect;
