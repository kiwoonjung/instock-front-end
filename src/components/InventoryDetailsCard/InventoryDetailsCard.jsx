import './InventoryDetailsCard.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackIcon from '../../assets/images/icons/arrow_back-24px.svg';
import EditIconInvert from '../../assets/images/icons/edit-24px-inverted.svg';

const DB_URL = process.env.REACT_APP_SERVER_URL || ``;

export default function InventoryDetailsCard() {
	const [inventoryData, setInventoryData] = useState([]);
	const [stockStatus, setStockStatus] = useState('');
	const [warehouseData, setWarehouseData] = useState([]);
	const { inventory_id } = useParams();

	useEffect(() => {
		axios
			.get(`${DB_URL}/inventory/${inventory_id}`)
			.then((response) => {
				setInventoryData(response.data[0]);
			})
			.catch((err) => console.log(err));
	}, [inventory_id]);

	useEffect(() => {
		if (inventoryData.status === 'In Stock') {
			setStockStatus(true);
		} else {
			setStockStatus(false);
		}
	}, [inventoryData]);

	useEffect(() => {
		axios
			.get(`${DB_URL}/warehouses/${inventoryData.warehouse_id}`)
			.then((response) => {
				setWarehouseData(response.data[0].warehouse_name);
			})
			.catch((err) => console.log(err));
	}, [inventoryData]);

	return (
		<>
			<div className='whi'>
				<div className='whiHeader'>
					<div className='whiHeader__header'>
						<div className='whiHeader__back'>
							<Link to={`/inventory`}>
								<img src={BackIcon} alt='back arrow' className='whiHeader__back--icon' />
							</Link>
						</div>
						<div className='whiHeader__item'>Inventory Item</div>
						<Link to={`/inventory/${inventory_id}/edit`}>
							<p className='whiHeader__icon'>
								<img src={EditIconInvert} alt='Edit Icon' className='whiHeader__icon--icon' />
							</p>
						</Link>
						<Link to={`/inventory/${inventory_id}/edit`}>
							<p href='' className='whiHeader__button button--primary'>
								<img src={EditIconInvert} alt='Edit Icon' className='whiHeader__icon--tablet' />
								<p className='whiHeader__button--text'>Edit</p>
							</p>
						</Link>
					</div>
				</div>

				<div className='whiDetails'>
					<div className='whiDetails__left'>
						<div className='whiDetails__top'>
							<div className='whiDetails__desc'>Item Description:</div>
							<div className='whiDetails__desc--desc'>{inventoryData.description}</div>
						</div>
						<div className='whiDetails__mid'>
							<div className='whiDetails__cat'>Category:</div>
							<div className='whiDetails__cat--cat'>{inventoryData.category}</div>
						</div>
					</div>
					<div className='whiDetails__right'>
						<div className='whiDetails__split'>
							<div className='whiDetails__split--l'>
								<div className='whiDetails__status'>Status:</div>
								<div className='whiDetails__status--status'>
									<p
										className={
											stockStatus
												? 'whdInv__status--text stock-status--instock'
												: 'whdInv__status--text stock-status--outstock'
										}
									>
										{inventoryData.status}
									</p>
								</div>
							</div>
							<div className='whiDetails__split--r'>
								<div className='whiDetails__qty'>Quantity:</div>
								<div className='whiDetails__qty--qty'>{inventoryData.quantity}</div>
							</div>
						</div>
						<div className='whiDetails__bottom'>
							<div className='whiDetails__warehouse'>Warehouse:</div>
							<div className='whiDetails__warehouse--warehouse'>{warehouseData}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
