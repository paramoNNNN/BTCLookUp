import type { NextPage } from 'next';
import Input from '../components/Inputs/InputField';
import MainLayout from '../layout/MainLayout';

const Home: NextPage = () => {
	return (
		<MainLayout>
			<div className="flex justify-center h-screen p-10 py-20">
				<div className="w-full max-w-lg">
					<Input placeholder="Address or Transaction hash" />
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;
