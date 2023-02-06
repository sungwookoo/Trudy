import React from "react";

type AreaCodeType = {
  areaCode: Array<{
    id: number;
    name: string;
  }>;
  onClick: (id: number, name: string) => void;
};

const AreaSelect = ({ areaCode, onClick }: AreaCodeType) => (
  <div>
    {areaCode.map((areaCode) => (
      <div key={areaCode.id}>
        <input type="checkbox" id={`classification-${areaCode.id}`} onClick={() => onClick(areaCode.id, areaCode.name)} />
        <label htmlFor={`areaCode-${areaCode.id}`}>{areaCode.name}</label>
      </div>
    ))}
  </div>
);

export default AreaSelect;
