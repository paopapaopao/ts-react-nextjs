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
  Center: FC<Props>;
  Left: FC<Props>;
  Right: FC<Props>;
}

const Header: HeaderComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const classNames = clsx(
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
