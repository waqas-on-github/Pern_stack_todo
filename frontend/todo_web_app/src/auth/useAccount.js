import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast    from "react-hot-toast"
import {useDispatch} from 'react-redux'
import { setCraditals , logout } from '../Slices/authSlice'


const useCreateAccount = () => {

  const dispatch = useDispatch()
 

  const { mutate, isError, isLoading } = useMutation({

    mutationFn: async (data) => {
      const resp = await axios.post("/api/v1/user/new", data);
      return resp
    },
    onSuccess : (data) => {
      console.log(data?.status);
        toast.success("account created successfully")
    },
    onError : (error) =>{
      const errorMessage = error.response?.data.message;
      const regex= /Invalid `prisma\.user\.create\(\)` invocation:[\s\S]*?Unique constraint failed on the fields: \(`email`\)/;


      if (regex.test(errorMessage)) {
         toast.error("email already registerd")
      }
      else {
           toast.error(error.response?.data.error)
      } 
      
   
      
    }
  });

  return {
    mutate,
    isError,
    isLoading,
  };
};

export { useCreateAccount };
