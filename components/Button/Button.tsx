import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

type Props = ComponentProps<'button'> & {
  isLoading?: boolean;
};

/**
 * TODOs:
 *  - Add spinner when isLoading is true
 */

const Button = ({ isLoading = false, ...rest }: Props): ReactNode => {
  const { children, className, disabled, ...restProps } = rest;

  const styleClassNames =
    'px-4 py-2 bg-green-600 rounded-lg text-white font-bold hover:bg-green-700 active:shadow-lg active:shadow-green-900 focus:outline-black disabled:opacity-50 disabled:pointer-events-none';
  const classNames = clsx('button', styleClassNames, className);

  return (
    <button
      className={classNames}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
