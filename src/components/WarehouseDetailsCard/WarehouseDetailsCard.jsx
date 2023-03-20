import './WarehouseDetailsCard.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackIcon from '../../assets/images/icons/arrow_back-24px.svg';
import EditIconInvert from '../../assets/images/icons/edit-24px-inverted.svg';
import InventoryItemCard from '../InventoryItemCard/InventoryItemCard';
import SortIcon from '../../assets/images/icons/sort-24px.svg';

const DB_URL = process.env.REACT_APP_SERVER_URL || ``;

export default function WarehouseDetailsCard() {
	const [warehouseData, setWarehouseData] = useState([]);
	const [warehouseInventory, setWarehouseInventory] = useState([]);
	const { warehouse_id } = useParams();

	useEffect(() => {
		axios
			.get(`${DB_URL}/warehouses/${warehouse_id}`)
			.then((response) => {
				setWarehouseData(response.data[0]);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get(`${DB_URL}/warehouses/${warehouse_id}/inventory`)
			.then((response) => {
				setWarehouseInventory(response.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<div className='whd'>
				<div className='whdHeader'>
					<div className='whdHeader__header'>
						<div className='whdHeader__back'>
							<Link to={'/'}>
								<img src={BackIcon} alt='back arrow' className='whdHeader__back--icon' />
							</Link>
						</div>
						<div className='whdHeader__warehouse'>{warehouseData.warehouse_name}</div>
						<Link to={`/${warehouse_id}/edit`}>
							<p className='whdHeader__icon'>
								<img src={EditIconInvert} alt='Edit Icon' className='whdHeader__icon--icon' />
							</p>
						</Link>
						<Link to={`/${warehouse_id}/edit`}>
							<p href='' className='whdHeader__button button--primary'>
								<img src={EditIconInvert} alt='Edit Icon' className='whdHeader__icon--tablet' />
								<p className='whdHeader__button--text'>Edit</p>
							</p>
						</Link>
					</div>

					<div className='whdDetails'>
						<div className='whdDetails__top'>
							<div className='whdDetails__addressTitle'>Warehouse Address:</div>
							<div className='whdDetails__address'>
								{warehouseData.address}, {warehouseData.city}, {warehouseData.country}
							</div>
						</div>
						<div className='whdDetails__bottom'>
							<div className='whdDetails__left'>
								<div className='whdDetails__contactName'>Contact Name:</div>
								<div className='whdDetails__name'>{warehouseData.contact_name}</div>
								<div className='whdDetails__role'>{warehouseData.contact_position}</div>
							</div>
							<div className='whdDetails__right'>
								<div className='whdDetails__contactTitle'>Contact Information:</div>
								<div className='whdDetails__phone'>{warehouseData.contact_phone}</div>
								<div className='whdDetails__email'>{warehouseData.contact_email}</div>
							</div>
						</div>
					</div>
					<div className='whdTable'>
						<div className='whdTable__item'>
							Inventory Item
							<img src={SortIcon} alt='Sort Icon' className='whdInv__sort' />
						</div>
						<div className='whdTable__cat'>
							Category
							<img src={SortIcon} alt='Sort Icon' className='whdInv__sort' />
						</div>
						<div className='whdTable__status'>
							Status
							<img src={SortIcon} alt='Sort Icon' className='whdInv__sort' />
						</div>
						<div className='whdTable__qty'>
							Quantity
							<img src={SortIcon} alt='Sort Icon' className='whdInv__sort' />
						</div>
						<div className='whdTable__actions'>Actions</div>
					</div>

					{warehouseInventory.map((item) => (
						<InventoryItemCard
							id={item.id}
							key={item.id}
							category={item.category}
							name={item.item_name}
							quantity={item.quantity}
							status={item.status}
						/>
					))}
				</div>
			</div>
		</>
	);
}
