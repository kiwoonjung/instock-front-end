import './InventoryItemCard.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../assets/images/icons/delete_outline-24px.svg';
import EditIcon from '../../assets/images/icons/edit-24px.svg';
import ChevronRight from '../../assets/images/icons/chevron_right-24px.svg';

export default function InventoryItemCard({ id, category, name, quantity, status }) {
	const [stockStatus, setStockStatus] = useState('');

	useEffect(() => {
		if (status === 'In Stock') {
			setStockStatus(true);
		} else {
			setStockStatus(false);
		}
	}, []);

	return (
		<>
			<div className='whdInv'>
				<div className='whdInv__item'>
					<div className='whdInv__item--title'> ITEM</div>
					<Link to={`/inventory/${id}`}>
						<p href='/' className='whdItem__item--item inventory-item'>
							{name}
							<img src={ChevronRight} alt='Chevron Right' className='whdItem__icon icon' />
						</p>
					</Link>
				</div>
				<div className='whdInv__status'>
					<div className='whdInv__status--title'>Status</div>
					<div className='whdInv__status--status '>
						<p
							className={
								stockStatus
									? 'whdInv__status--text stock-status--instock'
									: 'whdInv__status--text stock-status--outstock'
							}
						>
							{status}
						</p>
					</div>
				</div>
				<div className='whdInv__category'>
					<div className='whdInv__category--title'>Category</div>
					<div className='whdInv__category--category'>{category}</div>
				</div>
				<div className='whdInv__qty'>
					<div className='whdInv__qty--title'>QTY</div>
					<div className='whdInv__qty--qty'>{quantity}</div>
				</div>
				<div className='whdInv__icons'>
					<Link to={`/inventory/${id}/delete`}>
						<img src={DeleteIcon} alt='Delete Icon' className='icon whdInv__icons--delete' />
					</Link>
					<Link to={`/inventory/${id}/edit`}>
						<img src={EditIcon} alt='Edit Icon' className='icon' />
					</Link>
				</div>
			</div>
		</>
	);
}
