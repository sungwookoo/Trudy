import React, { useState } from 'react';
import './ForumCreate.css'
import Editor from './Editor';
import parse from 'html-react-parser';

function ForumCreate() {


  const [title, SetTitle] = useState('제목')
  const [Content, SetContent] = useState('내용')
  const [editor, setEditor] = useState(null);

  const changeTitle = (e:any) => {
    SetTitle(e.target.value)
    console.log(e.target.value)
  }

  const changeContent = (e:any) => {
    SetContent(e.target.value)
    console.log(e.target.value)
  }

return(
  <>
    <div>{title}</div>
      <div>{parse(Content)}</div>
        <div className='forum-create-container'>
          <Editor 
          SetContent={SetContent}
          // handleChange={(data:any) => {
          // setEditor(data);
          // }}
          data={Content}/>

        </div>

  </>



  )

}

export default ForumCreate;
