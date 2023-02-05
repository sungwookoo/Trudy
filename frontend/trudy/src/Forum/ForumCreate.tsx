import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import './ForumCreate.css'

const MyckEditor = () => {
  const API_URL = 'api/post';
  const UPLOAD_ENDPOINT = 'api/post';

  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
        const body = new FormData();
          loader.file.then((file: any) => {
            body.append('uploadImg', file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: 'post',
              body: body,
            })
              .then((res: any) => res.json())
              .then((res) => {
                resolve({ default: `${API_URL}/${res.url}` });
              })
              .catch((err) =>{
                reject(err);
              })
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="forum-create-container">
      <div className='forum-create-category'>
        
      </div>
      <div className='forum-create-box'>
      {/* <h1>Using CKEditor 5 build in React</h1> */}
      <CKEditor
        editor={Editor}
        config={{
          // placeholder: 'Type or p',
          extraPlugins: [uploadPlugin],
        }}
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event: any, editor: any) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log('Focus.', editor);
        }}
      />
        <div className='Forum-Create-buttons'>
          <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Submit Post
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default MyckEditor;