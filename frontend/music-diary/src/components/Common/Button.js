import styled, { css } from "styled-components";

const SIZES = {
  sm: css`
    --button-width: 100px;
    --button-hegith: 50px;
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-width: 130px;
    --button-hegith: 60px;
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-width: 150px;
    --button-hegith: 70px;
    --button-font-size: 1rem;
    --button-padding: 8px 20px;
    --button-radius: 12px;
  `,
};

const StyledButton = styled.button`
  ${(props) => props.sizeStyle}

  background: ${(props) => props.color};

  width: var(--button-width);
  height: var(--button-height);
  border: none;
  border-radius: 12px;

  padding: var(--button-padding);
  font-size: var(--button-font-size);

  color: #ececec;

  cursor: pointer;
  font-family: "alsongdalsong";

  &:hover {
    background-color: #DF8787;
  }
`;

StyledButton.defaultProps = {
  color: "#e2cece",
};

const Button = (props) => {
  const sizeStyle = SIZES[props.size];

  return (
    <StyledButton {...props} sizeStyle={sizeStyle}>
      {props.name}
    </StyledButton>
  );
};

export default Button;
