import React from 'react';
import Tweet from './Tweet';

function TweetList({ tweets, likeTweet }) {
  if (tweets.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-2xl font-bold mb-2">No tweets yet</h3>
        <p className="text-gray-400">Be the first one to create a tweet!</p>
      </div>
    );
  }

  return (
    <div>
      {tweets.map((tweet, index) => (
        <Tweet key={tweet.id} tweet={tweet} likeTweet={likeTweet} />
      ))}
    </div>
  );
}

export default TweetList;