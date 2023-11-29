/* eslint-disable react/prop-types */
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SpinnerElement = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid orangered; /* Change color as needed */
  border-radius: 50%;
  width: ${(props) => props.size || '30px'};
  height: ${(props) => props.size || '30px'};
  animation: ${spinAnimation} 1s linear infinite;
`;

const Spinner = ({ size }) => {
  return (
    <SpinnerContainer>
      <SpinnerElement size={size} />
    </SpinnerContainer>
  );
};

export default Spinner;
