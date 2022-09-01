import {
  StyledSection
} from './Section.styled'

function Section(props) {
  return (
    <StyledSection {...props} className={`section ${props.className || ''}`}>
        { props.children }
    </StyledSection>
  );
}

export default Section
