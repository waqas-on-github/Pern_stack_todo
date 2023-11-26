import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast    from "react-hot-toast"

const useCreateAccount = () => {
  const { mutate, isError, isLoading } = useMutation({

    mutationFn: async (data) => {
      return await axios.post("/api/v1/user/new", data);

    },
    onSuccess : () => {
        toast.success("account created successfully")
    },
    onError : (error) =>{
        toast.error(error.message)
    }
  });

  return {
    mutate,
    isError,
    isLoading,
  };
};

export { useCreateAccount };
