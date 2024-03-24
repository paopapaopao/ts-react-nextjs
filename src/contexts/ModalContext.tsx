'use client';

import { ReactNode, createContext, useContext, useReducer } from 'react';

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

type Action =
  | {
      type: 'OPEN';
      payload: Payload;
    }
  | { type: 'CLOSE' };

type Value = {
  state: State;
  open: (payload: Payload) => void;
  close: () => void;
};

type Props = {
  children: ReactNode;
};

const initialState = {
  isOpen: false,
  content: null,
  onOpen: () => {},
  onClose: () => {}
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        isOpen: true,
        ...action.payload
      };
    case 'CLOSE':
      return initialState;
    default:
      return state;
  }
};

const ModalContext = createContext<Value | null>(null);

const ModalContextProvider = ({ children }: Props): ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const open = (payload: Payload): void => {
    dispatch({
      type: 'OPEN',
      payload
    });
  };

  const close = (): void => {
    dispatch({ type: 'CLOSE' });
  };

  return (
    <ModalContext.Provider
      value={{
        state,
        open,
        close
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = (): Value => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within ModalContextProvider');
  }

  return context;
};

export { ModalContextProvider, useModalContext };
