import { type ReactNode, useContext } from 'react';
import { ModalContext } from '@/contexts';

interface State {
  isOpen: boolean;
  content: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

interface Payload {
  content: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

interface Value {
  state: State;
  open: (payload: Payload) => void;
  close: () => void;
}

const useModal = (): Value => {
  const context = useContext<Value | null>(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return context;
};

export default useModal;
