import { useState } from "react";
// import { dummyPost } from "./Forum";
import './ForumSearch.css'

function ForumSearch() {
  const [forumSearchTerm, setforumSearchTerm] = useState('');
  return (
    <div className="forum-search-bar mx-5 flex flex-col">
    
    </div>
  );
}


export default ForumSearch;

// const dummySearchData = [
//   {
//     id: 1,
//     member_id: 2,
//     title: "This is Title",
//     content: "This is content about Busan",
//     thumbnail_image_id: 3,
//     created_at: '2023-01-25',
//     update_at: '2023-01-27',
//     url: 'https://post-phinf.pstatic.net/MjAxNzAzMjlfNzcg/MDAxNDkwNzY4NTgxNDIz.iarrZNPWO9PnUpjn_F4fCJSHNS2rCGIpLUjbDLrSd4Mg.WgEljCuTXQNuVIt60_kKswCa5_ugaD3ty8Xt2T8vyM4g.JPEG/GettyImages-467508318.jpg?type=w1200'
//   }

// ]