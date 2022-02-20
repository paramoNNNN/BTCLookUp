import type { NextPage } from 'next';
import MainLayout from 'layout/MainLayout';
import Search from 'features/Search';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Search />
    </MainLayout>
  );
};

export default Home;
