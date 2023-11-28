/* eslint-disable react/prop-types */
import styled from 'styled-components';

const AvatarWrapper = styled.div`
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  background-color: ${(props) => props.backgroundColor || "black"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.fontSize || '30px'};
  color: ${(props) => props.textColor || 'white'};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`

const Avatar = ({ username, size, backgroundColor, textColor, fontSize }) => {
  return (
    <AvatarWrapper
      size={size}
      backgroundColor={backgroundColor}
      textColor={textColor}
      fontSize={fontSize}
    >
      {username && username.trim().length > 0 ? username.trim()[0].toUpperCase() : ''}
    </AvatarWrapper>
  );
};

export default Avatar;
