import { useNavigate } from 'react-router';
import './ForumItem.css'
import { dummyPost, dummyPost_images, dummyMembers } from './Forum';


interface propsTypes {
  title: string;
  content: string;
  created_at: string;
  image: string;
  forum_image: number;
  url: string;
}


function ForumItem(props: propsTypes) {
  return(
    <div className="item-container">
      {/* 포럼 아이템 개별 상자 */}
      <div className='item-box'>
        {/* Post_image 테이블 더미 */}
        
        {/* <img className='thumbnail-image' src={props.forum_imag}></img> */}
        
        {/* 멤버 테이블 프로필 사진 */}
          
        {/* <img className='member-image' src={props.image}></img> */}
          
        {/* Post 테이블 더미 */}
        <div>{props.title}</div>
        <div>{props.content}</div>
        <div>{props.created_at}</div>
        
      </div>
    </div>
    
  );
};

export default ForumItem;
