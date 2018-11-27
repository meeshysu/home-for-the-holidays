import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidaysByArrayOfIds = (uid, holidayIdsArray) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const holidaysObject = result.data;
      const holidaysArray = [];
      if (holidaysObject != null) {
        Object.keys(holidaysObject).forEach((holidayId) => {
          holidaysObject[holidayId].id = holidayId;
          // will give me all information about holiday plus have id
          // bcs it's an object hence the []
          holidaysArray.push(holidaysObject[holidayId]);
        });
      }
      // console.log('holidayIdsArray', holidayIdsArray);
      // console.log('holidays', result.data);
      const selectedHolidays = holidaysArray.filter(x => holidayIdsArray.includes(x.id));
      resolve(selectedHolidays);
      // wanna only keep the ones that match, so filter
      // find finds one, filter finds all. inside filter a function
      // if the current thing - the id is included in the holidaysarray keep it
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getHolidaysByArrayOfIds };
// taking array of holiday ids and holidays and only return only holidays in id array
// this requires a promise bc you are modifying the data before sending back to call site
// request by uid and resolve out just what we need
