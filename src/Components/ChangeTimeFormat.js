import React from 'react';

export default function dateFormatChange(date) {
  if (!!date) {
    var year = date.getFullYear(); //YYYY
    var month = 1 + date.getMonth(); //MM
    month = month >= 10 ? month : '0' + month; //MM 두자리로 저장
    var day = date.getDate(); //D
    day = day >= 10 ? day : '0' + day; //DD
    return `${year}-${month}-${day}`;
  }
}
