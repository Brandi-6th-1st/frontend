export default function validate({ email, password }) {
  const errors = {};

  if (!id) {
    errors.id = '필수 입력항목입니다.';
  } else if (id.length < 5) {
    error.id = '아이디의 최소 길이는 5글자입니다.';
  }

  // if (!id) {
  //   errors.email = "필수 입력항목 입니다.";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
  //   errors.email = "입력된 이메일이 유효하지 않습니다.";
  // }

  // if (!password) {
  //   errors.password = "비밀번호가 입력되지 않았습니다.";
  // } else if (password.length < 8) {
  //   errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
  // }

  return errors;
}
