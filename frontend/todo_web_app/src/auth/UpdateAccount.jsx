/* eslint-disable react/prop-types */
import Spinner from "../genralui/Spinner";
import UpdateAccountForm from "./UpdateAccountForm";
import { useProfile } from "./useProfile";
import { useSelector } from "react-redux";

function UpdateAccount() {
  const userId = useSelector((state) => state?.auth?.userInfo?.id);

  const { data, isLoading: loading, isError, error } = useProfile(userId);

  if (loading) {
    return <Spinner />;
  }
  if (isError) {
    console.log(error);
  }


  return <UpdateAccountForm profileData={data?.data?.profile} />;
}

export default UpdateAccount;
