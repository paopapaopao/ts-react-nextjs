'use client';

import clsx from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';
import { useModal } from '@/hooks';
import styles from './Modal.module.css';

const Modal = (): ReactNode => {
  const { state, close } = useModal();

  const ref = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    const dialogRef = ref.current;

    const handleClose = () => {
      state.onClose?.();
      close();
    };

    dialogRef.addEventListener('close', handleClose);

    return () => dialogRef.removeEventListener('close', handleClose);
  }, []);

  useEffect(() => {
    if (state.isOpen && !ref.current.open) {
      state.onOpen?.();
      ref.current.showModal();
    } else if (!state.isOpen && ref.current.open) {
      ref.current.close();
    }
  }, [state.isOpen]);

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
