import "./App.css";
import contractABI from "./abi.json";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const { BrowserProvider, Contract } = ethers;
  const [message, setMessages] = useState("");

  const contractAddress = "0x2983676cD40a3ae1453Ca07E3dB895c5F9198b77";

  //This function is used to get access to the user's ethereum account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.setMessage(message);
        await transaction.wait();
        console.log("Message sent");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.getMessage();
        await transaction.wait();
        console.log("Message retrieved");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    //inline css styling
    <div className="App">
      <div className="container mx-auto bg-green-100 p-8 bg-red border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold ">Hello There! 🤓</h1>
        <div className="w-[467px] m-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessages(e.target.value)}
            className="appearance-none block mt-4 w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 relative"
            style={{ paddingTop: "1rem" }} // Adjust the value to vertically center the placeholder
          />
        </div>
        <button
          onClick={setMessage}
          class="bg-green-500 hover:bg-blue-400 text-white mr-5 ml-5 font-bold py-2 mt-5 px-4 rounded"
        >
          set message
        </button>

        <button
          onClick={getMessage}
          class="bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          get message{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
