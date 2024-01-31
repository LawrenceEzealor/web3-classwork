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
      <input type="text" value={message} onChange={handleInput} />
      <button onClick={ setMessage } >set message</button>
      <button onClick={ getMessage }>get message</button>
    </div>
  );
}

export default App;
