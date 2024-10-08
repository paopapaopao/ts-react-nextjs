import clsx from 'clsx';
import React, { type FC, type ReactNode } from 'react';
import Center from './Center';
import Left from './Left';
import Right from './Right';

interface Props {
  children: ReactNode;
  className?: string;
}

interface HeaderComponent extends FC<Props> {
  Center: FC<Props>;
  Left: FC<Props>;
  Right: FC<Props>;
}

const Header: HeaderComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const classNames: string = clsx(
    'header',
    'sticky top-0 flex bg-white border-b',
    className
  );

  return <header className={classNames}>{children}</header>;
};

Header.Center = Center;
Header.Left = Left;
Header.Right = Right;

export default Header;
