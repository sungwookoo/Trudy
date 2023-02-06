import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import './Forum.css'
import ForumItem from './ForumItem';
import axios from 'axios';
import Category from '../Common/ForumCategory';
import ForumSearch from './ForumSearch';

interface IgetForumResponse {
  id: number;
  member_id: number;
  title: string;
  content: string;
  thumbnail_image_id: number;
  created_at: string;
  update_at: string;
  postelement: object;
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


// interface articlePostType {
//   title: string;
//   content: string;
// }


function ForumPage() {

  const [forumResponse, setForumResponse] = useState<IgetForumResponse[]>([]);
// 나중에 articles를 밑에 map돌려줘야함
  // const [articles, setArticles] = useState(<articlePostType[]>)([]);

  // const [articles, setArticles] = useState<{ title: string; content: string }[]>([]);

  
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
        .then((res) => {setForumResponse(res.data)})
          .catch(error => console.log(error))
        },[])
        
  
  return(

    <div className='forum-page'>
      <div className='filter-bar'>
        <ForumSearch />
        <div className='cat-selectors mt-4'>
          <Category />
        {/* <button className='rounded-full bg-green-500 w-48 h-10'>Food</button>
        <button className='rounded-full bg-green-500 w-48 h-10'>Hotel</button>
        <button className='rounded-full bg-green-500 w-48 h-10'>Attraction</button>
        <button className='rounded-full bg-green-500 w-48 h-10'>Festival</button> */}
        </div>
        <div className='bg-red-700 mx-5'>
          <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={navigateToCreateArticle}>
              Post Article
          </button>
        </div>
      </div>
        <div className='forum-content mx-32'> 
          {forumResponse.map((post, i) => (
            <ForumItem
            key={i}
            post={post}
          />
          ))}
        </div>
    
  </div>
  );
}
export default ForumPage;


// 더미 포스트들

export const dummyPost = [
//   {
//     id: 1,
//     member_id: 2,
//     title: "Gwangalli Beach",
//     content: "This is content about Busan",
//     thumbnail_image_id: 3,
//     created_at: '2023-01-25',
//     update_at: '2023-01-27',
//     url: 'https://post-phinf.pstatic.net/MjAxNzAzMjlfNzcg/MDAxNDkwNzY4NTgxNDIz.iarrZNPWO9PnUpjn_F4fCJSHNS2rCGIpLUjbDLrSd4Mg.WgEljCuTXQNuVIt60_kKswCa5_ugaD3ty8Xt2T8vyM4g.JPEG/GettyImages-467508318.jpg?type=w1200'
//   },
//   {
//     id: 2,
//     member_id: 2,
//     title: "Gwanghwa-Moon",
//     content: "This is content about Seoul",
//     thumbnail_image_id: 3,
//     created_at: '2023-01-25',
//     update_at: '2023-01-27',
//     url: 'https://korean.visitseoul.net/data/kukudocs/seoul2133/20220829/202208291317416161.jpg'

//   },
//   {
//     id: 3,
//     member_id: 3,
//     title: "Cheonggyecheon",
//     content: "This is content about Seoul",
//     thumbnail_image_id: 3,
//     created_at: '2023-01-25',
//     update_at: '2023-01-27',
//     url: 'https://a.cdn-hotels.com/gdcs/production97/d1351/a274bc26-9643-4bae-a91f-cebaf7f9fa56.jpg?impolicy=fcrop&w=800&h=533&q=medium'
//   },
  // {
  //   id: 4,
  //   member_id: 3,
  //   title: "Busan",
  //   content: "This is content about Seoul",
  //   thumbnail_image_id: 3,
  //   created_at: '2023-01-25',
  //   update_at: '2023-01-27',
  //   url: 'https://a.cdn-hotels.com/gdcs/production127/d256/7199707a-c1e3-4993-a4e7-e3f10af6ab63.jpg'
  // },
  // {
  //   id: 5,
  //   member_id: 4,
  //   title: "Meeting Aespa",
  //   content: "This is content about Seoul",
  //   thumbnail_image_id: 3,
  //   created_at: '2023-01-25',
  //   update_at: '2023-01-27',
  //   url: 'https://www.brandbrief.co.kr/news/photo/202106/4400_8709_2326.png'
  // },
  // {
  //   id: 6,
  //   member_id: 4,
  //   title: "Entering Korea",
  //   content: "This is content about Seoul",
  //   thumbnail_image_id: 3,
  //   created_at: '2023-01-25',
  //   update_at: '2023-01-27',
  //   url: 'https://www.airport.kr/co/cmm/bbs/cmmBbsDown.do?NTT_ID=24344&ATCH_SN=1'
  // }
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
//   {
//     id: 3,
//     image: 'https://cdn.newsculture.press/news/photo/202210/511468_622866_71.jpg'
//   },
//   {
//     id: 3,
//     image: 'https://cdn.newsculture.press/news/photo/202210/511468_622866_71.jpg'
//   }
]