import React, { useEffect } from "react";

function MapModal({ bookmark, onClose }: any) {
  useEffect(() => {
    // Disable scrolling of outside content when modal is open
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0" onClick={onClose}>
      <div className="flex items-center justify-center min-h-full">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
        </div>
        <div className="bg-white rounded-lg p-8 z-50 w-2/3 h-2/3">
          <img className="w-full" src={bookmark.firstimage} alt="Place thumbnail" />
          <h2 className="text-lg font-medium">{bookmark.title}</h2>
          <p className="text-gray-500">{bookmark.addr1}</p>
          <p className="text-gray-500">{bookmark.tel}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
