'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

/**
 * TODOs:
 *  1. Check if onClose should be optional
 *  2. Add onOpen
 */

type State = {
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

type Payload = {
  content: ReactNode;
  onClose: () => void;
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
  content: null,
  isOpen: false,
  onClose: () => {}
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN':
      return {
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

export const ModalContextProvider = ({ children }: Props): ReactNode => {
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

export const useModalContext = (): Value => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within ModalContextProvider');
  }

  return context;
};
