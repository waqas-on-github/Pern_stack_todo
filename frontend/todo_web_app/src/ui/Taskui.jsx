import styled  from "styled-components"

const StyledContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;

    
    .items{
    width : 150px;
    text-align : center;

 }

.data {
    display : flex;
    justify-content : space-around;
    margin-top : 15px;
    margin-bottom : 15px;
    width : 100%;
.btndone {
    background-color : green;
}
.btn {
    width :  20px;
    height : 20px;
}
.arrangebtns{
    display : flex ;
    align-items : center;
    justify-content : center;
    gap : 10px;
}

}


.uicontainer {
    width : 80%;
    margin-top : 15px;
    margin-bottom : 15px;


}

`


const StyledHeading = styled.div ` 
    display : flex;
    justify-content : space-around;
    border-bottom : 1px solid lightgray;
    margin-top : 15px;
    margin-bottom : 15px;
    width : 100%;

.items{
    width : 150px;
    text-align : center;

 }



`


export {StyledContainer , StyledHeading }