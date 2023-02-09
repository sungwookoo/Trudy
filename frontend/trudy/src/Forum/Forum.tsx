import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import './Forum.css'
import ForumItem from './ForumItem';
import axios from 'axios';
import Category from '../Common/ForumCategory';
import ForumSearch from './ForumSearch';
import {ThreeCircles} from 'react-loader-spinner';

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

function ForumPage() {

  const [forumResponse, setForumResponse] = useState<IgetForumResponse[]>([]);
  const [forumloading, setForumLoading] = useState(null);
// 나중에 articles를 밑에 map돌려줘야함
  // const [articles, setArticles] = useState(<articlePostType[]>)([]);

  // const [articles, setArticles] = useState<{ title: string; content: string }[]>([]);

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
    const getForumData = async () => {
      try {
        // setForumLoading(null);
        await axios.get('api/post')
          .then((res) => {
            setForumResponse(res.data)
            // setForumLoading(null);
          });
      } catch (error) {
        console.log(error);
        // setForumLoading(null);
      }
    };
  
    getForumData();
  }, []);

        // 로딩 시 Spinner 띄움
        {!forumloading && 
          <div>
          <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
          />
          </div>
        }
  
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