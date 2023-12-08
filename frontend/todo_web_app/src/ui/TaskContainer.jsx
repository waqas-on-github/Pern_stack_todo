import styled from "styled-components";

const SideBar = styled.div`
  width: 15%;
  height: 100vh;
  background-color :#ffe6e679;

  .usercontainer {
      display : flex;
      gap : 5px;
      padding :5px;
      
      p{
        font-weight : bolder ;
    }
    &:hover {
        background-color :  #ffdede

    }


    span {
        font-size : 13px 
    }
}

// menue list css starts here 

.menu-list {
   
    padding-top : 20px;

    h4 {
        padding :5px ;
        display :flex ;
        align-items : center;
        gap : 5px;
       
        &:hover {
        background-color :  #ffdede;
        padding :5px ;

        }
    }
}
 
.sidecontainer{
    padding-left :10px;
    padding-top :5px
}


`;








const Main = styled.div`
  width: 85%;
  height: 100vh;
  padding :15px;
  display : flex;
  flex-direction : column;
  align-items : center;
  padding-top :100px;
  display : flex ;
  align-items :center ; 
  
  
  
  .addtask {
      width : 50%;
      display :flex ;
      align-items :center;
      gap : 5px;
      cursor :pointer;
      &:hover {
        color :orangered;
      }
      span {
        font-size :16px;
        color : grey;
        &:hover {
            color : orangered
        }
      }

  }


`;



const Container = styled.div`
  display :flex;
  
`;




export {
    SideBar ,
    Main ,
    Container
}