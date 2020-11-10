import React from 'react';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import { API } from '../config';

export default async function baseInfo() {
  const localToken = localStorage.getItem('token');

  try {
    const result = await axios.get(`${API}/account/base_info`, {
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: localToken,
      },
      // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
      validateStatus: function (status) {
        return status < 500;
      },
    });

    if (result.status === 200) {
      const getIsMaster = await result.data.success.is_master;
      const getNavList = await result.data.success.nav_list;
      const getFilterList = await result.data.success.filter_list;

      return {
        is_master: getIsMaster,
        filter_list: getFilterList,
        nav_list: getNavList,
      };
    } else {
      alert(result.data.client_message);
      history.push('/');
    }
  } catch (err) {
    console.log(err);
    history.push('/');
  }
}
