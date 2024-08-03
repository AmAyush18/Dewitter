// components/TweetForm.jsx
import React, { useState } from 'react';

function TweetForm({ createTweet }) {
  const [tweet, setTweet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweet.trim()) {
      createTweet(tweet);
      setTweet('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg shadow p-4 mb-4">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-2 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What's happening?"
        rows="3"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition duration-300"
        >
          Tweet
        </button>
      </div>
    </form>
  );
}

export default TweetForm;