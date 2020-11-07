import React, { Fragment, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dateFormatChange from '../../Components/ChangeTimeFormat';
import styled from 'styled-components';
import ProductDetail from './Components/ProductDetail';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Purchase from '../../Components/Purchase';
import FiltersContainer from './Components/FiltersContainer';
import { API } from '../../config';

export default function ProductManagement() {
  // 히스토리, dispatch 선언
  const history = useHistory();
  const dispatch = useDispatch();
  // 여러번 렌더되는 것을 막기위한 상태값
  const [isMounted, setIsMounted] = useState(false);
  // 모달창 출력 유무를 관리
  const [showModal, setShowModal] = useState(false);
  // 마스터에만 사용되는 데이터를 관리
  const [differentFilter, setDifferentFilter] = useState();
  // 공통으로 사용되는 데이터를 관리
  const [product, setProduct] = useState();
  // 리덕스에서 가져온 필터를 상태로 관리
  const [filters, setFilters] = useState({});
  // 각 필터의 상태를 선택된 상태를 배열로 관리
  const [filterStatus, setFilterStatus] = useState();
  // 현재 페이지 관리
  const [currentDate, setCurrentDate] = useState({
    startDate: '',
    endDate: '',
  });
  // 현재 페이지 관리
  const [activePage, setActivePage] = useState(1);

  const sellerNameId = 'seller_name';
  const attributeId = 'attribute';
  const salesId = 'sale';
  const displayId = 'display';
  const discountId = 'discount';

  // 전체 필터의 상태를 관리
  const [query, setQuery] = useState({
    from: null,
    until: null,
    seller_name: null,
    sellerDetail: null,
    productDetail: null,
    attribute: [],
    sale: null,
    displayed: null,
    discount: null,
    limit: 10,
    offset: 0,
  });

  // store에 저장되어 있는 filter_list를 가져온다.
  const { filter_list } = useSelector(({ userInfo }) => ({
    filter_list: userInfo.filter_list,
  }));

  // store에 저장되어있는 필터의 길이별로 각 버튼의 boolean 생성
  const createFilter = (data) => {
    const allFilter =
      data &&
      data.filter_list.map((el) => {
        return {
          [el.filterTitle]: new Array(el.category && el.category.length)
            .fill()
            .map((_, index) => (index === 0 ? true : false)),
          selectedId: '',
        };
      });

    setFilterStatus(allFilter);
  };

  // 상품 리스트에 출력할 Data를 서버에서 요청하여 받아옵니다.
  const getData = async (param = null) => {
    const localToken = localStorage.getItem('token');

    try {
      // const result = await axios.get(`/public/Data/DataProductManage.json`, {
      const result = await axios.get(`${API}/product`, {
        params: param,
        timeout: 3000, //3초,
        headers: {
          'Content-Type': 'application/json',
          Authorization: localToken,
        },
        // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
        validateStatus: function (status) {
          return status < 500;
        },
      });

      // 통신에 성공했을 경우,
      if (result.status === 200) {
        // 마스터에서만 사용하는 데이터 분리
        const masterData =
          filter_list && filter_list.filter((el) => el.id === sellerNameId)[0];

        // 공통으로 사용하는 데이터
        const sellerData = {
          filter_list: filter_list.filter((el) => el.id !== sellerNameId),
        };

        // 상품리스트를 저장
        const DataProductManage = result.data.success;

        // 현재 필터를 관리하는 boolean이 없다면 생성
        if (!filterStatus) {
          createFilter(sellerData);
        }

        // 마스터에서만 사용하는 데이터 저장
        setDifferentFilter(masterData);
        // 상품 리스트에 보여줄 데이터를 저장
        setProduct(DataProductManage);
        // 공통으로 사용하는 데이터 저장
        setFilters(sellerData);
      }
      // 응답이 실패하였다면,
      else {
        if (result.statusText === 'CONFLICT') {
          alert(result.data.client_message);
          history.push('/');
        }
      }
    } catch (err) {
      if (err.response) {
        // 토큰의 정보가 바뀌었다면, 백엔드에서 받은 message 팝업창 출력
        //   if (err.response.statusText === 'UNAUTHORIZED') {
        //     alert(err.response.data.client_message);
        //     history.push('/');
        //   }
        // } else if (err.request) {
        //   alert('서버에서 응답이 없습니다.', err.request);
        // } else {
        //   alert('메세지 에러', err.message);
      }
    }
  };

  // 페이지 언마운트시 실행
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 페이지 언마운트 완료 후 실행
  useEffect(() => {
    if (isMounted) {
      // if (!filter_list[0]) {
      //   alert('다시 로그인 해주세요.');
      //   history.push('/');
      // }
      getData();
    }
  }, [filter_list]);

  // 각 필터 선택시 true <-> false로 바꿔준다.
  const changeFilter = (id, idx, name, filterId) => {
    // 단일선택하는 필터인 경우
    if (filterId !== attributeId) {
      setFilterStatus(
        filterStatus.map((el) =>
          !!el[name]
            ? {
                ...el,
                id: filterId,
                [name]: el[name].map((_, index) => {
                  return index === idx ? true : false;
                }),
                selectedId: id,
              }
            : el
        )
      );
    }

    // 다중선택하는 필터인 경우
    if (filterId === attributeId) {
      // 필터 전체를 관리하는 배열에서 다중선택하는 필터인 셀러속성이 들어있는 배열만 가져온다.
      const multiFilter =
        filterStatus && filterStatus.filter((el) => el && !!el[name] && el)[0];

      // 버튼을 클릭하고 해제하는 함수
      const changeBtn = multiFilter[name].map((el, index) => {
        return index === idx ? !el : el;
      });

      // 전체버튼이 아닌 다른 버튼이 눌렸을 때, 전체 버튼 해제
      if (idx !== 0) {
        changeBtn[0] = false;
      }

      //버튼이 눌렸을 때, 각 카테고리의 id를 상태로 저장하는 함수
      const addId = (idx) => {
        // 버튼이 클릭되었을 때, 선택된 id 배열에 해당 카테고리 id 추가
        if (
          multiFilter[name].map((el, index) => {
            return index === idx && !el;
          })[idx]
        )
          return [...multiFilter.selectedId].concat(id);

        // 버튼이 해제되었을 때, 선택된 id 배열에서 해당 id 제거
        if (
          !multiFilter[name].map((el, index) => {
            return index === idx && !el;
          })[idx]
        )
          return (
            // 선택되어 있는 상태를 관리하는 배열에서 클릭된 id를 제외한 값만 필터링한다.
            multiFilter.selectedId &&
            multiFilter.selectedId.filter((el) => {
              return el !== id && el;
            })
          );
      };

      // 전체 상태에서 바꿔줄 값만 필터링하여 바꿔서 끼워준다.
      const setFilter = (btnStatus) => {
        return filterStatus.map((el) => {
          return !!el[name] ? btnStatus : el;
        });
      };

      // 전체 버튼이 눌렸을 때,
      const allSelectBtn = changeBtn[0];

      // 모든 버튼이 눌리게 되면,
      const allSelected = changeBtn.slice(1).every((item) => {
        return item;
      });

      // 모든 버튼이 눌리지 않았을 때,
      const allNotSelected = changeBtn.slice(1).every((item) => {
        return !item;
      });

      // 전체가 선택되어야 할 조건
      const allCondition = allSelectBtn || allSelected || allNotSelected;

      //전체가 선택되어야할 조건이 아니라면
      if (!allCondition) {
        setFilterStatus(
          setFilter({
            id: filterId,
            [name]: changeBtn,
            selectedId: addId(idx),
          })
        );
      }
      // 전체가 선택되어야 한다면
      if (allCondition) {
        setFilterStatus(
          setFilter({
            id: filterId,
            [name]: multiFilter[name].map((el, index) => {
              return index === 0 ? true : false;
            }),
            selectedId: [''],
          })
        );
      }
    }
  };

  // 검색 버튼일 눌리게 되면 동작할 함수.
  const sendData = () => {
    // 셀러속성의 현재 버튼이 눌린 상태
    const attribute =
      filterStatus &&
      filterStatus.filter((el) => {
        return !!el['셀러속성'] && el.id;
      })[0] &&
      filterStatus
        .filter((el) => {
          return !!el['셀러속성'] && el.selectedId;
        })[0]
        .selectedId.reduce((acc, item) => {
          return acc ? acc + ',' + item : acc + item;
        });

    // 판매여부의 현재 버튼이 눌린 상태
    const salse =
      filterStatus &&
      filterStatus.filter((el) => {
        return el.id === salesId && el.id;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === salesId && el.id;
      })[0].selectedId;

    // 진열여부의 현재 버튼이 눌린 상태
    const display =
      filterStatus &&
      filterStatus.filter((el) => {
        return el.id === displayId && el.id;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === displayId && el.id;
      })[0].selectedId;

    // 할인여부의 현재 버튼이 눌린 상태
    const discount =
      filterStatus &&
      filterStatus.filter((el) => {
        return el.id === discountId && el.id;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === discountId && el.id;
      })[0].selectedId;

    const test = query.sellerDetail;

    // 상태로 저장하고 있던 값을 params로 보내기 위해 data form 변경
    const queryObj = {
      ...query,
      offset:
        (activePage - 1) * query.limit !== 0
          ? (activePage - 1) * query.limit
          : null,
      limit: Number(query.limit) !== 10 ? query.limit : null,
      attribute: attribute ? attribute : null,
      sale: salse !== '' ? salse : null,
      displayed: display !== '' ? display : null,
      discount: discount !== '' ? discount : null,
      [`${query.sellerDetail}`]: query.productDetail,
      sellerDetail: null,
      productDetail: null,
    };

    console.log('전송된 파람스', queryObj);
    //변경된 form을 param에 넣어 get Data
    getData(queryObj);
  };

  // 검색버튼을 눌렀을 때 실행되는 함수
  const handleSearch = () => {
    sendData();
    setActivePage(1);
  };
  // 초기화 버튼을 눌렀을 때, 상태를 초기화해준다.
  const resetFilter = () => {
    console.log('초기화');
    createFilter(filters);
    setQuery({
      from: null,
      until: null,
      seller_name: null,
      sellerDetail: null,
      productDetail: null,
      attribute: [],
      sale: null,
      displayed: null,
      discount: null,
      limit: Number(query.limit),
      offset: Number(query.limit) ? Number(query.limit) : 10 * activePage,
    });
    setCurrentDate({
      startDate: '',
      endDate: '',
    });
  };

  // DatePicker 라이브러리에서 지원하는 form과 관리하는 form이 달라서 따로 관리해주었다.
  const handleEndDate = (date) => {
    setCurrentDate({ ...currentDate, endDate: date });
    setQuery({
      ...query,
      until: dateFormatChange(date),
    });
  };

  // DatePicker 라이브러리에서 지원하는 form과 관리하는 form이 달라서 따로 관리해주었다.
  const handleStartDate = (date) => {
    setCurrentDate({ ...currentDate, startDate: date });
    setQuery({
      ...query,
      from: dateFormatChange(date),
    });
  };

  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <Purchase showModal={showModal} setShowModal={setShowModal} />
          <h3>상품 관리</h3>
          <FiltersContainer
            currentDate={currentDate}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            differentFilter={differentFilter}
            setQuery={setQuery}
            query={query}
            filters={filters}
            changeFilter={changeFilter}
            filterStatus={filterStatus}
            handleSearch={handleSearch}
            resetFilter={resetFilter}
          />
          <ProductDetail
            product={product}
            setProduct={setProduct}
            query={query}
            setQuery={setQuery}
            activePage={activePage}
            setActivePage={setActivePage}
            filters={filters}
            sendData={sendData}
            setShowModal={setShowModal}
            salesId={salesId}
            displayId={displayId}
          />
        </Section>
      </Main>
      <Footer />
    </Fragment>
  );
}

const Main = styled.div`
  display: flex;
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px 20px;
  margin-top: 45px;
  border-radius: 0 0 0 4px;
  background-color: #fafafa;

  h3 {
    font-size: 26px;
    margin-bottom: 15px;
    font-weight: 300;
    color: #666;
  }
`;
