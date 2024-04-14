import { type ReactNode, createContext } from 'react';

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

const ModalContext = createContext<Value | null>(null);

export default ModalContext;
