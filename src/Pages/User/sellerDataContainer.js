import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sellerDataActions from '../../Store/Reducer/sellerData';
import SellerTable from '../../Pages/User/SellerTable';
import PageRecord from '../../Pages/User/PageRecord';

function sellerDataContainer() {
  const handleSellerStatus = (e) => {
    const { sellerDataActions } = this.props;
    sellerDataActions.changeValue(e.target.value);
  };

  const handleSellerAttribute = (e) => {
    const { sellerDataActions } = this.props;
    sellerDataActions.changeValue(e.target.value);
  };

  const handleInputChange = (e) => {
    const nextFilter = {
      ...filter,
      [e.target.name]: e.target.value,
    };
    setFilter(nextFilter);
  };

  const handleDate = () => {
    const nextFilter = {
      ...filter,
      start_date: dateFormatChange(startDate),
      end_date: dateFormatChange(endDate),
    };
    setFilter(nextFilter);
  };

  return <div></div>;
}

export default sellerDataContainer;
