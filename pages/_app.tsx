import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store/index'
import { useEffect } from 'react';
import { setUser, User } from '@/store/slices/user.slice';
import { useDispatch } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
	const user: User = {
		name: 'sereg',
		id: 45,
		email: 'email@email.com',
		avatar:
			'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3.jpg',
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setUser(user));
	}, []);
  return <Component {...pageProps} />
}
export default wrapper.withRedux(MyApp); 
