import { useFilter, useRealtime } from 'react-supabase';
import { BellIcon } from '@heroicons/react/outline';
import { NOTIFICATIONS_TABLE } from 'api/consts';
import Button from 'components/Button';
import { getUser } from 'utils';
import Menu from 'components/Menu';

const Notifications = (): JSX.Element => {
  const filter = useFilter((query) => query.eq('user', getUser()), []);
  const [{ data }] = useRealtime(NOTIFICATIONS_TABLE, {
    select: {
      columns: 'id,hash (hash),user',
      filter,
    },
  });

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
        {data?.map(({ id, hash }) => (
          <div key={id} className="p-3 min-w-[100px]">
            <h6 className="font-medium">Updated</h6>
            <span className="block truncate text-sm">{hash.hash}</span>
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default Notifications;
