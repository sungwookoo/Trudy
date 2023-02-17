import React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import axiosInstance from "../Common/axiosInterceptor";
function ForumImageUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();

  
    formData.append('image', file);
    setFormData(formData);
  }, []);

  useEffect(() => {
    if (!formData) {
      return;
    }
    axiosInstance({
      baseURL: 'api/post',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res: any) => {
      })
      .catch((err: any) => {
      });
  }, [formData]);


  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);


  return (
    <>
      <div>
        <form>
        <input className="input-image mt-5"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onUploadImage}
          multiple
        />
        </form>
        <button onClick={onUploadImageButtonClick}></button>
      </div>
    </>
  );
}


export default ForumImageUpload;