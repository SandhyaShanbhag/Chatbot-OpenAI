import {React,useState,useEffect} from 'react';
import './Chatbot.css'
import sendIcon from '../../Assets/Images/send.png'
import menu from './OptionList.js'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem } from '@coreui/react';
import axios from 'axios';
import '@coreui/coreui/dist/css/coreui.min.css'
import profile from '../../Assets/Images/profile.png'
import bot from '../../Assets/Images/bot.png'
// import listReactFiles from 'list-react-files'




const Chatbot = () => {
  const [sample, setSample] = useState(["Hello"]);
  const [query, setQuery] = useState('');
  // const [path, setPath] = useState('');
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState('');

  const sendMessage = async () => {
    setSample(prevSample => [...prevSample, query])
    const dataList={
      "query":query,
      "file":file
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/query',dataList);
      // console.log(response.data); // Process the response data
      setSample(prevSample => [...prevSample, response.data])
      setQuery('')

      // console.log(sample);
  
      return response.data; // You can return a value from an async function
    } catch (error) {
      // setSample(prevSample => [...prevSample, "Hello"])
      setQuery('')
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    async function getFiles() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/files');
        // console.log(response.data); // Process the response data
        // setSample(prevSample => [...prevSample, response.data])
        setFiles(response.data)
  
        // console.log(sample);
    
        return response.data; // You can return a value from an async function
      } catch (error) {
        // setSample(prevSample => [...prevSample, "Hello"])
        console.error('Error fetching data:', error);
      }
    }
    getFiles();
  }, []);


  const DropdownMenu = files.map((file)=>{
      return (<CDropdownItem onClick={() => setFile(file)}>{file}</CDropdownItem>);
    })
  const handleKeyDown = event => {

      // console.log('User pressed: ', event.key);
  
      if (event.key === 'Enter') {
  
        sendMessage()
  
      }
  
    };
  return (
  
    <div>
<div className='ddm'>
<CDropdown>
  <CDropdownToggle color="secondary">Select File</CDropdownToggle>
  <CDropdownMenu>
    {DropdownMenu}
  </CDropdownMenu>
</CDropdown>
</div>



    <div className="chat-messages">
      {sample.map((message, index) => (
        <div key={index} className={index % 2 != 0? 'userMessage':'apiMessage'}>
          <div className='imageDiv'> <img src={index % 2 == 0? bot:profile} width='30px' height='30px' /></div>
          <div className='messageDiv'><p className="message-text">{message}</p></div>
      </div>
      ))}
    </div>
    <div className='textBar'>
    <input type="text" name="" value={query} id="textBox" onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown}/>
    {/* onChange={(event) => setQuery(event.target.value)} */}
    <div className='sendIcon' onClick={sendMessage}>
    {/* onClick={sendMessage} */}
    <img src={sendIcon} alt="" width='30px' height='30px'/>
    </div>
    </div>
    </div>
  );
};


export default Chatbot;