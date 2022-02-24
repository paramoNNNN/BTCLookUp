import { Fragment, ReactNode } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import classNames from 'classnames';

type Props = {
  className?: string;
  menuClassName?: string;
  button: ReactNode;
  children?: ReactNode;
};

const Menu = ({ className, menuClassName, button, children }: Props) => {
  return (
    <div className={classNames('relative w-full', className)}>
      <HeadlessMenu as="div" className="relative w-full inline-block text-left">
        <HeadlessMenu.Button>{button}</HeadlessMenu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <HeadlessMenu.Items
            className={classNames(
              'absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              menuClassName
            )}
          >
            {children}
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    </div>
  );
};

export default Menu;
