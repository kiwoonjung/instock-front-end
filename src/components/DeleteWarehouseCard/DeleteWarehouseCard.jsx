import './DeleteWarehouseCard.scss';
import '../../App.scss';
import close from '../../assets/images/icons/close-24px.svg';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function DeleteWarehouseCard({ warehouseId, warehouseName }) {
	const API_URL = process.env.REACT_APP_SERVER_URL;

	const navigate = useNavigate();
	

	const handelDelete = () => {
		axios
			.delete(`${API_URL}/warehouses/${warehouseId}`)
			.then(() => {
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className='transparent-background'>
				<div className='delete-background'>
					<div className='modal-wrapper'>
						<div className='modal-top'>
							<div className='delete-header'>
								<Link to={'/'}>
									<img className='delete-header__close-icon' src={close} alt='close' />
								</Link>
							</div>
							<div className='delete-heading'>
								<h1 className='delete-heading__title'>Delete {warehouseName} warehouse?</h1>
							</div>
							<div className='delete-details'>
								<p className='delete-details__info'>
									Please confirm that you’d like to delete the {warehouseName} from the list of
									warehouses. You won’t be able to undo this action.
								</p>
							</div>
						</div>
						<div className='modal-bottom'>
							<div className='delete-btns'>
								<Link to={'/'}>
									<div className='delete-btns__cancel button--secondary'>Cancel</div>
								</Link>
								<div className='delete-btns__delete button--delete' onClick={handelDelete}>
									Delete
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
