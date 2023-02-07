import React, { useState } from "react";
import SigunguSelect from "./SelectSigungu";
import { sigunguCode } from "./SigunguCode";
import Place from "../TrudyMap/Place";

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
        <SigunguSelect
          key={selectedAreaCode}
          sigunguCode={sigunguCode}
          area={selectedAreaCode}
          selectedSigungu={selectedSigungu}
          setSelectedSigungu={setSelectedSigungu}
        />
      )}
      {/* {selectedSigungu.length > 0 && <Place selectedSigungu={selectedSigungu} />} */}
    </div>
  );
};

export default AreaSelect;
