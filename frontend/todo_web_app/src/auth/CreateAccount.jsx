import { useForm } from "react-hook-form"
 import  {useCreateAccount}  from "./useAccount"
import { StyledForm , InputElement } from "./authUi/FormRow";
import Spinner from "../genralui/Spinner";





function CreateAccount() {

 const {mutate ,isLoading,} = useCreateAccount()




  const { register, handleSubmit,  formState,   watch} = useForm({
    // resolver: yupResolver(schema),
  });
  
  const { errors } = formState;

  const onSubmit = async (data) => {  
    
      await mutate(data)

  }

  if(isLoading) {
   return  <Spinner/>
  }

  console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <StyledForm onSubmit={handleSubmit(onSubmit )}>
    <h2>Create Account </h2>
    
    <InputElement>
    <label htmlFor="name">Name :</label>
    <input className="input" type="text" id="name"  {...register("name")} />
    <span>{errors?.name?.message}</span>
    </InputElement>
                 
    <InputElement>
    <label htmlFor="email">email :</label>
    <input className="input" type="text" id="email"  {...register("email")} />
    <span>{errors?.email?.message}</span>
    </InputElement>

    <InputElement>
    <label htmlFor="password">password :</label>
    <input type="text"  className="input" id="password"  {...register("password")} />
    <span>{errors?.password?.message}</span>
    </InputElement>

      <input type="submit" />
    </StyledForm>
    </>
  )
}
  
export default CreateAccount