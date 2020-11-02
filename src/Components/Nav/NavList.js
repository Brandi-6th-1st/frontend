import React, { useState, useEffect, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
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
  menuTitle,
  subTitle,
  index,
  subActive,
  active,
  setSubActive,
  handlePage,
  sidebarSmall,
  link,
}) {
  const history = useHistory();
  const isSubActive = index === subActive;
  const isPageActive = index === active[0];
  const [isHoverActive, setIsHoverActive] = useState(0);

  const toggleSubNav = (index) => {
    // 활성화 된 메뉴를 비활성화, 또는 새로운 메뉴를 활성화
    isSubActive ? setSubActive(0) : setSubActive(index);
  };

  // nav바가 접혀있을 때, 호버시 효과
  const handleHover = (index) => {
    sidebarSmall && setIsHoverActive(index);
  };

  // 해당 nav가 클릭되었을 때 토글바 실행
  const handleClick = (index, link) => {
    toggleSubNav(index);
    if (link === 'order') {
      return;
    }
    link && history.push('/' + link);
  };

  return (
    <Fragment>
      <NavElement
        onClick={() => handleClick(index, link)}
        isPageActive={isPageActive}
        isSubActive={isSubActive}
        sidebarSmall={sidebarSmall}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={() => handleHover(0)}
        hoverActive={index === isHoverActive}
      >
        <List>
          {NAV_ICONS[menuTitle]}
          {/* 사이드바 사이즈에 따른 카테고리의 형태 변화*/}
          {sidebarSmall ? (
            <HoverContainer>
              <CategorySmall active={index === isHoverActive}>
                <span>{menuTitle}</span>
              </CategorySmall>
              {subTitle && index === isHoverActive && (
                <SubList
                  categoryIdx={index}
                  handlePage={handlePage}
                  subTitle={subTitle}
                  active={active}
                  sidebarSmall={sidebarSmall}
                />
              )}
            </HoverContainer>
          ) : (
            <span>{menuTitle}</span>
          )}
        </List>
        {/* 사이드 바가 확장되어 있고 subcategory가 있는 경우에만 우측 화살표 아이콘 출력 */}
        {!sidebarSmall && subTitle && (
          <ArrowIcon isSubActive={isSubActive} isPageActive={isPageActive}>
            <KeyboardArrowLeft size={19} />
          </ArrowIcon>
        )}
      </NavElement>
      {!sidebarSmall && isSubActive && subTitle && (
        <SubList
          categoryIdx={index}
          handlePage={handlePage}
          subTitle={subTitle}
          active={active}
          sidebarSmall={sidebarSmall}
        />
      )}
    </Fragment>
  );
}

const NavElement = styled.li`
  ${({ theme }) => theme.flex('space-between', 'center', 'row')}
  position: relative;
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
  ${({ sidebarSmall }) =>
    sidebarSmall &&
    css`
      width: 40px;
      padding-left: 10px;
    `}
  ${({ hoverActive }) =>
    hoverActive &&
    css`
      width: 214px;
    `}
`;

const List = styled.div`
  ${({ theme }) => theme.flex('', 'center', 'row')}
  position: absolute;
  span {
    margin-left: 10px;
    font-size: 14px;
    color: #eee;
  }
`;

const HoverContainer = styled.div`
  position: relative;
`;

const CategorySmall = styled.div`
  ${({ theme }) => theme.flex('', 'center', 'row')}
  position: relative;
  top: 0;
  left: 0;
  padding-left: 5px;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const ArrowIcon = styled.span`
  position: absolute;
  right: 15px;
  color: #666;
  ${({ isSubActive }) =>
    isSubActive &&
    css`
      transform: rotate(270deg);
      color: #a6a8ae;
    `};
  ${({ isPageActive }) =>
    isPageActive &&
    css`
      color: white;
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
