import styled from "styled-components"



 const StyledForm  = styled.form`
 width : 100%;
 display : flex;
 flex-direction :column;
 gap : 10px;
 padding : 10px ;
 color : grey;
 input {
    width : 100%;
    border : none ;
    outline :none;
    height :30px ;

 }
.secnodRow{
    display: flex;
 justify-content : space-between;
 align-items : center ;
}
.lastRow {
 display: flex;
 justify-content : space-between;
 align-items : center ;

}
`

const StyledContainer = styled.div `
    width : 50%;
    border : 1px solid #16161620 ;
    border-radius : 10px ;

`



export {
    StyledForm , 
    StyledContainer
}