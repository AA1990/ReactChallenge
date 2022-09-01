import { useState } from 'react';
import {
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom'
import {
  FormBox,
  FormFields,
  RegisterPage,
} from './Register.styled'
import {
  PasswordInput,
  Section,
  Text,
  Title,
} from 'Components'
import {
  logo,
} from 'Assets/images'
import {
  signup,
} from 'API/authentication'

import { useNavigate } from 'react-router-dom';

function Register() {
  const navigation = useNavigate()
  const [email, setEmail]= useState()
  const [password, setPassword]= useState()
  
  function changeEmail(event){
    setEmail(event.target.value)
  }
  function changePassword(event){
    setPassword(event.target.value)
  }

  const register = async () => {
    const result = await signup(email, password)
    if (result.statusCode === 201){
      alert('Registered, Now please log in!')
      navigation("/login")
    }else{
      alert('Please try again later!')
    }
  }

  return (
    <RegisterPage column>

      {/* Logo */}
      <img src={logo} alt='logo' className='logo'/>
      
      {/* FormBox */}
      <FormBox elevation={3}>

        {/* FormBox - Title*/}
        <Title size='m'>Sign-up</Title>

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
        <Button variant="contained" className='submit-btn' onClick={register}>
          Sign up
        </Button>

        {/* FormBox - Register */}
        <Section gap={'10px'} centered>
          <Text>¿Already have an account?</Text>
          <Link to="/login">Sign in</Link>
        </Section>

      </FormBox>

    </RegisterPage>
  );
}

export default Register;
