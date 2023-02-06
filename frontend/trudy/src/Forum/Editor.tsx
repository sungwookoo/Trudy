import React, { useState } from 'react';
import { CKEditor, CKEditorProps } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

const API_URL = 'api/post';

interface EditorProps {
  SetContent: (data: string) => void;
  // handleChange: any
  data: string;
}

const Editor: React.FC<EditorProps> = ({ SetContent }) => {
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: any) => {
            body.append('files', file);
            fetch(`${API_URL}/`, {
              method: 'post',
              body: body,
            })
              // .then((res: any) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL}/${res.url}`
                });
              })
              .catch((err) => {
                reject(err);
              });
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
    <div className="forum-form-wrapper">
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          SetContent(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event: any, editor: any) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default Editor;