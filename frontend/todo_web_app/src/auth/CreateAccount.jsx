/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
 import  {useCreateAccount}  from "./useAccount"
import { StyledForm , InputElement } from "../ui/FormRow";
import Spinner from "../genralui/Spinner";
import { useDispatch  } from 'react-redux'
import { setCraditals  } from '../Slices/authSlice'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from "react-router-dom";



function CreateAccount() {
  
const dispatch = useDispatch()
const {mutate ,isLoading} = useCreateAccount()




 
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

  const onSubmit =  (data) => {  

       mutate(data ,{
        onSuccess : (userData)=> {
          reset()
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
    <h2>  Sign up </h2>
    
    <InputElement>
    
    <label htmlFor="name">Name</label>
    <input className="input" type="text" id="name" placeholder="enter your name" {...register("name")} />
    <span>{errors?.name?.message}</span>
    </InputElement>
                 
    <InputElement>
    <label htmlFor="email">email</label>
    <input className="input" type="text" id="email" placeholder="enter your email" {...register("email")} />
    <span>{errors?.email?.message}</span>
    </InputElement>

    
    <InputElement>
    <label htmlFor="password">password</label>
    <input type="password"  className="input" id="password"  placeholder="enter your password" {...register("password")} />
    <span>{errors?.password?.message}</span>
    </InputElement>
     
      <button className="btn" type="submit" >   Sign up With Email </button>


      <span className="redirect" >Already signed up? <NavLink className='nvlink' to ="/auth/login">Go to login</NavLink> </span>
       
    </StyledForm>
  
  )
}
  
export default CreateAccount