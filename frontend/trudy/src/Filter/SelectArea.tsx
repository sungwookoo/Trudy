import React, { useState } from "react";
import SigunguSelect from "./SelectSigungu";
import { sigunguCode } from "./SigunguCode";

type AreaCodeType = {
  areaCode: Array<{
    id: number;
    name: string;
  }>;
  onClick: (id: number, name: string) => void;
};

const AreaSelect = ({ areaCode, onClick }: AreaCodeType) => {
  const [selectedAreaCode, setSelectedAreaCode] = useState<number | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<number[]>([]);
  console.log(selectedSigungu);
  return (
    <div>
      <div>
        {areaCode.map((areaCode) => (
          <div>
            <label key={areaCode.id} htmlFor={`classification-${areaCode.id}`}>
              <input
                type="radio"
                name="areaCode"
                id={`classification-${areaCode.id}`}
                onClick={() => {
                  setSelectedAreaCode(areaCode.id);
                  onClick(areaCode.id, areaCode.name);
                }}
              />
              {areaCode.name}
            </label>
          </div>
        ))}
      </div>
      {selectedAreaCode && (
        <SigunguSelect sigunguCode={sigunguCode} area={selectedAreaCode} selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu} />
      )}
    </div>
  );
};

export default AreaSelect;
