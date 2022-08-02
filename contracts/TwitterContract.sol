//SPDX-License-Identifier: Unlicense
// contracts/TwitterContract.sol
pragma solidity ^0.8.0;

contract TwitterCloneContract {
    // Event to emit when a user tweets
    event userTwitted(
        address indexed from,
        uint256 timestamp,
        uint tweetId,
        string username,
        string tweetMessage,
        string imageLink
    );
    struct Tweet {
        address from;
        uint256 timestamp;
        uint256 tweetId;
        string username;
        string tweetMessage;
        string imageLink;
    }
    address payable owner;

    Tweet[] private tweets;

    constructor() {
        owner = payable(msg.sender);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    function postTweet(
        uint256 tweetId_,
        string memory username_,
        string memory tweetMessage_,
        string memory imageLink_
    ) public {
        // Add the tweet to storage
        tweets.push(
            Tweet(
                msg.sender,
                block.timestamp,
                tweetId_,
                username_,
                tweetMessage_,
                imageLink_
            )
        );
        // Emit a userTwitted event with details about the the tweet.
        emit userTwitted(
            msg.sender,
            block.timestamp,
            tweetId_,
            username_,
            tweetMessage_,
            imageLink_
        );
    }
}
