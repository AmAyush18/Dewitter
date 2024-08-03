import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import makeBlockie from 'ethereum-blockies-base64';

function Tweet({ tweet, likeTweet }) {
  const blockie = makeBlockie(tweet.author);

  return (
    <div className="bg-slate-800 rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={blockie} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
        <span className="font-bold text-gray-300">{tweet.author.slice(0, 6)}...{tweet.author.slice(-4)}</span>
      </div>
      <p className="mb-2 text-gray-100">{tweet.content}</p>
      <button 
        onClick={() => likeTweet(tweet.author, tweet.id)} 
        className="text-red-500 flex items-center hover:text-red-600 transition duration-300"
      >
        {tweet.likes > 0 ? <FaHeart /> : <FaRegHeart />}
        <span className="ml-1">{tweet.likes.toString()}</span>
      </button>
    </div>
  );
}

export default Tweet;