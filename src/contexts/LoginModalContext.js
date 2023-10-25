import React, { createContext, useContext, useState } from 'react'

const openLoginModalContext = createContext()

export function useLoginModal() {
  return useContext(openLoginModalContext)
}

export function LoginModalProvider({ children }) {
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const value = {
    openLoginModal,
    closeModal: () => {
      setOpenLoginModal(false)
    },
    openModal: () => {
      setOpenLoginModal(true)
    },
  }

  return (
    <openLoginModalContext.Provider value={value}>
      {children}
    </openLoginModalContext.Provider>
  )
}
