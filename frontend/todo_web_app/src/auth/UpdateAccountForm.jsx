/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { StyledForm, InputElement } from "../ui/FormRow";
import { useUpdate } from "./useUpdate";

const UpdateAccountForm = ({profileData}) => {
  const { mutate } = useUpdate();   

  const { register, handleSubmit, formState } = useForm({
     defaultValues : profileData  });
  const { errors } = formState;

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <h2> Update Your Account </h2>

      <InputElement>
        <label htmlFor="name">Name</label>
        <input
          className="input"
          type="text"
          id="name"
          placeholder="enter your name"
          {...register("name")}
        />
        <span>{errors?.name?.message}</span>
      </InputElement>

      <InputElement>
        <label htmlFor="email">email</label>
        <input
          className="input"
          type="text"
          id="email"
          placeholder="enter your email"
          {...register("email")}
        />
        <span>{errors?.email?.message}</span>
      </InputElement>

      <button className="btn" type="submit">
        {" "}
        Update{" "}
      </button>
    </StyledForm>
  );
};

export default UpdateAccountForm;
