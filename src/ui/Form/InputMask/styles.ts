import styled from "styled-components";

interface ContainerProps {
  hasError: boolean;
}

export const ContainerInputMask = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    > &:focus {
      outline: none;
      transition: 0.2s;
    }
  }
`;
