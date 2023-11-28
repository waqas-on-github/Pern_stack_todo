import styled from "styled-components"

export  const StyledNav = styled.nav`


display : flex ;
justify-content:space-between ;
align-items : center;
padding : 10px 50px ;
height :80px;
h1{
    color :orangered;
    font-size:25px;
    font-weight : bold;

}
.btn-parent {
    display : flex ;
    gap : 10px ;
    justify-content : center ;
    align-items : center;
}



.login {
    background-color : inherit;
    border :  none ;
    outline : none;
    font-size : 15px;
    padding :10px;
    &:hover {
        background-color : #e4e3e3;
    }

 
}

.register{
    color : white;
    font-size : 15px;
    background-color : orangered;
    outline : none;
    border : none;
    padding : 10px ; 
    border-radius :10px ;

    &:hover {
        background-color : lightsalmon
    }
}

`;

