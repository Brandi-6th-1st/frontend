// import axios from 'axios';
// import APi from '../../config';

// export const REGISTER_USER = 'REGISTER_USER';

// export function registerUser(dataToSubmit) {
//   const data = (method, url, data) => {
//     return axios({
//       method,
//       url: `http://10.58.7.141:5000/register`,
//       data,
//     })
//       .then((res) => res.data)
//       .catch((err) => console.log(err));
//   };
//   return {
//     type: REGISTER_USER,
//     payload: data,
//   };
// }

// export default function (state = {}, action) {
//   switch (action.type) {
//     case REGISTER_USER:
//       return { ...state, loginSuccess: action.payload };
//     default:
//       return state;
//   }
// }
