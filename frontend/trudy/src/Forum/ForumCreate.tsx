import React, { useEffect, useState } from 'react';
import './ForumCreate.css'
// import Editor from './Editor';
import parse from 'html-react-parser';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ForumImageUpload from './ForumImageUpload';
import Images from './Forumimage';



// type ForumTypes = {
//   title: any,
//   content: any,
// }

function ForumCreate() {
  
  const [forumtitle, setforumTitle] = useState("");
  const [forumcontent, setforumContent] = useState("");
  const [forumimage, setImage] = useState(null);

  // const [viewContent, setViewContent] = useState([]);

const forumdata = {
  'title' : forumtitle,
  'content' : forumcontent,
  // "upload": ,
  "sigunguId": 12,
  'memberId': 1,
  "category": 1,
  // 'image_file' : `${Image}`,
}


  const imgLink ='api/post'
  const [flag, setFlag] = useState(false);


  const customUploadAdapter = (loader:any) => {
      return {
        upload() {
          return new Promise((resolve, reject) => {
            const data = new FormData();
            loader.file.then((file:any) => {
              data.append('name', file.name);
              data.append('file', file);

              axios.post('/api/post', data)
              .then((res:any) => {
                setImage(res.data.filename);
                console.log(res.data.filename)
                })
                
                  
                })
              })
            }
          }
        }


        const submitPost = () => {
          console.log(forumdata)
          axios.post('api/post', forumdata)
          .then((data)=>{
            alert('등록 완료!');
            console.log(data)
          })
          .catch((err)=>{
            console.log(err)
          })
        };
      

  // const customUploadAdapter = async (loader: any) => {
  //   return {
  //     upload() {
  //       if (loader.target.files) {
  //         const uploadFile = loader.target.files[0];
  //         const formData = new FormData();
  //         loader.file.then((file: any) => {
  //           formData.append('files', uploadFile);
  
  //           axios({
  //             method: 'post',
  //             url: 'api/post',
  //             data: formData,
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           });
  //         });
  //       }
  //     },
  //   };
  // };

          function uploadPlugin(editor:any) {
              editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
                return customUploadAdapter(loader);
      };
    }
  

return(
  <>
      <div className='forum-create-container'>
        <div className='forum-title-container'>

        <input className='forum-title' type="text" placeholder='Enter Title Here' onChange={(event) => setforumTitle(event.target.value)}/>
        
        
      <div>
        <CKEditor
        editor={ClassicEditor}
        config={{
        extraPlugins: [uploadPlugin],
        }}
        data={forumcontent}
        onReady={(editor:any) => {
          // console.log('Editor is ready to use!', editor);
        }}
        onChange={(event:any, editor:any) => {
          const data = editor.getData();
          setforumContent(data);
          // setImage(data);
          //
          console.log({ data })
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

        <ForumImageUpload />
          </div>
      <Images />
    </div>
    </>
    );
  }



  export default ForumCreate;
