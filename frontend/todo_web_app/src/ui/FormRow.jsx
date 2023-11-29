import styled from 'styled-components'


const StyledForm = styled.form`
  display: flex;
   justify-content: center; 
   align-items: center; 
  flex-direction: column;
  gap: 20px;
  padding-top:50px;

h2{
  padding-bottom :30px ;
  font-size :30px;   
}

.btn {
    background-color :  orangered;
    color: white;
    border : none ;
    outline :none;
    padding : 15px;
    font-weight :bold;
    border-radius : 5px;
    &:hover {
        background-color : lightsalmon
        
    }

}

.redirect {
    font-size : 14px;
}
.nvlink {
    color : black;
}
`

const InputElement = styled.div`
  width : 400px ;
  display : flex ; 
  align-items: center;
  justify-content : space-between; 
  flex-direction : column ; 
  align-items : flex-start;
  border : 1px solid lightgrey ;
  padding :  5px ;
  border-radius : 4px ;
  gap : 5px;

  input {
    width : 100%;
     border : none ; 
     outline : none;  
    height : 20px ;
    padding :10px ;
  }
  label {
    font-size : 13px;
  }

  span {
    font-size : 14px ;
    color : red ; 
  }


`




export {
    StyledForm , 
    InputElement
}