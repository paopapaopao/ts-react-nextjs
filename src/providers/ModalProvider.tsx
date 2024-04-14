'use client';

import { type ReactNode, useReducer } from 'react';
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

type Action =
  | {
      type: 'OPEN';
      payload: Payload;
    }
  | { type: 'CLOSE' };

interface Props {
  children: ReactNode;
}

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

const ModalProvider = ({ children }: Props): ReactNode => {
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

export default ModalProvider;
