import { createContext } from 'react'
import { UserInitialState } from './defaults'

const UserContext = {
  Context: createContext(),
  InitialState: UserInitialState
}

export default UserContext
