import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = ({ children, modal }: Props): ReactNode => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
