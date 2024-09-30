import styled from "styled-components";

interface ContainerProps {
  hasError: boolean;
}

export const DatePickerContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    height: 40px;
    border: 0.16px solid ${({ hasError }) => (hasError ? "red" : "white")};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    padding: 0 1rem;

    &:focus {
      outline: none;
      transition: 0.2s;
      border: 1px solid ${({ hasError }) => (hasError ? "red" : "white")};
    }
  }

  input::after {
    position: absolute;

    left: 4px;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header .react-datepicker__current-month {
    margin-bottom: 1rem;
  }

  .react-datepicker__header__dropdown {
    margin-bottom: 1rem;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 2rem;
  }
`;
