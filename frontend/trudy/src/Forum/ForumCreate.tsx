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
      <input className='my-10 w-96'
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      
      <textarea className='w-96 h-80'
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {/* </div> */}
      <button className='my-52' type="submit">Submit</button>
    </form>
      
    
    </div>
  );
}

export default ForumCreate;