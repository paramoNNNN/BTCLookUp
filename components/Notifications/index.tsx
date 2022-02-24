import { useRouter } from 'next/router';
import { useFilter, useRealtime } from 'react-supabase';
import { BellIcon } from '@heroicons/react/outline';
import { NOTIFICATIONS_TABLE } from 'api/consts';
import Button from 'components/Button';
import Menu from 'components/Menu';
import { getUser } from 'utils';

const Notifications = (): JSX.Element => {
  const { push } = useRouter();
  const filter = useFilter((query) => query.eq('user', getUser()), []);
  const [{ data, fetching }] = useRealtime(NOTIFICATIONS_TABLE, {
    select: {
      columns: 'id, hash (hash, type), user',
      filter,
    },
  });

  const handleClick = ({ hash, type }: { hash: string; type: string }) => {
    push(`/${type}/${hash}`);
  };

  return (
    <div>
      <Menu
        menuClassName="w-[240px]"
        button={
          <Button className="relative" layout="transparent">
            {data && data.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-blue-500 w-6 h-6 text-sm text-white rounded-full">
                {data?.length}
              </div>
            )}
            <BellIcon className="w-5 h-5 text-slate-900" />
          </Button>
        }
      >
        {data && data.length > 0 ? (
          data.map(({ id, hash: { hash, type } }) => (
            <button
              key={id}
              className="w-full flex flex-col items-start p-3 min-w-[100px] first:rounded-t-md last:rounded-b-md hover:bg-gray-100 transition-all duration-200"
              onClick={() => handleClick({ hash, type })}
            >
              <h6 className="font-medium">Updated</h6>
              <span className="block w-full truncate text-sm">{hash}</span>
            </button>
          ))
        ) : (
          <div className="p-3 text-gray-500 text-center">
            {fetching ? 'Loading...' : 'No notifications'}
          </div>
        )}
      </Menu>
    </div>
  );
};

export default Notifications;
