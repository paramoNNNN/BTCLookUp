import Notifications from 'components/Notifications';

const Header = (): JSX.Element => {
  return (
    <header className="container flex w-full px-8 py-4">
      <div className="flex w-full justify-end">
        <Notifications />
      </div>
    </header>
  );
};

export default Header;
