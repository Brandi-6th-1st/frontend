export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log(state);
      return [...state, action.payload]; // 스토어의 이전 상태에 새로운 item을 추가
    case 'DELETE_ITEM':
      return state.filter(
        (item) => item.product_id !== action.payload.product_id
      );
    default:
      return state; // 해당 사항 없으면 이전 상태를 그대로 리턴
  }
}
const INITIAL_STATE = [{ product_id: 1, count: 1, price: 380000 }];
