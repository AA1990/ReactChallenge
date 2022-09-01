import {
  StyledPage,
} from './Page.styled'

function Page(props) {
  return (
    <StyledPage className='page' {...props}>
      { props.children }
    </StyledPage>
  );
}

export default Page
