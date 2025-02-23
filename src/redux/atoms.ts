import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage('user', {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: ""
})