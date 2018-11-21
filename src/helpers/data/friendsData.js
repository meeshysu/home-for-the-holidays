import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFriends = (uid) => {
  console.log('uid', uid);
};

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      resolve(singleFriend); // when called you can use .then on friends page
    }) // to get single friend back
    .catch((error) => { // we are manipulating before we solve it
      reject(error);
    });
});

const deleteFriends = (friendId) => {
  console.log('friendId', friendId);
};

export default { getAllFriends, getSingleFriend, deleteFriends };
