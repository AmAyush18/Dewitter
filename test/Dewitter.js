const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Dewitter", function () {
  async function deployDewitterFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    const Dewitter = await ethers.getContractFactory("Dewitter");
    const dewitter = await Dewitter.deploy();
    return { dewitter, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { dewitter, owner } = await loadFixture(deployDewitterFixture);
      expect(await dewitter.owner()).to.equal(owner.address);
    });

    it("Should set the correct initial tweet length", async function () {
      const { dewitter } = await loadFixture(deployDewitterFixture);
      expect(await dewitter.MAX_TWEET_LENGTH()).to.equal(320);
    });
  });

  describe("Tweet Creation", function () {
    it("Should create a tweet", async function () {
      const { dewitter, user1 } = await loadFixture(deployDewitterFixture);
      const tweetContent = "Hello, Web3!";
      
      await expect(dewitter.connect(user1).createTweet(tweetContent))
        .to.emit(dewitter, "TweetCreated")
        .withArgs(0, user1.address, tweetContent, anyValue);
      
      const tweet = await dewitter.getTweet(user1.address, 0);
      expect(tweet.content).to.equal(tweetContent);
    });

    it("Should not allow tweets longer than MAX_TWEET_LENGTH", async function () {
      const { dewitter, user1 } = await loadFixture(deployDewitterFixture);
      const longTweet = "a".repeat(321);
      
      await expect(dewitter.connect(user1).createTweet(longTweet))
        .to.be.revertedWith("Tweet is too long!");
    });
  });

  describe("Tweet Interaction", function () {
    it("Should allow liking a tweet", async function () {
      const { dewitter, user1, user2 } = await loadFixture(deployDewitterFixture);
      await dewitter.connect(user1).createTweet("Like this tweet");
      
      await expect(dewitter.connect(user2).likeTweet(user1.address, 0))
        .to.emit(dewitter, "TweetLiked")
        .withArgs(user2.address, user1.address, 0, 1);
      
      const tweet = await dewitter.getTweet(user1.address, 0);
      expect(tweet.likes).to.equal(1);
    });

    it("Should allow unliking a tweet", async function () {
      const { dewitter, user1, user2 } = await loadFixture(deployDewitterFixture);
      await dewitter.connect(user1).createTweet("Like and unlike this tweet");
      await dewitter.connect(user2).likeTweet(user1.address, 0);
      
      await expect(dewitter.connect(user2).unlikeTweet(user1.address, 0))
        .to.emit(dewitter, "TweetUnliked")
        .withArgs(user2.address, user1.address, 0, 0);
      
      const tweet = await dewitter.getTweet(user1.address, 0);
      expect(tweet.likes).to.equal(0);
    });

    it("Should not allow unliking a tweet with no likes", async function () {
      const { dewitter, user1, user2 } = await loadFixture(deployDewitterFixture);
      await dewitter.connect(user1).createTweet("Can't unlike this tweet");
      
      await expect(dewitter.connect(user2).unlikeTweet(user1.address, 0))
        .to.be.revertedWith("TWEET HAS NO LIKES");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to change tweet length", async function () {
      const { dewitter, owner } = await loadFixture(deployDewitterFixture);
      const newLength = 280;
      
      await dewitter.connect(owner).changeTweetLength(newLength);
      expect(await dewitter.MAX_TWEET_LENGTH()).to.equal(newLength);
    });

    it("Should not allow non-owner to change tweet length", async function () {
      const { dewitter, user1 } = await loadFixture(deployDewitterFixture);
      const newLength = 280;
      
      await expect(dewitter.connect(user1).changeTweetLength(newLength))
        .to.be.revertedWith("YOU ARE NOT THE OWNER!");
    });
  });
});