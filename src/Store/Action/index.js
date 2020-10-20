export const addCart = (item) => {
  console.log(item);
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};
export const deleteCart = (item) => {
  return {
    type: 'DELETE_ITEM',
    payload: item,
  };
};
