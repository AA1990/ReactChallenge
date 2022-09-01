import { useState, useContext } from 'react';
import {
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom'
import {
  FormBox,
  FormFields,
  LoginPage,
} from './Login.styled'
import {
  PasswordInput,
  Section,
  Text,
  Title,
} from 'Components'
import { UserContext } from 'Context'
import {
  logo,
} from 'Assets/images'
import {
  login as loginRequest,
} from 'API/authentication'
import { useNavigate } from 'react-router-dom';

function Login() {
  const { userContext, setUserContext } = useContext(UserContext.Context);
  const navigation = useNavigate();
  const [email, setEmail]= useState()
  const [password, setPassword]= useState()
  
  function changeEmail(event){
    setEmail(event.target.value)
  }
  function changePassword(event){
    setPassword(event.target.value)
  }

  const login = async () => {
    // if (email === "demo@goodship.com") {
    //   setUserContext({
    //     isAuthenticated: true,
    //     email: "demo@goodship.com",
    //     id: "92",
    //     role: "manager",
    //   })
    // } else {
      const result = await loginRequest(email, password)
      if (result.statusCode === 400){
        alert('Invalid username or password!')
      }else if (result.statusCode === 200){
        setUserContext({
          isAuthenticated: true,
          email: result.data.email,
          role: (result.data.groups?.length > 0) ? "manager" : "user",
          id: result.data.id,
        })
        navigation("/bikes")
      }else{
        alert('Please try again later!')
      }
    // }
  }

  return (
    <LoginPage column>

      {/* Logo */}
      <img src={logo} alt='logo' className='logo'/>
      
      {/* FormBox */}
      <FormBox elevation={3}>

        {/* FormBox - Title*/}
        <Title size='m'>Login</Title>

        <FormFields column>
          {/* FormBox - Fields - Email */}
          <TextField
            className='text-field'
            label="Email"
            variant="outlined"
            value={email} 
            onChange={changeEmail}
            size="small"
          />

          {/* FormBox - Fields - Password */}
          <PasswordInput
            className='text-field'
            variant="outlined"
            size='small'
            inputlabel="Password"
            label="Password"
            value={password}
            onChange={changePassword}
          />
        </FormFields>

        {/* FormBox - Submit */}
        <Button variant="contained" className='submit-btn' onClick={login}>
          Log in
        </Button>

        {/* FormBox - Register */}
        <Section gap={'10px'} centered>
          <Text>¿No account?</Text>
          <Link to="/register">Sign up</Link>
        </Section>

      </FormBox>

    </LoginPage>
  );
}

export default Login;
