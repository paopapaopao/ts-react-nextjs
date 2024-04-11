import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import AccordionProvider from './AccordionProvider';
import Content from './Content';
import Item from './Item';
import Toggle from './Toggle';

type Props = {
  children: ReactNode;
  className?: string;
};

type ToggleProps = {
  children: ReactNode;
  className?: string;
  index: number;
};

interface AccordionComponent extends FC<Props> {
  Content: FC<Props>;
  Item: FC<Props>;
  Toggle: FC<ToggleProps>;
}

const Accordion: AccordionComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const classNames: string = clsx('accordion', 'flex flex-col', className);

  return (
    <AccordionProvider>
      <div className={classNames}>{children}</div>
    </AccordionProvider>
  );
};

Accordion.Content = Content;
Accordion.Item = Item;
Accordion.Toggle = Toggle;

export default Accordion;
