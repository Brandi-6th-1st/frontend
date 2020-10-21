import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import SubList from './SubList';
import { KeyboardArrowLeft, KeyboardArrowDown } from '@styled-icons/material';
import {
  VscHome,
  VscGraph,
  VscComment,
  VscAccount,
  VscInfo,
  VscPackage,
  VscGift,
  VscJersey,
} from 'react-icons/vsc';
import {
  AiOutlineCalculator,
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineSmile,
} from 'react-icons/ai';

export default function NavList({
  category,
  subcategory,
  index,
  subActive,
  active,
  setSubActive,
  handlePage,
}) {
  const isSubActive = index === subActive;
  const isPageActive = index === active;

  const toggleSubNav = (index) => {
    // 활성화 된 메뉴를 비활성화, 또는 새로운 메뉴를 활성화
    isSubActive ? setSubActive(0) : setSubActive(index);
  };

  return (
    <Fragment>
      <NavElement
        onClick={() => toggleSubNav(index)}
        isPageActive={isPageActive}
        isSubActive={isSubActive}
      >
        <List>
          {NAV_ICONS[category]}
          <span>{category}</span>
        </List>
        {subcategory && (
          <ArrowIcon isSubActive={isSubActive}>
            <KeyboardArrowLeft size={19} />
          </ArrowIcon>
        )}
      </NavElement>
      {isSubActive && subcategory && (
        <SubList
          categoryIdx={index}
          handlePage={handlePage}
          subcategory={subcategory}
        />
      )}
    </Fragment>
  );
}

const NavElement = styled.li`
  ${({ theme }) => theme.flex('space-between', 'center', 'row')}
  width: 215px;
  height: 40px;
  padding: 10px 15px;
  border-bottom: 1px solid #444;
  color: #aaa;
  cursor: pointer;
  ${({ isSubActive }) =>
    isSubActive &&
    css`
      background: #2b2b30;
      border-bottom: 0px solid #444;
    `};
  ${({ isPageActive }) =>
    isPageActive &&
    css`
      background: #2b2b30;
      border-right: 4px solid #d12610;
    `};
  &:hover {
    background-color: #2b2b30;
  }
`;

const List = styled.div`
  ${({ theme }) => theme.flex('', 'center', 'row')}
  span {
    margin-left: 10px;
    font-size: 14px;
    color: #eee;
  }
`;

const ArrowIcon = styled.span`
  color: #666;
  ${({ isSubActive }) =>
    isSubActive &&
    css`
      transform: rotate(270deg);
      color: #a6a8ae;
    `};
`;

const NAV_ICONS = {
  홈: <VscHome size="20" />,
  공지사항: <VscComment size="20" />,
  통계: <VscGraph size="20" />,
  주문관리: <AiOutlineShoppingCart size="20" />,
  '취소/환불 관리': <VscPackage size="20" />,
  상품관리: <VscJersey size="20" />,
  고객응대관리: <AiOutlineSmile size="20" />,
  정산관리: <AiOutlineCalculator size="20" />,
  진열관리: <AiOutlineEye size="20" />,
  '기획전/쿠폰관리': <VscGift size="20" />,
  회원관리: <VscAccount size="20" />,
  고객센터: <VscInfo size="20" />,
};
