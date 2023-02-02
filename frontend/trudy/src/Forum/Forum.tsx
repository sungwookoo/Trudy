import { useNavigate } from 'react-router';
import React, { useEffect, useState, Component } from 'react';
import './Forum.css'
import ForumItem from './ForumItem';
import axios from 'axios';
import Category from '../Common/ForumCategory';
import ForumCreate from './ForumCreate';

interface IgetForumResponse {
  id: number;
  member_id: number;
  title: string;
  content: string;
  thumbnail_image_id: number;
  created_at: string;
  update_at: string;
}

// interface IgetForumResponse2 {
//   id: number;
//   post_id: number;
//   url: string;
// }

// interface IgetForumResponse3 {
//   id: number;
//   image: string;
// }

// export const getForumData = (url: IgetForumData) => {
  
// }


interface articlePostType {
  title: string;
  content: string;
}


function ForumPage() {

  const [forumResponse, setForumResponse] = useState<IgetForumResponse[]>([]);
// 나중에 articles를 밑에 map돌려줘야함
  // const [articles, setArticles] = useState(<articlePostType[]>)([]);

  const [articles, setArticles] = useState<{ title: string; content: string }[]>([]);

  
  // 이벤트 보내는거
  // const [forumCategory, setCategory] = useState<string>('');
  // const [forumRegion, setRegion] = useState<string>('');
  // const [forumSearch, setSearch] = useState<string>('');

  // 작성하기 버튼
  const navigate = useNavigate();
  const navigateToCreateArticle = () => {
    navigate('/ForumCreate');
  };



  // const arr = new Array(1, 2)
  // for (let i = 0; i < arr.length; i++) {
  //   console.log(arr[i])
  // }

      useEffect(() => {
        axios.get('api/post')
        .then((res) => { setForumResponse(res.data)
        console.log(res.data.length)})
        .catch(error => console.log(error))
    },[])
  
  
  return(

  
    <div className='forum-page'>
      <div className='filter-bar'>
        <div className='cat-selectors'>
          <Category />
        {/* <button className='rounded-full bg-green-500 w-48 h-10'>Food</button>
        <button className='rounded-full bg-green-500 w-48 h-10'>Hotel</button>
        <button className='rounded-full bg-green-500 w-48 h-10'>Attraction</button>
        <button className='rounded-full bg-green-500 w-48 h-10'>Festival</button> */}
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-5"
              onClick={navigateToCreateArticle}>
              Post Article
          </button>
        </div>
      </div>
        <div className='forum-content'> 

    {dummyPost.map((post) => (
      <ForumItem
      key={post.id}
      post={post}
    />
    ))}

      </div>
    
  </div>
  );
}
export default ForumPage;


// 더미 포스트들

const dummyPost = [
  {
    id: 1,
    member_id: 2,
    title: "This is Title",
    content: "This is content about Busan",
    thumbnail_image_id: 3,
    created_at: '2023-01-25',
    update_at: '2023-01-27',
    url: 'https://post-phinf.pstatic.net/MjAxNzAzMjlfNzcg/MDAxNDkwNzY4NTgxNDIz.iarrZNPWO9PnUpjn_F4fCJSHNS2rCGIpLUjbDLrSd4Mg.WgEljCuTXQNuVIt60_kKswCa5_ugaD3ty8Xt2T8vyM4g.JPEG/GettyImages-467508318.jpg?type=w1200'

  },
  {
    id: 2,
    member_id: 3,
    title: "This is Title",
    content: "This is content about Seoul",
    thumbnail_image_id: 3,
    created_at: '2023-01-25',
    update_at: '2023-01-27',
    url: 'https://korean.visitseoul.net/data/kukudocs/seoul2133/20220829/202208291317416161.jpg'

  },
  {
    id: 3,
    member_id: 3,
    title: "This is Title",
    content: "This is content about Seoul",
    thumbnail_image_id: 3,
    created_at: '2023-01-25',
    update_at: '2023-01-27',
    url: 'https://korean.visitseoul.net/data/kukudocs/seoul2133/20220829/202208291317416161.jpg'
  }
]

// const dummyPost_images = [
//   {
//     id: 1,
//     post_id: 1,
//     url: 'https://post-phinf.pstatic.net/MjAxNzAzMjlfNzcg/MDAxNDkwNzY4NTgxNDIz.iarrZNPWO9PnUpjn_F4fCJSHNS2rCGIpLUjbDLrSd4Mg.WgEljCuTXQNuVIt60_kKswCa5_ugaD3ty8Xt2T8vyM4g.JPEG/GettyImages-467508318.jpg?type=w1200'
//   },
//   {
//     id: 2,
//     post_id: 2,
//     url: 'https://korean.visitseoul.net/data/kukudocs/seoul2133/20220829/202208291317416161.jpg'
//   }
// ]

export const dummyMembers = [
  {
    id: 2,
    name: 'Karina',
    image: 'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg',
  },
  {
    id: 3,
    image: 'https://cdn.newsculture.press/news/photo/202210/511468_622866_71.jpg'
  }
]