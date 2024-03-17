import clsx from 'clsx';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

interface HeaderComponent extends FC<Props> {
  Left: FC<Props>;
  Center: FC<Props>;
  Right: FC<Props>;
}

const Left = ({ children, className = '' }: Props): ReactNode => {
  const classNames = clsx('left', className);

  return <div className={classNames}>{children}</div>;
};

const Center = ({ children, className = '' }: Props): ReactNode => {
  const styleClassNames = 'flex-1 flex justify-center';
  const classNames = clsx('center', styleClassNames, className);

  return <div className={classNames}>{children}</div>;
};

const Right = ({ children, className = '' }: Props): ReactNode => {
  const classNames = clsx('right', className);

  return <div className={classNames}>{children}</div>;
};

const Header: HeaderComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const styleClassNames = 'flex';
  const classNames = clsx('header', styleClassNames, className);

  return <header className={classNames}>{children}</header>;
};

Header.Left = Left;
Header.Center = Center;
Header.Right = Right;

export default Header;
