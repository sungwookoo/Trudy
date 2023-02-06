import React from "react";

type SigunguCodeType = {
  sigunguCode: Array<{
    id: number;
    code: number;
    areaCode: {
      code: number;
      name: string;
    };
    name: string;
  }>;
};

const SigunguSelect = ({ sigunguCode }: SigunguCodeType) => (
  <div>
    {sigunguCode.map((sigunguCode) => (
      <div key={sigunguCode.id}>
        <input type="checkbox" id={`sub-classification-${sigunguCode.id}`} />
        <label htmlFor={`sub-classification-${sigunguCode.id}`}>{sigunguCode.name}</label>
      </div>
    ))}
  </div>
);

export default SigunguSelect;
