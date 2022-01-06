// import { atom } from 'recoil'

import { atom } from "recoil";

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const modalDeleteState = atom({
  key: 'modalDeleteState',
  default: false,
})
