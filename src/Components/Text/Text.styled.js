import styled from 'styled-components'

const getFontSize = (option) => {
  switch (option) {
    case 'xs':
      return '12px'
    case 's':
      return '14px'
    case 'm':
      return '16px'
    case 'l':
      return '18px'
    case 'xl':
      return '20px'
    default:
      return '16px'
  }
}

const StyledText = styled.div`
  cursor: default;
  font-size: ${ props => getFontSize(props.size)};
  line-height: 150%;
`

export {
  StyledText,
}
