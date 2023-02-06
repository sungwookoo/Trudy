import React, { useEffect, useState } from 'react';
import './ForumCreate.css'
import Editor from './Editor';
import parse from 'html-react-parser';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


interface ForumTypes {
  content: any
}

function ForumCreate() {

  // const [image, setImage] = useState(null);
  // const [desc, setDesc] = useState("");
  // const [ckTitle, setCkTitle] = useState("");
  // const [ckContent, setCkContent] = useState("");
  
    
  // })
  // const [viewContent, setViewContent] = useState([]);

const [forumContent, setForumContent] = useState([])



  const submitPost = () => {
    axios.post('/api/post', {
    }).then(()=>{
      alert('등록 완료!');
      console.log(111111)
    })
  };


  // const submitPost = (data :any) => {
  //   axios.post('/api/post', {
  //     title: ckTitle,
  //     content: ckContent, setCkContent
  //   }).then((data)=>{
  //     alert('등록 완료!');
  //     console.log(data , 111111)
  //   })
  // };

  // const getValue = (e:any) => {
  //   const contentBody = e.target.value;
  //   // console.log(name, value)
  //   setForumContent({
  //     ...forumContent,
  //   })
  //   console.log(forumContent,1111111111111111111111111111111)
  // };  



  // createPost = async () => {

  // const [forumContent, setForumContent] = useState([]);


return(
  <>
    
      <div className='forum-create-container'>
        <div className='forum-title-container'>
        <input className='forum-title' type="text" placeholder='Enter Title Here'/>
        
        
      <div>
        <CKEditor
        editor={ClassicEditor}
        config={{
        // extraPlugins: [uploadPlugin],
        }}
        data={forumContent}
        onReady={(editor:any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event:any, editor:any) => {
          const data = editor.getData();
          // setForumContent(data);
          setForumContent({
          ...forumContent,
          // data
          });
          console.log({ event, editor, data})
        }}
        onBlur={(event:any, editor:any) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event:any, editor:any) => {
          // console.log('Focus.', editor);
        }}
        />
        </div>

        <button onClick={submitPost}>
          제출합니다
        </button>

          </div>
        </div>
        
  </>
  /* <Editor
        set Desc={setDesc}
        desc={desc}
        setImage={setImage}
        
        /> */

  )

}

export default ForumCreate;
