import { StyledTitle } from './Title.styled'

function Title(props) {
  const {
    children,
    size,
    weight,
    align,
    ...rest
  } = props
  return (
    <StyledTitle 
      size = {size}
      weight={weight}
      align = {align}
      className={'title'}
      {...rest}
    >
      { children }
    </StyledTitle>
  );
}
export default Title;
