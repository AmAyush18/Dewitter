// App.jsx
import React, { useState, useEffect } from 'react';
import { getContract } from './utils/contract';
import Header from './components/Header';
import ConnectWallet from './components/ConnectWallet';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const twitterContract = await getContract();
      setContract(twitterContract);
    };
    init();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        fetchTweets();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const fetchTweets = async () => {
    if (contract && account) {
      try {
        const userTweets = await contract.methods.getTweets(account).call();
        setTweets(userTweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }
  };

  const createTweet = async (tweetContent) => {
    if (contract && account) {
      try {
        await contract.methods.createTweet(tweetContent).send({ from: account });
        fetchTweets();
      } catch (error) {
        console.error('Error creating tweet:', error);
      }
    }
  };

  const likeTweet = async (author, id) => {
    if (contract && account) {
      try {
        await contract.methods.likeTweet(author, id).send({ from: account });
        fetchTweets();
      } catch (error) {
        console.error('Error liking tweet:', error);
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-gray-100">
      <Header account={account} connectWallet={connectWallet} />
      <div className="container mx-auto p-4">
        {!account ? (
          <ConnectWallet connectWallet={connectWallet} isConnecting={isConnecting} />
        ) : (
          <>
            <TweetForm createTweet={createTweet} />
            <TweetList tweets={tweets} likeTweet={likeTweet} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;