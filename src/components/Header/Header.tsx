import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import Center from './Center';
import Left from './Left';
import Right from './Right';

type Props = {
  children: ReactNode;
  className?: string;
};

interface HeaderComponent extends FC<Props> {
  Left: FC<Props>;
  Center: FC<Props>;
  Right: FC<Props>;
}

const Header: HeaderComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const styleClassNames = 'sticky top-0 flex bg-white border-b';
  const classNames = clsx('header', styleClassNames, className);

  return <header className={classNames}>{children}</header>;
};

Header.Left = Left;
Header.Center = Center;
Header.Right = Right;

export default Header;
