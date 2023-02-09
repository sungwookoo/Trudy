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
  url: string | undefined;
}


function ForumItem(props: any) {
  const forumTextData = props.post.postElement
  const forumImageData = props.post.postImageElementList
  // console.log(forumImageData.length)


  const navigate = useNavigate();
  const navigateToForumDetail = () => {
    navigate('/ForumDetail');
  };

  return(
    <div className="forum-item-container" onClick={navigateToForumDetail}>
      {/* 포럼 아이템 개별 상자 */}
      <div className='forum-item-box my-2 mx-2'>
        {/* Post_image 테이블 더미 */}
        
        {forumImageData.length != 0 ? <img className='forum-thumbnail-image' src={forumImageData[0].url} alt="forum thumbnail" />
        : <img className='forum-thumbnail-image' src={'http://img.seoul.co.kr//img/upload/2021/11/16/SSI_20211116180452.jpg'} alt="forum thumbnail" />}
        
        {/* 멤버 테이블 프로필 사진 */}
          
        {/* <img className='forum-member-image' src={props.image}></img> */}
          
        {/* Post 테이블 더미 */}
        <div>{forumTextData.title}</div>
        <div className='forum-txt-content'>{forumTextData.content}</div>
        <div>{forumTextData.created_at}</div>
        
      </div>
    </div>
    
  );
};

export default ForumItem;
