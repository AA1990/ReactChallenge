import styled from 'styled-components'
import { styleConstants } from 'Config'


const getSize = (option) => {
  switch (option) {
    case 'xs':
      return '20px'
    case 's':
      return '24px'
    case 'm':
      return '32px'
    case 'l':
      return '40px'
    case 'xl':
      return '72px'
    default:
      return '24px'
  }
}

const StyledTitle= styled.div`
  color: ${styleConstants.colors.greyscale800};
  font-weight: ${ props => props.weight || 'none'};
  font-size: ${ props => getSize(props.size) };
  line-height: 50px;
  margin: 0;
  text-align: ${ props => props.align };
`

export {
  StyledTitle,
}
