import React from 'react';
import styled from 'styled-components';

export default function ProductInfo({ sellerStatus, textInfo, idx }) {
  return (
    <SalesBox>
      <SalesStatus>
        {textInfo.category.map((el, index) => {
          if (idx === 0 && index === 0) {
            return (
              <SalesCategory key={index}>
                <span>{el.sub_title} : </span>
                <b>{sellerStatus && sellerStatus.order_preparing} 건 </b>
              </SalesCategory>
            );
          } else if (idx === 0 && index === 3) {
            return (
              <SalesCategory key={index}>
                <span>{el.sub_title} : </span>
                <b>{sellerStatus && sellerStatus.order_delivered} 건 </b>
              </SalesCategory>
            );
          } else if (idx === 2 && index === 1) {
            return (
              <SalesCategory key={index}>
                <span>{el.sub_title} : </span>
                <b>{sellerStatus && sellerStatus.total_product} 건 </b>
              </SalesCategory>
            );
          } else if (idx === 2 && index === 2) {
            return (
              <SalesCategory key={index}>
                <span>{el.sub_title} : </span>
                <b>{sellerStatus && sellerStatus.products_on_sale} 건 </b>
              </SalesCategory>
            );
          }
          return (
            <SalesCategory key={index}>
              <span>{el.sub_title} : </span>
              <b>{el.sub_number} 건 </b>
            </SalesCategory>
          );
        })}
      </SalesStatus>
    </SalesBox>
  );
}

const SalesBox = styled.div`
  display: inline-block;
  width: 33.3%;
  padding: 0 15px;
  margin-bottom: 22px;

  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

const SalesStatus = styled.div`
  background-color: #fff;
  height: 100%;
  padding: 15px 20px 0px 20px;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;

const SalesCategory = styled.div`
  ${({ theme }) => theme.flex('space-between')}
  height:30px;

  span,
  b {
    font-size: 13px;
  }
`;
