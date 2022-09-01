import { StyledText } from './Text.styled'

function Text(props) {
  const {
    children,
    size,
    ...rest
  } = props
  return (
    <StyledText     
      className='text'
      size={size}
      {...rest}
    >
      { children }
    </StyledText>
  );
}

export default Text;
