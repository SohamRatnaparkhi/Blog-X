// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
contract Tweet {

    address public owner;
    uint256 public _idUser;

    address[] public creators;
    string[] public tweetmessage;
    uint256[] public tweetmessageId;

    struct TweetApp {
        address account;
        uint256 userid;
        string tweetTxt;
       // string tweetImg;
    }

    event tweetCreated (
        address indexed account,
        uint256 indexed userid,
        string tweetTxt
    );

    mapping (address => TweetApp) public tweetApps;
    
    constructor(){

        owner = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createTweet (string calldata _message) external{
        inc();
        uint256 idNumber = _idUser;
        TweetApp storage tweet = tweetApps[msg.sender];

        tweet.account = msg.sender;
        tweet.tweetTxt = _message;
        tweet.userid = idNumber;

        creators.push(msg.sender);
        tweetmessage.push(_message);
        tweetmessageId.push(idNumber);

        emit tweetCreated(msg.sender, tweet.userid, _message);
    }
    
    function getTweetData(address _address) public view returns (
        address,
        uint256,
        string memory

    ){
        
        TweetApp memory t = tweetApps[_address];
       
        return(
            t.account,
            t.userid,
            t.tweetTxt
            );
    }

    function getAddress() external view returns (address[] memory)
    {
        return creators;
    }

    function getMessage() external view returns (string[] memory)
    {
        return tweetmessage;
    }
    
}