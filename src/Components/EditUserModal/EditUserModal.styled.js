import styled from 'styled-components'
import { styleConstants } from 'Config'

const StyledEditUserModal = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ModalBody = styled.div`
  background-color: ${styleConstants.colors.greyscale300};
  border-radius: 4px;
  padding: 20px 40px;
  text-align: center;
  .pickers-section {
    gap: 10px;
    margin-top: 8px;
    margin-bottom: 20px;
  }
  .submit-btns {
    gap: 10px;
    margin-bottom: 20px;
  }
`

export {
  ModalBody,
  StyledEditUserModal,
}
