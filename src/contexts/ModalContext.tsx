import { ReactNode, createContext } from 'react';

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

const ModalContext = createContext<Value | null>(null);

export default ModalContext;
