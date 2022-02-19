import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
	return (
		<main className="grid place-items-center">
			<div className="container">{children}</div>
		</main>
	);
};

export default MainLayout;
