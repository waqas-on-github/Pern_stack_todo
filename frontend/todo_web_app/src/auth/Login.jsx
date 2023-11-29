import { useForm } from "react-hook-form"
import { StyledForm , InputElement } from "../ui/FormRow";
import Spinner from "../genralui/Spinner";
import { useDispatch } from 'react-redux'
import { setCraditals  } from '../Slices/authSlice'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from "react-router-dom";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";




function Login() {


const navigate = useNavigate();
const dispatch = useDispatch()
const  {mutate ,isLoading  } = useLogin()
 
 const schema = yup.object()
 .shape({
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
          dispatch(setCraditals(userData?.data?.data))
          navigate("/task/new")
        }
      })

  }

  if(isLoading) {
   return  <Spinner/>
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <StyledForm onSubmit={handleSubmit(onSubmit )}>
    <h2> Login </h2>
    
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

      <button className="btn" type="submit" > Login  </button>

      <span className="redirect" > Don’t have an account? <NavLink className='nvlink' to ="/auth/signup">Sign up</NavLink> </span>
    </StyledForm>
  
  )
}
  
export default Login