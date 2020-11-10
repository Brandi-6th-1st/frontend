import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { API } from '../../../config';

function PageRecord({
  filter,
  setFilter,
  sellerList,
  setSellerList,
  currentPage,
  setCurrentPage,
  sellerPerPage,
  handleRecordCount,
  handleNextPage,
  handlePrevPage,
}) {
  //현재 페이지 +/- 카운트
  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  //   paginate();

  //   // fetch(`${API}5000/account/seller?limit=${sellerPerPage}&offset=${offset}`, {
  //   //   headers: {
  //   //     Authorization: localStorage.getItem('token'),
  //   //   },
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((result) => setSellerList(result.success));
  // };

  // const handlePrevPage = () => {
  //   setCurrentPage(currentPage - 1);
  //   paginate();
  //   // if (currentPage <= 1) {
  //   //   setCurrentPage(1);
  //   // }
  //   // fetch(`${API}5000/account/seller?limit=${sellerPerPage}&offset=${offset}`, {
  //   //   headers: {
  //   //     Authorization: localStorage.getItem('token'),
  //   //   },
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((result) => setSellerList(result.success));
  // };

  //현재 페이지 * 한 페이지당 보이는 셀러 수(limit) = offset
  const hanleOffset = () => {
    if (currentPage !== 1) {
      const nextFilter = {
        ...filter,
        offset: currentPage * sellerPerPage,
      };
      setFilter(nextFilter);
    }
  };

  // ?limit=${limit}&offset=${offset}

  // const handleLimitOffset = async () => {
  //   const { limit, offset } = filter;
  //   const nextFilter = {
  //     ...filter,
  //     //input을 클릭했지만,값을 입력하지 않은 경우에는 빈 스트링으로 저장됨. 이 경우 값을 null로 바꿔주기

  //     // limit이 10인 경우 querystring 보내지 않음
  //     limit: limit ? limit : null,
  //     //1페이지의 경우 querystrign 보내지 않음
  //     offset: offset ? offset : null,
  //   };
  //   setFilter(nextFilter);
  //   const result = await axios.get(
  //     `${API}5000/account/seller`,
  //     {
  //       limit: limit,
  //       offset: offset,
  //     },
  //     {
  //       headers: { Authorization: localStorage.getItem('token') },
  //     }
  //   );
  //   setSellerList(result.data);
  // };

  //currentPage, sellerPerPage가 바뀔 때마다 handleOffset 함수 실행
  useEffect(() => {
    hanleOffset();
  }, [sellerPerPage]);

  console.log('offset', filter.offset);

  console.log('pagerecord', filter);

  return (
    <Container>
      <Page>
        <span>Page</span>
        <PageButton onClick={handlePrevPage}>
          <AiOutlineLeft />
        </PageButton>
        <PageInput
          type='text'
          value={currentPage ? currentPage : 1}
          min='1'
          readOnly
        />
        <PageButton onClick={handleNextPage}>
          <AiOutlineRight />
        </PageButton>
        <p>
          of
          <span>
            {/* limit에 따른 보여질 페이지 수  */}
            {filter.limit === null
              ? sellerList &&
                Math.ceil(
                  sellerList.total_seller_number[0].total_seller_count / 10
                )
              : Math.ceil(
                  sellerList.total_seller_number[0].total_seller_count /
                    filter.limit
                )}
          </span>
        </p>
      </Page>
      <ViewRecords>
        <span>View</span>
        <Select value={sellerPerPage} onChange={handleRecordCount}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='150'>150</option>
        </Select>
        <span>records</span>
      </ViewRecords>
      <FoundRecords>
        <span>Found Total</span>
        {/*total seller 수 */}
        <span>
          {sellerList && sellerList.total_seller_number[0].total_seller_count}
        </span>
        <span>records</span>
      </FoundRecords>
    </Container>
  );
}

export default PageRecord;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}

  p {
    margin-right: 5px;
    font-size: 13px;
  }
`;

const Page = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    margin: 0 5px;
  }

  &:after {
    margin-right: 5px;
    content: '|';
  }
`;

const ViewRecords = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    margin-right: 5px;
  }

  &:after {
    margin-right: 5px;
    content: '|';
  }
`;

const PageButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  width: 27px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  font-size: 12px;
`;

const PageInput = styled.input`
  margin: 0 5px;
  padding: 6px 10px;
  width: 45px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  vertical-align: middle;
  align-items: center;
`;

const Select = styled.select`
  margin: 0 5px;
  padding: 2 10px;
  height: 30px;
  width: 80px;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FoundRecords = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;

  span {
    margin-right: 4px;
  }
`;
