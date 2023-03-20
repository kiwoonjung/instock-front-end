import './Header.scss';
import logo from '../../../src/assets/images/logo/InStock-Logo_1x.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
	const [invPage, setInvPage] = useState(false);
	let path = window.location.pathname;
	useEffect(() => {
		if (path.includes(`/inventory`)) {
			setInvPage(true);
		} else {
			setInvPage(false);
		}
	}, [path]);

	return (
		<div className='header'>
			<Link to='/'>
				{' '}
				<div className='header__wrap-logo'>
					<img className='header__logo' src={logo} alt='' />
				</div>{' '}
			</Link>
			<div className='header__wrap-nav'>
				<Link to='/'>
					<button className={invPage ? 'header__nav-item2 ' : 'header__nav-item1 header__nav-item1--active '}>
						Warehouses
					</button>
				</Link>
				<Link to='/inventory'>
					<button className={invPage ? 'header__nav-item1 header__nav-item1--active' : 'header__nav-item2 '}>
						Inventory
					</button>
				</Link>
			</div>
		</div>
	);
}
