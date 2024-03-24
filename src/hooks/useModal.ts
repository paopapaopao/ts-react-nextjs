'use client';

import { ReactNode, useContext } from 'react';
import { ModalContext } from '@/contexts';

type State = {
  isOpen: boolean;
  content: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
};

type Payload = {
  content: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
};

type Value = {
  state: State;
  open: (payload: Payload) => void;
  close: () => void;
};

const useModal = (): Value => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return context;
};

export default useModal;
