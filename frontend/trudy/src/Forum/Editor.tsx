import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// type Props = {
//   setDesc: (data: string) => void;
//   desc: string;
//   setImage: (data :any) => void;
// }; { setDesc, desc, setImage }

function Editor () {
  // const [flag, setFlag] = useState(false);
  // const imgLink = '/api/post';

  const [forumContent, setForumContent] = useState<string>()
  
  // const [viewContent, setViewContent] = useState([]);


  // const getValue = (e:any) => {
  //   const {name, value} = e.target;
  //   setForumContent({
  //     ...forumContent,
  //     [name]: value
  //   })
  // };  

  // const customUploadAdapter = async (loader:any) => {
  //   return {
  //     upload() {
  //       if(loader.target.files){
  //         const uploadFile = loader.target.files[0]
  //         const formData = new FormData();
  //         loader.file.then((file:any) => {
  //           formData.append('files', uploadFile);

  //           await axios({
  //             method: 'post',
  //             url: 'api/post',
  //             data: formData,
  //             headers: {
  //               'Content-Type':'multipart/form-data',
  //             }
  //           });
          
        



  // const customUploadAdapter = (loader:any) => {
  //   return {
  //     upload() {
  //       return new Promise((resolve, reject) => {
  //         const data = new FormData();
  //         loader.file.then((file:any) => {
  //           data.append('name', file.name);
  //           data.append('file', file);

  //           axios
  //             .post('/api/post', data)
  //             .then((res) => {
  //               if (!flag) {
  //                 setFlag(true);
  //                 setImage(res.data.filename);
  //               }
  //               resolve({
  //                 default: `${imgLink}/${res.data.filename}`,
  //               });
  //             })
  //           //   .catch((err) => reject(err));
  //         });
  //       });
  //     },
  //   };
  // };

  // function uploadPlugin(editor:any) {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
  //     return customUploadAdapter(loader);
  //   };
  // }

  return (
  <div>
    <CKEditor
      editor={ClassicEditor}
      config={{
        // extraPlugins: [uploadPlugin],
      }}
      data={forumContent}
      onReady={(editor:any) => {
      }}
      onChange={(event:any, editor:any) => {
        const data = editor.getData();
        setForumContent(data);
        // setForumContent({
        //   ...forumContent,
        //   content:data
        // });
      }}
      onBlur={(event:any, editor:any) => {
        // console.log('Blur.', editor);
      }}
      onFocus={(event:any, editor:any) => {
        // console.log('Focus.', editor);
      }}
    />
      
  </div>
  );
};

export default Editor;