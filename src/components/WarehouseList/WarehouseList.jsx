import './WarehouseList.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import WarehouseItemCard from '../WarehouseItemCard/WarehouseItemCard';
import sortIcon from '../../assets/images/icons/sort-24px.svg';

const DB_URL = process.env.REACT_APP_SERVER_URL || ``;

export default function WarehouseList() {
	const [warehouseData, setWarehouseData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get(`${DB_URL}/warehouses`)
			.then((response) => {
				setWarehouseData(response.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='wrapper'>
			<div className='header-wrapper'>
				<div className='header-title'>Warehouses</div>
				<div className='header-container'>
					<div className='search'>
						<input
							className='search__input'
							type='text'
							placeholder='Search...'
							onChange={(e) => {
								setSearch(e.target.value.toLowerCase());
							}}
						/>
					</div>
					<Link to='/add' className='warehouse-container'>
						<div className='warehouse-btn'>+ Add New Warehouse</div>
					</Link>
				</div>
			</div>

			<div className='sort'>
				<ul className='sort__container'>
					<li className='sort__title'>
						<div className='sort__icon'>
							WAREHOUSE <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort__address'>
						<div className='sort__icon'>
							ADDRESS <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort__contact-name'>
						<div className='sort__icon'>
							CONTACT NAME <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort__contact-info'>
						<div className='sort__icon'>
							CONTACT INFORMATION <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li>ACTIONS</li>
				</ul>
			</div>

			{warehouseData
				.filter((data) => {
					return (
						data.warehouse_name.toLowerCase().includes(search) ||
						data.address.toLowerCase().includes(search) ||
						data.city.toLowerCase().includes(search) ||
						data.country.toLowerCase().includes(search) ||
						data.contact_name.toLowerCase().includes(search) ||
						data.contact_phone.toLowerCase().includes(search) ||
						data.contact_email.toLowerCase().includes(search)
					);
				})
				.map((data) => (
					<div key={data.id}>
						<WarehouseItemCard
							id={data.id}
							key={data.id}
							warehouse_name={data.warehouse_name}
							address={data.address}
							city={data.city}
							country={data.country}
							contact_name={data.contact_name}
							contact_phone={data.contact_phone}
							contact_email={data.contact_email}
						/>
					</div>
				))}
		</div>
	);
}
