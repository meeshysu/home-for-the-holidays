import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidayIdsForFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/HolidayFriends.json?orderBy="friendId"&equalTo="${friendId}"`)
    .then((result) => {
      console.log('result', result);
      const holidayFriendsObject = result.data;
      const holidayIds = [];
      if (holidayFriendsObject != null) {
        Object.keys(holidayFriendsObject).forEach((hfId) => {
          holidayIds.push(holidayFriendsObject[hfId].holidayId); // gets you one value/ids
        }); // gets you an array of all keys
      }
      resolve(holidayIds);
    })
    .catch((error) => {
      reject(error);
    });
});


export default { getHolidayIdsForFriend };
// curly brackets bc you're adding to it on the other page blahblah.getholidays.
// when importing object {}
// 'friendId' is the key in firebase, equal to what passing thru
