'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef
} from 'react';

/**
 * TODOs:
 *  - Add close button
 *  - Stop background automatic scroll when opening/closing modal
 *  - Check null!
 */

interface Props {
  children: ReactNode;
  className?: string;
}

const Dialog = ({ children, className = '' }: Props): ReactNode => {
  const ref = useRef<HTMLDialogElement>(null!);

  const { back } = useRouter();

  useEffect(() => {
    const dialogRef: HTMLDialogElement = ref.current;

    dialogRef.addEventListener('close', back);

    return (): void => {
      dialogRef.removeEventListener('close', back);
    };
  }, []);

  useEffect(() => {
    const dialogRef: HTMLDialogElement = ref.current;

    if (dialogRef !== null) {
      dialogRef.showModal();
    }
  }, [ref.current]);

  const handleClick = (event: MouseEvent): void => {
    const dialogDimensions = event.currentTarget.getBoundingClientRect();

    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      back();
    }
  };

  const classNames: string = clsx(
    'dialog',
    'p-8 flex flex-col items-center gap-4 rounded-2xl',
    className
  );

  return (
    <dialog
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          back();
        }
      }}
      ref={ref}
      className={classNames}
    >
      {children}
    </dialog>
  );
};

export default Dialog;
