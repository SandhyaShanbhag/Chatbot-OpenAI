import React, {useState} from 'react'
import Chatbot from '../Chatbot/Chatbot';
import UploadFile from '../Upload File/UploadFile';

import './Homepage.css'



function Homepage() {

const[showUploadFile,setShowUploadFile]=useState(true);
const[showChatBot,setShowchatBot]=useState(false);

const uploadFile =()=>{
  setShowUploadFile(true);
  setShowchatBot(false);
}

const chatBot =()=>{
  setShowUploadFile(false);
  setShowchatBot(true);
}
  return (
    <div className='Home'>

        <div className='leftSide'>
          <div className='Left'>
            <section>
              <button className='UF' onClick={uploadFile}>Upload File</button>
            </section>
            <section>
              <button className='CB' onClick={chatBot} >ChatBot</button>
            </section>
          </div>
        </div>


       <div className='rightSide'>
       {
        showUploadFile && <UploadFile/>
       }
       {
        showChatBot && <Chatbot/>
       }
       </div>
    </div>
  )
}

export default Homepage