import './InventoryListCard.scss';
import deleteIcon from '../../assets/images/icons/delete_outline-24px.svg';
import editIcon from '../../assets/images/icons/edit-24px.svg';
import ChevronRight from '../../assets/images/icons/chevron_right-24px.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DB_URL = process.env.REACT_APP_SERVER_URL || ``;

export default function InventoryListCard(props) {
	const [warehousename, setWarehousename] = useState([]);

	useEffect(() => {
		axios
			.get(`${DB_URL}/warehouses/${props.warehouse_id}`)
			.then((response) => {
				setWarehousename(response.data.map((el) => el.warehouse_name)[0]);
			})
			.catch((err) => console.log(err));
	}, [props.warehouse_id, warehousename]);

	return (
		<div>
			<ul className='tablet-inv'>
				<li className='tablet-inv__title'>
					<Link to={`${props.id}`}>
						<div className='tablet-inv__icon'>
							<div className='tablet__hover'>{props.itme_name}</div>
							<img src={ChevronRight} alt='Chevron Right' />
						</div>
					</Link>
				</li>
				<li className='tablet-inv__category'>{props.category}</li>
				<li className='tablet-inv__stock-box'>
					<div className={props.status === 'In Stock' ? 'tablet-inv__stock-bg' : 'tablet-inv__outofstock-bg'}>
						<div className='tablet-inv__stock'>{props.status}</div>
					</div>
				</li>
				<li className='tablet-inv__qty'>{props.quantity}</li>
				<li className='tablet-inv__warehouse'>{warehousename}</li>
				<li className='tablet-inv__btn-box'>
					<Link to={`/inventory/${props.id}/delete`}>
						<div className='tablet-inv__btn'>
							<img src={deleteIcon} alt='delete_outline-24px.svg' />
						</div>
					</Link>

					<Link to={`/inventory/${props.id}/edit`}>
						<div className='tablet-inv__btn'>
							<img src={editIcon} alt='edit-24px.svg' />
						</div>
					</Link>
				</li>
			</ul>

			<div className='container'>
				<div className='container__first'>
					<ul>
						<li className='container__title'>INVENTORY ITEM</li>
						<li className='container__info-warehouse'>
							<Link to={`${props.id}`}>
								<div className='container__info-icon'>
									{props.itme_name}
									<img src={ChevronRight} alt='Chevron Right' />
								</div>
							</Link>
						</li>
					</ul>

					<ul>
						<li className='container__title'>CATEGORY</li>
						<li className='container__info-category'>{props.category}</li>
						<li className='container__delete'>
							<Link to={`/inventory/${props.id}/delete`}>
								<div className='btn__delete'>
									<img src={deleteIcon} alt='delete_outline-24px.svg' />
								</div>
							</Link>
						</li>
					</ul>
				</div>

				<div className='container__second'>
					<ul>
						<li className='container__title'>STATUS</li>
						<li className='container__stock-box'>
							<div
								className={
									props.status === 'In Stock' ? 'container__stock-bg' : 'container__outofstock-bg'
								}
							>
								<div className='container__stock'>{props.status}</div>
							</div>
						</li>
					</ul>

					<ul>
						<li className='container__title'>QTY</li>
						<li className='container__qty'>{props.quantity}</li>
					</ul>
					<ul>
						<li className='container__title'>WAREHOUSE</li>
						<li className='container__info-name'>{warehousename}</li>

						<li className='container__edit'>
							<Link to={`/inventory/${props.id}/edit`}>
								<div className='btn__edit'>
									<img src={editIcon} alt='edit-24px.svg' />
								</div>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
