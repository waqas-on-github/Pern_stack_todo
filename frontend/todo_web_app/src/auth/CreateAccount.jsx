import { useForm } from "react-hook-form"
 import  {useCreateAccount}  from "./useAccount"
import { StyledForm , InputElement } from "./authUi/FormRow";
import Spinner from "../genralui/Spinner";
import { useDispatch } from 'react-redux'
import { setCraditals  } from '../Slices/authSlice'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';







function CreateAccount() {
const dispatch = useDispatch()
 const {mutate ,isLoading,} = useCreateAccount()

 const schema = yup.object()
 .shape({
   name: yup.string().required(),
   email: yup.string().email().required(),
   password :yup.string().required().min(8)
 })
 


  const { register, handleSubmit,  formState , reset} = useForm({
     resolver: yupResolver(schema),
  });
  
  const { errors } = formState;

  const onSubmit = async (data) => {  
    
      await mutate(data ,{
        onSuccess : (userData)=> {
          reset()
          console.log("user data set to cookies" , userData?.data?.user);
          dispatch(setCraditals(userData?.data?.user))
        }
      })

  }

  if(isLoading) {
   return  <Spinner/>
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

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
    <input type="password"  className="input" id="password"  {...register("password")} />
    <span>{errors?.password?.message}</span>
    </InputElement>

      <input type="submit" />
    </StyledForm>
  
  )
}
  
export default CreateAccount