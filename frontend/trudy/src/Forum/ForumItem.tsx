import { useNavigate } from 'react-router';
import './ForumItem.css'
// import { dummyPost, dummyPost_images, dummyMembers } from './Forum';


interface propsTypes {
  post: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
  forum_image: string;
  url: string;
}


function ForumItem(props: any) {
  console.log(props.post)
  const forumData = props.post

  return(
    <div className="item-container">
      {/* 포럼 아이템 개별 상자 */}
      <div className='item-box'>
        {/* Post_image 테이블 더미 */}
        
        <img className='thumbnail-image' src={forumData.url}></img>
        
        {/* 멤버 테이블 프로필 사진 */}
          
        {/* <img className='member-image' src={props.image}></img> */}
          
        {/* Post 테이블 더미 */}
        <div>{forumData.title}</div>
        <div className='txt-content'>{forumData.content}</div>
        <div>{forumData.created_at}</div>
        
      </div>
    </div>
    
  );
};

export default ForumItem;
