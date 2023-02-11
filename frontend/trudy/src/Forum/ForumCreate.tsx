import React, { useEffect, useState } from 'react';
import './ForumCreate.css'
// import Editor from './Editor';
import parse from 'html-react-parser';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ForumImageUpload from './ForumImageUpload';
import Images from './Forumimage';
import { useNavigate } from 'react-router-dom';



// type ForumTypes = {
//   title: any,
//   content: any,
// }

function ForumCreate() {
  
  const [forumtitle, setforumTitle] = useState("");
  const [forumcontent, setforumContent] = useState("");
  const [forumcategory, setCategory] = useState([]);
  const [forummember, setMember] = useState(null);
  const [forumsigun, setSigun] = useState(null);
  const [forumimage, setImage] = useState(undefined);

  // const [forumupload, setUpload] = useState(null);
  // const [viewContent, setViewContent] = useState([]);


  const navigates=useNavigate();
  const cancelPosts = () => {
  navigates('/Forum');
  }


const forumdata = {
  'title' : forumtitle,
  'content' : forumcontent,
  "sigunguIdList": [1, 2, 3],
  'memberId': 1,
  "categoryList": ['Hotel', 'Restaurant', 'Sport'],
  // "upload": forumimage,
  // 'image_file' : `${Image.name}`,
  
}

// const forumdata2 = JSON.stringify(forumdata);
// console.log(forumdata2)

  // const imgLink ='api/post/'
  // const [flag, setFlag] = useState(false);


  const customUploadAdapter = (loader:any) => {
      return {
        upload() {
          return new Promise((resolve, reject) => {
            const imagedata = new FormData();
            loader.file.then((file:any) => {
              imagedata.append('name', file.name);
              imagedata.append('upload', file);
                // console.log(file.name)
                console.log(imagedata.get('upload'))


              axios.post('/api/post', imagedata)
              .then((res:any) => {
                alert('이미지 업로드 완료!')
                // setImage(res.data.filename);
                console.log(res.data.file.name)
                })
                
                  
                })
              })
            }
          }
        }

        const submitPost = () => {
          console.log(forumdata)
          axios.post('api/post', forumdata)
          .then((res)=>{
            alert('Post Successful!');
            console.log(res)
          })
          .catch((err)=>{
            console.log(err)
            alert('Make Sure to add Titles and Content!');
          })
        };
      

  // const customUploadAdapter = async (loader: any) => {
  //   return {
  //     upload() {
  //       if (loader.target.files) {
  //         const uploadFile = loader.target.files[0];
  //         const imageData = new FormData();
  //         loader.file.then((file: any) => {
  //           imageData.append('files', uploadFile);
  
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
      <div className='forum-create-container px-96'>
        <div className='forum-title-container'>

        <input className='forum-title' type="text" placeholder='Enter Title Here!' 
        onChange={(event) => setforumTitle(event.target.value)}/>
        
        </div>
        <div className='forum-text-editor'>
          <CKEditor
          editor={ClassicEditor}
          config={{
          placeholder: 'Drag, drop or copy & paste to upload image! ',
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
            <div className='flex flex-row w-full justify-end px-44'>
            <button className='border-2 border-black hover:bg-red-400 font-bold py-1 px-4 mx-2 rounded-full' onClick={cancelPosts}>
            Back
            </button>
            <button className='border-2 border-black hover:bg-green-400 font-bold py-1 px-4 mx-2 rounded-full' onClick={submitPost}>
            Submit
            </button>
            </div>
        {/* <ForumImageUpload /> */}
          
      {/* <Images /> */}
    </div>
    </>
    );
  }



  export default ForumCreate;
