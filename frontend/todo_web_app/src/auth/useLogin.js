import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


const useLogin = () => {
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: async (data) => {
      const resp = await axios.post("/api/v1/user/login", data);
      return resp;
    },
    onSuccess: () => {
      toast.success("logged in sucessfully");
      
    },
    onError: (error) => {
      toast.error(error.response?.data.error);
    },
  });

  return {
    mutate,
    isError,
    isLoading,
  };
};

export { useLogin };
