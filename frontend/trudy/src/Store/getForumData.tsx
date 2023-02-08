import React, { useState, useEffect } from "react";

interface getForumData {
  url: string;
}

interface getForumResponse {
  id: number;
  member_id: number;
  title: string;
  content: string;
  thumbnail_image_id: number;
  created_at: string;
  update_at: string;
}



export const getForumData = (url:getForumData) => {
  const [response, setResponse] = useState<getForumResponse[]>();}