import './InventoryList.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import sortIcon from '../../assets/images/icons/sort-24px.svg';
import InventoryListCard from '../InventoryListCard/InventoryListCard';

const DB_URL = process.env.REACT_APP_SERVER_URL || ``;

export default function InventoryList() {
	const [inventoryData, setInventoryData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get(`${DB_URL}/inventory`)
			.then((response) => {
				setInventoryData(response.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='wrapper'>
			<div className='header-wrapper'>
				<div className='inv-header'>Inventory</div>
				<div className='header-container'>
					<div className='search-inv'>
						<input
							className='search-inv__input'
							type='text'
							placeholder='Search...'
							onChange={(e) => {
								setSearch(e.target.value.toLowerCase());
							}}
						/>
					</div>
					<div className='inventory-container'>
						<Link to='/inventory/add'>
							<div className='inventory-btn'>+ Add New Item</div>
						</Link>
					</div>
				</div>
			</div>

			<div className='sort-inv'>
				<ul className='sort-inv__container'>
					<li>
						<div className='sort-inv__icon'>
							INVENTORY ITEM <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort-inv__category'>
						<div className='sort-inv__icon'>
							CATEGORY <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort-inv__status'>
						<div className='sort-inv__icon'>
							STATUS <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort-inv__qty'>
						<div className='sort-inv__icon'>
							QTY <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort-inv__warehouse'>
						<div className='sort-inv__icon'>
							WAREHOUSE <img src={sortIcon} alt='Chevron Right' />
						</div>
					</li>
					<li className='sort-inv__action'>ACTIONS</li>
				</ul>
			</div>
			{inventoryData
				.filter((data) => {
					return (
						data.item_name.toLowerCase().includes(search) || data.category.toLowerCase().includes(search)
					);
				})
				.map((data) => (
					<div key={data.id}>
						<InventoryListCard
							id={data.id}
							key={data.id}
							itme_name={data.item_name}
							category={data.category}
							status={data.status}
							quantity={data.quantity}
							warehouse_id={data.warehouse_id}
						/>
					</div>
				))}
		</div>
	);
}
