import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const useUpdate = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.auth?.userInfo);

  const id = user?.id;
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: async (data) => {
      const resp = await axios.put(`/api/v1/user/update/${id}`, data);
      console.log(resp);
      return resp;
    },
    onSuccess: () => {
      toast.success("profile updated  successfully");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
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

export { useUpdate };
