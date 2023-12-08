'use client';

import clsx from 'clsx';
import { ReactNode, useLayoutEffect, useRef } from 'react';
import { useModalContext } from '@/contexts';
import styles from './Modal.module.css';

const Modal = (): ReactNode => {
  const { state, close } = useModalContext();

  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (state.isOpen && !ref.current?.open) {
      ref.current?.showModal();
    } else if (!state.isOpen && ref.current?.open) {
      close();
      ref.current?.close();
    }
  }, [state.isOpen]);

  useLayoutEffect(() => {
    const dialogRef = ref.current;

    const handleClose = () => {
      close();
      state.onClose();
    };

    dialogRef?.addEventListener('close', handleClose);

    return () => dialogRef?.removeEventListener('close', handleClose);
  }, [state.onClose]);

  const classNames = clsx(styles.modal, 'min-h-fit p-4 rounded-2xl');

  return (
    <dialog
      className={classNames}
      onClick={(event) => {
        const dialogDimensions = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < dialogDimensions.left ||
          event.clientX > dialogDimensions.right ||
          event.clientY < dialogDimensions.top ||
          event.clientY > dialogDimensions.bottom
        ) {
          event.currentTarget.close();
        }
      }}
      ref={ref}
    >
      {state.content}
    </dialog>
  );
};

export default Modal;
