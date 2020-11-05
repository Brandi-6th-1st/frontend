import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { AiOutlineWarning, AiOutlineMail } from 'react-icons/ai';

function IconInput({ inputName, inputType, inputPlaceholder }) {
  const { register, errors, watch, handleSubmit } = useForm({ mode: 'submit' });
  const onSubmit = (data) => console.log(data);
  return (
    <Container className={errors.managerEmail && 'ErrorInput'}>
      <AiOutlineMail color={errors.managerEmail ? '#b94a48' : null} />
      <input
        name={inputName}
        type={inputType}
        placeholder={inputPlaceholder}
        ref={register({
          required: '필수 입력항목 입니다. ',
        })}
      />
    </Container>
  );
}

export default IconInput;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  margin: 10px 0;
  padding: 13px 16px;
  width: 41%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  svg {
    width: 15px;
    height: 15px;
    color: gray;
  }
  input {
    margin-left: 10px;
  }
  &.ErrorInput {
    border: 1px solid #b94a48;
  }
`;
