import React, { useState } from 'react';
import axios from 'axios';

function ForumCreate() {
  const [user, setUser] = useState('Pyo');
  const [content, setContent] = useState('Content');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('user', user);
    formData.append('content', content);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    console.log(formData)
    axios.post('api/post', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user">Username:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="files">Files:</label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          onChange={(event) => setFiles(event.target.files)}
        />
      </div>
      <button type="submit" onClick={(event) => console.log()}>전송</button>
    </form>
  );
};

export default ForumCreate;