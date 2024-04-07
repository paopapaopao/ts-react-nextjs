import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: Props): ReactNode => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
