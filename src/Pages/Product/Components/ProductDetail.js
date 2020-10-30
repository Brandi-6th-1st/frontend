import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
// require('bootstrap/less/bootstrap.less');
import {
  GoListUnordered,
  GoChevronRight,
  GoFile,
  GoCheck,
} from 'react-icons/go';

export default function ProductDetail({
  product,
  setQuery,
  query,
  setActivePage,
  activePage,
  setProduct,
  sendData,
}) {
  // 버튼의 클릭 상태를 나타내느 배열 생성
  const [isSelected, setIsSelected] = useState(
    new Array(product && product.productItem.length).fill(false)
  );
  // 전체 상품 체크 상태
  const [allCheck, setAllCheck] = useState(false);
  // 상품 디테일에서 체크된 id와 index를 관리하는 배열
  const [checkProduct, setCheckProduct] = useState([]);
  // 상품의 판매, 진열 상태 변경하기 위한 상태
  const [changeStatus, setchangeStatus] = useState({
    salesStatus: {
      id: '',
      filterId: 3,
    },
    displayStatus: {
      id: '',
      filterId: 4,
    },
  });

  // 전체 버튼을 클릭했을 경우 실행
  const handleClickAll = () => {
    if (allCheck) {
      setAllCheck(!allCheck);
      setIsSelected(new Array(product.productItem.length).fill(!allCheck));
      setCheckProduct([]);
    } else {
      setAllCheck(!allCheck);
      setIsSelected(new Array(product.productItem.length).fill(!allCheck));
      setCheckProduct(product.productItem.map((el) => String(el.id)));
    }
  };

  //개별 버튼을 클릭했을 경우 실행
  const selectProduct = (e, idx) => {
    const { checked, id } = e.target;
    const newSelceted = isSelected.map((el, i) => (idx === i ? !el : el));

    setIsSelected(newSelceted);

    // 모든 버튼이 눌렸을 경우
    if (newSelceted.every((item) => item)) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }

    //체크된 상품의 id를 저장한다.
    if (!!checked) {
      setCheckProduct(checkProduct.concat(id));
    } else {
      setCheckProduct(checkProduct.filter((el) => el !== id));
    }
  };

  const handliLimit = (e) => {
    setActivePage(1);
    setQuery({
      ...query,
      limit: e.target.value,
      offset: e.target.value * 0,
    });
  };

  useEffect(() => {
    if (product) {
      setIsSelected(new Array(product.productItem.length).fill(false));
    }
    return () => {};
  }, [product]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setQuery({
      ...query,
      offset: query.limit * (pageNumber - 1),
    });
  };

  // 상품 판매 진열 상태 적용 버튼이 눌렸을 때 실행하는 함수
  const changedApply = (e) => {
    // 판매 or 진열 상태를 입력하지 않았을 경우,
    if (!changeStatus.salesStatus.id && !changeStatus.displayStatus.id) {
      return alert('판매여부 or 진열여부를 선택하세요.');
    }

    // 상품이 하나도 체크되지 않았을 경우
    if (!checkProduct.length) {
      return alert('상품을 선택하세요');
    }

    // 정상적인 동작일때 실행하는 함수
    if (
      (!!changeStatus.salesStatus.id || !!changeStatus.displayStatus.id) &&
      !!checkProduct.length
    ) {
      // 판매여부 필터에서 판매, 미판매 타이틀을 id 값으로 조회하여 찾아온다.
      const sales = product.homeFilterTitle
        .filter((el) => el.id === changeStatus.salesStatus.filterId && el)[0]
        .category.filter(
          (item) =>
            String(item.category_id) === changeStatus.salesStatus.id && item
        )[0].category_title;

      // 진열여부 필터에서 판매, 미판매 타이틀을 id 값으로 조회하여 찾아온다.
      const display = product.homeFilterTitle
        .filter((el) => el.id === changeStatus.displayStatus.filterId && el)[0]
        .category.filter(
          (item) =>
            String(item.category_id) === changeStatus.displayStatus.id && item
        )[0].category_title;

      setProduct({
        ...product,
        productItem: product.productItem.map((item) => {
          if (checkProduct.includes(String(item.id))) {
            return {
              ...item,
              is_on_sale: sales !== '전체' ? sales : item.is_on_sale,
              is_displayed: display !== '전체' ? display : item.is_displayed,
            };
          } else {
            return item;
          }
        }),
      });

      setAllCheck(false);
      setCheckProduct([]);
      setchangeStatus({
        salesStatus: {
          id: '',
          filterId: 3,
        },
        displayStatus: {
          id: '',
          filterId: 4,
        },
      });
    }
  };

  return (
    <ProductContainer>
      <TitleContainer>
        <RootTitle>
          <li>
            <GoListUnordered />
          </li>
          <li>
            상품관리 / 상품 관리 <GoChevronRight />
          </li>
          <li>
            상품관리 관리 <GoChevronRight />
          </li>
          <li> 리스트</li>
        </RootTitle>
        {/* limit 추가 예정 */}
        <LimitRange>
          <select
            value={query.limit}
            onChange={(e) => {
              handliLimit(e);
            }}
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
          </select>
        </LimitRange>
      </TitleContainer>
      <ChangeContainer>
        <PrintExcelBtn>
          <GoFile />
          선택상품 엑셀다운로드
        </PrintExcelBtn>
        <PrintExcelBtn>
          <GoFile />
          전체상품 엑셀다운로드
        </PrintExcelBtn>
        <select
          value={changeStatus.salesStatus.id}
          onChange={(e) =>
            setchangeStatus({
              ...changeStatus,
              salesStatus: {
                ...changeStatus.salesStatus,
                id: e.target.value,
              },
            })
          }
        >
          <option>판매여부</option>
          {product &&
            product.homeFilterTitle.map((el) => {
              return (
                el.id === 3 &&
                el.category.map((sub, i) => {
                  return (
                    i !== 0 && (
                      <option value={sub.category_id} key={i}>
                        {sub.category_title}
                      </option>
                    )
                  );
                })
              );
            })}
        </select>
        <select
          value={changeStatus.displayStatus.id}
          onChange={(e) =>
            setchangeStatus({
              ...changeStatus,
              displayStatus: {
                ...changeStatus.displayStatus,
                id: e.target.value,
              },
            })
          }
        >
          <option>진열여부</option>
          {product &&
            product.homeFilterTitle.map((el) => {
              return (
                el.id === 4 &&
                el.category.map((sub, i) => {
                  return (
                    i !== 0 && (
                      <option
                        value={sub.category_id}
                        key={i}
                        name={sub.category_title}
                      >
                        {sub.category_title}
                      </option>
                    )
                  );
                })
              );
            })}
        </select>
        <ApplyBtn onClick={changedApply}>
          <GoCheck />
          적용
        </ApplyBtn>
      </ChangeContainer>
      <AllProductView>
        <span>
          전체 조회건 수 : <b> {product && product.productItem.length}</b>건
        </span>
      </AllProductView>
      <TableBox>
        <table>
          <ProductHead>
            <tr>
              <ProductCategory twidth={'1%'}>
                <input
                  type="checkbox"
                  checked={allCheck ? 'checked' : ''}
                  onChange={() => handleClickAll()}
                ></input>
              </ProductCategory>
              <ProductCategory>등록일</ProductCategory>
              <ProductCategory>대표이미지</ProductCategory>
              <ProductCategory>상품명</ProductCategory>
              <ProductCategory>상품코드</ProductCategory>
              <ProductCategory>상품번호</ProductCategory>
              <ProductCategory>판매가</ProductCategory>
              <ProductCategory>할인가</ProductCategory>
              <ProductCategory>판매여부</ProductCategory>
              <ProductCategory>진열여부</ProductCategory>
              <ProductCategory>할인여부</ProductCategory>
              <ProductCategory>Actions</ProductCategory>
            </tr>
          </ProductHead>
          <tbody>
            {product &&
              product.productItem.map((cate, idx) => {
                return (
                  <ProductLine idx={idx} key={idx}>
                    <ProductItem>
                      <input
                        type="checkbox"
                        id={cate.id}
                        checked={isSelected[idx] ? 'checked' : ''}
                        onChange={(e) => selectProduct(e, idx)}
                      ></input>
                    </ProductItem>
                    <ProductItem>{cate.registered_at}</ProductItem>
                    <ProductItem>
                      <img
                        src={cate.main_image_url}
                        width="70px"
                        height="70px"
                      />
                    </ProductItem>
                    <ProductItem>{cate.product_name}</ProductItem>
                    <ProductItem>
                      <a href="">{cate.product_code}</a>
                    </ProductItem>
                    <ProductItem>{cate.product_number}</ProductItem>
                    <ProductItem>{cate.price}</ProductItem>
                    <ProductItem> {cate.discount_price}</ProductItem>
                    <ProductItem>{cate.is_on_sale}</ProductItem>
                    <ProductItem>{cate.is_displayed}</ProductItem>
                    <ProductItem>{cate.is_discounted}</ProductItem>
                    <ProductItem>
                      <BuyBtn>구매하기</BuyBtn>
                    </ProductItem>
                  </ProductLine>
                );
              })}
          </tbody>
        </table>
      </TableBox>
      <PaginationContainer>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={query.limit}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => {
            handlePageChange(pageNumber);
          }}
        />
      </PaginationContainer>
    </ProductContainer>
  );
}
const TableBox = styled.div`
  table {
    width: 100%;
    /* table-layout: fixed;  */
  }
  overflow-x: scroll;
  white-space: nowrap;
`;

const ProductContainer = styled.div``;

const TitleContainer = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center')}
  padding: 0 10px 0 20px;
  margin-bottom: 10px;
  background-color: #eeeeee;
`;

const RootTitle = styled.ul`
  display: flex;
  padding: 8px;

  svg {
    color: #9b9b9b;
    vertical-align: top;
  }

  li {
    font-size: 13px;
  }
`;

const LimitRange = styled.div`
  height: 100%;
  select {
    height: 100%;
    border-radius: 1px;
    height: 30px;
  }
`;

const ChangeContainer = styled.div`
  width: 100%;
  text-align: right;

  select {
    height: 30px;
    width: 9%;
    border: 1px solid #e5e5e5;
    margin-left: 5px;
  }
`;

const PrintExcelBtn = styled.button`
  height: 22px;
  margin-left: 3px;
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
  font-size: 12px;
  border-radius: 3px;
  padding: 1px 5px;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }
`;

const ApplyBtn = styled.button`
  width: 5%;
  height: 30px;
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
  margin-left: 5px;
  border-radius: 3px;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }
`;

const AllProductView = styled.div`
  margin-bottom: 3px;

  span {
    font-size: 13px;
  }
`;

const ProductHead = styled.thead`
  width: 100%;
`;

const ProductCategory = styled.th`
  width: auto;
  background-color: #eee;
  padding: 9px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-weight: 600;
  text-align: inherit;

  overflow-x: hidden;
  white-space: nowrap;
`;

const ProductLine = styled.tr`
  background-color: ${({ idx }) => (idx % 2 === 0 ? '#f5f5f5' : '#fff')};
`;

const ProductItem = styled.th`
  padding: 9px;
  border: 1px solid #ddd;
  font-size: 13px;
  font-weight: 400;
  text-align: inherit;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  input {
    width: 14px;
  }

  a {
    color: #0d638f;

    :hover {
      text-decoration: revert;
    }
  }
`;

const BuyBtn = styled.button`
  background-color: #428bca;
  border-radius: 2px;
  font-size: 12px;
  padding: 3px 0px;
  color: white;
  width: 100%;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  ${({ theme }) => theme.flex('center')}
  padding:15px 0px;
  .pagination > li {
    display: inline-block;
    padding-left: 0;
    font-size: 13px;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #428bca;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  /* 현재 활성화 된 page css 효과*/
  .pagination > li.active > a {
    background: #eee;
    border-color: #dddddd;
    color: #333;
    cursor: not-allowed;
  }
  /* hover시 css 효과 */
  .pagination > li > a:hover {
    background: #eee;
    border-color: #dddddd;
    color: #333;
  }
  /* 맨 처음 모서리 둥글게 */
  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  /* 맨 끝 모서리 둥글게 */
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    margin-right: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const PaginationBox = styled.div``;
