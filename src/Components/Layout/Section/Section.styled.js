import styled from 'styled-components'

const StyledSection = styled.div`
  align-items: ${props => props.centered ? 'center' : 'none'};
  display: flex;
  gap: ${ props => props.gap ? props.gap : 0 };
  flex-direction: ${ props => props.column ? 'column' : 'row' };
  flex: ${ props => props.flex ? props.flex: 1};
  flex-wrap: wrap;
  justify-content: ${props => props.centered ? 'center' : 'flex-start'};
  padding-bottom: ${props => props.bottom ? props.bottom : 0};
  padding-top: ${props => props.top ? props.top : 0};
`

export {
  StyledSection,
}
