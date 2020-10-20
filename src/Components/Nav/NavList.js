import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@styled-icons/material';
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

export default function NavList({ category }) {
  return (
    <NavElement>
      {NAV_ICONS[category]}
      <span>{category}</span>
    </NavElement>
  );
}

const NavElement = styled.li`
  ${({ theme }) => theme.flex('', 'center', 'row')}
  width: 215px;
  height: 40px;
  padding: 10px 15px;
  border-bottom: 1px solid #444;
  color: #aaa;
  /* border-right: 4px solid #d12610; */
  span {
    margin-left: 10px;
    font-size: 14px;
    color: #eee;
  }
`;

const NAV_ICONS = {
  홈: <VscHome size="22" />,
  공지사항: <VscComment size="22" />,
  통계: <VscGraph size="22" />,
  주문관리: <AiOutlineShoppingCart size="22" />,
  '취소/환불 관리': <VscPackage size="22" />,
  상품관리: <VscJersey size="22" />,
  고객응대관리: <AiOutlineSmile size="22" />,
  정산관리: <AiOutlineCalculator size="22" />,
  진열관리: <AiOutlineEye size="22" />,
  '기획전/쿠폰관리': <VscGift size="22" />,
  회원관리: <VscAccount size="22" />,
  고객센터: <VscInfo size="22" />,
};
