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
  const [selectedAreaCode, setSelectedAreaCode] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap">
      {areaCode.map((areaCode, i) => (
        <div className="p-1" key={i}>
          <label htmlFor={`classification-${areaCode.id}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            <input
              type="radio"
              name="areaCode"
              id={`classification-${areaCode.id}`}
              className="mr-0.5 color-green-500"
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
  );
};

export default AreaSelect;
