import React, { useState } from "react";

// interface ImageProps {
//   image: string;
//   id: number;
// }

function Images() {
  // const [showImages, setShowImages] = useState<ImageProps[]>([]);

  // // 이미지 상대경로 저장
  // const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const imageLists = event.target.files;
  //   if (!imageLists) return;
  // let imageUrlLists = [...showImages];

  //   for (let i = 0; i < imageLists.length; i++) {
  //     const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //     imageUrlLists.push({ image: currentImageUrl, id: i });
  //   }

  //   if (imageUrlLists.length > 10) {
  //     imageUrlLists = imageUrlLists.slice(0, 10);
  //   }

  //   setShowImages(imageUrlLists);
  // };

  // // X버튼 클릭 시 이미지 삭제
  // const handleDeleteImage = (id: number) => {
  //   setShowImages(showImages.filter((_, index) => index !== id));
  // };

  return (
    <div>
      {/* <label htmlFor="input-file">
        <input type="file" id="input-file" multiple onChange={handleAddImages} />
      </label>

      {showImages.map((image) => (
        <div key={image.id}>
          <img src={image.image} alt={`${image.image}-${image.id}`} />
          <button onClick={() => handleDeleteImage(image.id)}>X</button>
        </div>
      ))} */}
    </div>
  );
};

export default Images;