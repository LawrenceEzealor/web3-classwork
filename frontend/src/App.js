import './App.css';
import contractABI from './abi.json';
import { useState } from 'react';
const { ethers } = require("ethers");

function App() {

  const [message, setMessages] = useState("");

  const handleInput = (e) => {
    setMessages(e.target.value);
  };

  const contractAddress = "0x2983676cD40a3ae1453Ca07E3dB895c5F9198b77"

  //This function is used to get access to the user's ethereum account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function setMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const transaction = await contract.setMessage(message);
        await transaction.wait();
        console.log('Message sent');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }
  
  async function getMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const transaction = await contract.getMessage();
        await transaction.wait();
        console.log('Message retrieved');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }
  
  return (
    <div className="App">
      <input type="text" value={message} onChange={handleInput} style={{
    padding: '8px',
    margin: '10px 0',
    width: '200px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
  }}/>

      <button onClick={ setMessage } style={{
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  }}>set message</button>
  
      <button onClick={ getMessage } style={{
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  }}>get message</button>
    </div>
  );
}

export default App;
