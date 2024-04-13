import { ReactNode } from 'react';
import CollapseToggle from '../Collapse/Toggle';
import useAccordion from './useAccordion';

interface Props {
  children: ReactNode;
  className?: string;
  index: number;
}

const Toggle = ({ children, className = '', index }: Props): ReactNode => {
  const { toggledItemIndex, setToggledItemIndex } = useAccordion();

  const handleClick = (): void => {
    setToggledItemIndex(
      toggledItemIndex < 0 || toggledItemIndex !== index ? index : -1
    );
  };

  return (
    <CollapseToggle
      isToggled={toggledItemIndex === index}
      onClick={handleClick}
      className={className}
    >
      {children}
    </CollapseToggle>
  );
};

export default Toggle;
