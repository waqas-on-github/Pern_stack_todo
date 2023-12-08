import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    showTask : false 
}



export  const taskSlice = createSlice ({ 
    name :  "taskSlice" ,
    initialState ,
    reducers : {
        setTask : (state , action) => {
            state.showTask = action.payload
        }
    }
})

export const  {setTask}  = taskSlice.actions
export default taskSlice.reducer 


