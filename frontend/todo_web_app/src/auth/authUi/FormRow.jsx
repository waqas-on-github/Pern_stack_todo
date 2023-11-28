import styled from 'styled-components'


const StyledForm = styled.form`
  display: flex;
   justify-content: center; 
   align-items: center; 
  flex-direction: column;
  gap: 20px;
  /* border : 1px solid red ; */
  padding-top:50px;

h2{
  padding-bottom :30px ;
  font-size :30px;   
}

`
const InputElement = styled.div`
  width : 260px ;
  display : flex ; 
  align-items: center;
  justify-content : space-between; 
  /* border : 1px solid red ;  */
  

  span {
    color: red;
    font-size: 15px;
     position: absolute;
    right :25%;
  
  }
`




export {
    StyledForm , 
    InputElement
}