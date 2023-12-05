'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

type State = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

type Action =
  | {
      type: 'OPEN';
      payload: {
        children: ReactNode;
        onClose: () => void;
      };
    }
  | {
      type: 'CLOSE';
    };

const initialState = {
  children: null,
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

type Value = {
  state: State;
  open: (Component: ReactNode, onClose: () => void) => void;
  close: () => void;
};

const ModalContext = createContext<Value | null>(null);

export const ModalContextProvider = ({
  children
}: {
  children: ReactNode;
}): ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const open = (Component: ReactNode, onClose: () => void): void => {
    dispatch({
      type: 'OPEN',
      payload: { children: Component, onClose }
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

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within ModalContextProvider');
  }

  return context;
};
