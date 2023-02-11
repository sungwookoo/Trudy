import React, { useState } from "react";
import SigunguSelect from "./SelectSigungu";
import Place from "../TrudyMap/Place";

type AreaCodeType = {
  areaCode: Array<{
    id: number;
    name: string;
  }>;
  onClick: (id: number, name: string) => void;
};

const AreaSelect = ({ areaCode, onClick }: AreaCodeType) => {
  return (
    <div>
      <div className="justify-center h-screenflex flex-wrap">
        {areaCode.map((areaCode, i) => (
          <div>
            <label key={i} htmlFor={`classification-${areaCode.id}`}>
              <input
                type="radio"
                name="areaCode"
                id={`classification-${areaCode.id}`}
                onClick={() => {
                  onClick(areaCode.id, areaCode.name);
                }}
              />
              {areaCode.name}
            </label>
          </div>
        ))}
      </div>
      {/* {selectedAreaCode && } */}
      {/* {selectedSigungu.length > 0 && <Place selectedSigungu={selectedSigungu} />} */}
    </div>
  );
};

export default AreaSelect;
