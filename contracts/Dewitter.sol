// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Twitter {

    uint16 public MAX_TWEET_LENGTH = 320;

    struct Tweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    // mapping between user and tweets
    mapping(address => Tweet[]) public tweets;

    address public owner;

    event TweetCreated(uint256 id, address author, string content, uint256 timestamp);

    event TweetLiked(address liker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);

    event TweetUnliked(address unliker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "YOU ARE NOT THE OWNER!");
        _;
    }

    function changeTweetLength(uint16 newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH = newTweetLength;
    }

    function createTweet(string memory _tweet) public {

        require(bytes(_tweet).length <= MAX_TWEET_LENGTH, "Tweet is too long!");

        Tweet memory newTweet = Tweet({
            id: tweets[msg.sender].length,
            author: msg.sender,
            content: _tweet,
            timestamp: block.timestamp,
            likes: 0
        });

        tweets[msg.sender].push(newTweet);

        emit TweetCreated(newTweet.id, newTweet.author, newTweet.content, newTweet.timestamp);
    }

    function likeTweet(address author, uint256 _id) external {
        require(tweets[author][_id].id == _id, "TWEET DOES NOT EXIST"); 

        tweets[author][_id].likes++;

        emit TweetLiked(msg.sender, author, _id, tweets[author][_id].likes);
    }
    
    function unlikeTweet(address author, uint256 _id) external {
        require(tweets[author][_id].id == _id, "TWEET DOES NOT EXIST"); 
        require(tweets[author][_id].likes > 0, "TWEET HAS NO LIKES");
        
        tweets[author][_id].likes--;
        emit TweetUnliked(msg.sender, author, _id, tweets[author][_id].likes);
    }

    function getTweet(address _owner, uint _i) public view returns (Tweet memory) {
        return tweets[_owner][_i];
    }
    
    function getTweets(address _owner) public view returns (Tweet[] memory) {
        return tweets[_owner];
    }
}