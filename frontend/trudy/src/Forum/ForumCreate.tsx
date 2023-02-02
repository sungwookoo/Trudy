import React, { useEffect, useState } from 'react'
import './ForumCreate.css'


const writeArticle = (title: string, content: string) => {
  console.log(`Title: ${title} Content: ${content}`);
};

function ForumCreate ( onSubmit: any ) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, content);
  };

  return (
    <div className='article-create-container'>
    <form className='article-form-container' onSubmit={handleSubmit}>
      {/* <div className='forms-text'> */}
      <input className='my-10 w-96 h-10 '
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      
      <textarea className='w-96 h-80 resize-none'
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {/* </div> */}
      <button className='bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-5 my-10' type="submit">Post</button>
    </form>
      
    
    </div>
  );
}

export default ForumCreate;