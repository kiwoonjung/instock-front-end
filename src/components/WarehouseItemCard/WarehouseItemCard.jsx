import './WarehouseItemCard.scss';
import deleteIcon from '../../assets/images/icons/delete_outline-24px.svg';
import editIcon from '../../assets/images/icons/edit-24px.svg';
import ChevronRight from '../../assets/images/icons/chevron_right-24px.svg';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const DB_URL = process.env.REACT_APP_SERVER_URL || ``;

export default function WarehouseListCard(props) {
	const { warehouse_id } = useParams();

	useEffect(() => {
		axios
			.get(`${DB_URL}/warehouses/${warehouse_id}`)
			.then(() => {})
			.catch((err) => console.log(err));
	}, [warehouse_id]);

	return (
		<div>
			<ul className='tablet'>
				<li className='tablet__title'>
					<Link to={`/${props.id}`}>
						<div className='tablet__icon'>
							<div className='tablet__hover'>{props.warehouse_name}</div>
							<img src={ChevronRight} alt='Chevron Right' />
						</div>
					</Link>
				</li>
				<li className='tablet__address'>
					{props.address}, {props.city}, {props.country}
				</li>
				<li className='tablet__name'>{props.contact_name}</li>
				<li className='tablet__info'>
					<div>{props.contact_phone}</div>
					<div>{props.contact_email}</div>
				</li>
				<li className='tablet__btn-box'>
					<Link to={`/${props.id}/delete`}>
						<div className='tablet__btn'>
							<img src={deleteIcon} alt='delete_outline-24px.svg' />
						</div>
					</Link>
					<Link to={`/${props.id}/edit`}>
						<div className='tablet__btn'>
							<img src={editIcon} alt='edit-24px.svg' />
						</div>
					</Link>
				</li>
			</ul>

			<div className='container'>
				<div className='container__first'>
					<ul>
						<li className='container__title'>WAREHOUSE</li>
						<li className='container__info-warehouse'>
							<Link to={`/${props.id}`}>
								<div className='container__info-icon'>
									{props.warehouse_name}
									<img src={ChevronRight} alt='Chevron Right' />
								</div>
							</Link>
						</li>
					</ul>

					<ul>
						<li className='container__title'>ADDRESS</li>
						<li className='container__info-address'>
							{props.address}, {props.city}, {props.country}
						</li>

						<li className='container__delete'>
							<Link to={`/${props.id}/delete`}>
								<div className='btn__delete'>
									<img src={deleteIcon} alt='delete_outline-24px.svg' />
								</div>
							</Link>
						</li>
					</ul>
				</div>

				<div className='container__second'>
					<ul>
						<li className='container__title'>CONTACT NAME</li>
						<li className='container__info-name'>{props.contact_name}</li>
					</ul>

					<ul>
						<li className='container__title'>CONTACT INFORMATION</li>
						<li className='container__info-number'>{props.contact_phone}</li>
						<li className='container__info-email'>{props.contact_email}</li>
						<li className='container__edit'>
							<Link to={`/${props.id}/edit`}>
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
