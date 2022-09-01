import { useState } from 'react';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function PasswordInput(props) {
  const {
    inputlabel,
    label,
    onChange,
    size,
    value,
    variant,
    ...rest
  } = props

  const [showPassword, setShowPassword]= useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <FormControl variant={variant} size={size} className="password-field-form" {...rest}>
      <InputLabel htmlFor="outlined-adornment-password">{inputlabel}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}

export default PasswordInput
