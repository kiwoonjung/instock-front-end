import './EditWarehouseCard.scss';
import '../../App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackIcon from '../../assets/images/icons/arrow_back-24px.svg';
import Error from '../../../src/assets/images/icons/error-24px.svg';
const { v4: uuid } = require('uuid');

export default function EditWarehouseCard() {
	const API_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();
	const { warehouse_id } = useParams();

	const [warehouseData, setWarehouseData] = useState({});
	const [warehouse_name, setwarehouse_name] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [contact_name, setContact_name] = useState('');
	const [contact_position, setContact_Position] = useState('');
	const [contact_phone, setContact_phone] = useState('');
	const [contact_email, setContact_email] = useState('');

	const [warehouse_nameError, setwarehouse_nameError] = useState(null);
	const [addressError, setAddressError] = useState(null);
	const [cityError, setcityError] = useState(null);
	const [countryError, setCountryError] = useState(null);
	const [contact_nameError, setContact_nameError] = useState(null);
	const [contact_positionError, setContact_PositionError] = useState(null);
	const [contact_phoneError, setContact_phoneError] = useState(null);
	const [contact_emailError, setContact_emailError] = useState(null);

	useEffect(() => {
		axios.get(`${API_URL}/warehouses/${warehouse_id}`).then((res) => {
			setWarehouseData(res.data[0]);
		});
	}, []);

	useEffect(() => {
		setwarehouse_name(warehouseData.warehouse_name);
		setAddress(warehouseData.address);
		setCity(warehouseData.city);
		setCountry(warehouseData.country);
		setContact_name(warehouseData.contact_name);
		setContact_Position(warehouseData.contact_position);
		setContact_phone(warehouseData.contact_phone);
		setContact_email(warehouseData.contact_email);
	}, [warehouseData]);

	function validatecontact_phoneNumber(number) {
		const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
		return re.test(number);
	}

	function validatecontact_email(contact_email) {
		const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
		return re.test(contact_email);
	}

	useEffect(() => {
		if (warehouse_name !== '') {
			setwarehouse_nameError(null);
		} else {
			setwarehouse_nameError(true);
		}
	}, [warehouse_name]);

	useEffect(() => {
		if (address !== '') {
			setAddressError(null);
		} else {
			setAddressError(true);
		}
	}, [address]);

	useEffect(() => {
		if (city !== '') {
			setcityError(null);
		} else {
			setcityError(true);
		}
	}, [city]);

	useEffect(() => {
		if (country !== '') {
			setCountryError(null);
		} else {
			setCountryError(true);
		}
	}, [country]);

	useEffect(() => {
		if (contact_name !== '') {
			setContact_nameError(null);
		} else {
			setContact_nameError(true);
		}
	}, [contact_name]);

	useEffect(() => {
		if (contact_position !== '') {
			setContact_PositionError(null);
		} else {
			setContact_PositionError(true);
		}
	}, [contact_position]);

	useEffect(() => {
		if (validatecontact_phoneNumber(contact_phone) === true) {
			setContact_phoneError(null);
		} else {
			setContact_phoneError(true);
		}
	}, [contact_phone]);

	useEffect(() => {
		if (validatecontact_email(contact_email) !== false) {
			setContact_emailError(null);
		} else {
			setContact_emailError(true);
		}
	}, [contact_email]);

	function handleAddWarehouse(event) {
		event.preventDefault();

		if (
			warehouse_nameError === true ||
			addressError === true ||
			cityError === true ||
			countryError === true ||
			contact_nameError === true ||
			contact_positionError === true ||
			contact_phoneError === true ||
			contact_emailError === true
		) {
			alert('Please Complete the Form');
		} else {
			axios.put(`${API_URL}/warehouses/${warehouse_id}/edit`, {});

			alert('Changes Added!');
			navigate('/');
		}
	}

	return (
		<form className='whcard ' onSubmit={handleAddWarehouse}>
			<div className='whcard__wrp-header '>
				<Link to='/'>
					<img className='whcard__back-icon ' src={BackIcon} alt='back arrow ' />
				</Link>
				<div className='whcard__header-title '>Edit Warehouse</div>
			</div>
			<div className='whcard__content-wrp'>
				<div className='whcard__details-wrp '>
					<div className='whcard__sub-header '>Warehouse Details</div>
					<label htmlFor=' ' className='whcard__label '>
						Warehouse Name
						<input
							onChange={(e) => setwarehouse_name(e.target.value)}
							type='text '
							placeholder='Washington '
							name='warehouse '
							className='whcard__input '
							value={warehouse_name}
						/>
						{warehouse_nameError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label htmlFor=' ' className='whcard__label '>
						Street Address
						<input
							onChange={(e) => setAddress(e.target.value)}
							type='text '
							placeholder='33 Pearl Street SW '
							name='address '
							className='whcard__input '
							value={address}
						/>
						{addressError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label htmlFor=' ' className='whcard__label '>
						City
						<input
							onChange={(e) => setCity(e.target.value)}
							type='text '
							placeholder='Washington '
							name='city '
							className='whcard__input '
							value={city}
						/>
						{cityError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label htmlFor=' ' className='whcard__label '>
						Country
						<input
							onChange={(e) => setCountry(e.target.value)}
							type='text '
							placeholder='USA '
							name='country '
							className='{errorState ? whcard__input error : whcard__card}'
							value={country}
						/>
						{countryError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
				</div>
				<div className='whcard__contact-wrp '>
					<div className='whcard__sub-header '>Contact Details</div>
					<label htmlFor=' ' className='whcard__label '>
						Contact Name
						<input
							onChange={(e) => setContact_name(e.target.value)}
							type='text '
							placeholder='Graeme Lyon '
							className='whcard__input '
							name='contact_name '
							value={contact_name}
						/>
						{contact_nameError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label htmlFor=' ' className='whcard__label '>
						Position
						<input
							onChange={(e) => setContact_Position(e.target.value)}
							type='text '
							placeholder='Warehouse Manager '
							name='contact_position '
							className='whcard__input '
							value={contact_position}
						/>
						{contact_positionError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label htmlFor=' ' className='whcard__label '>
						Phone Number
						<input
							onChange={(e) => setContact_phone(e.target.value)}
							type='text '
							placeholder='+1(647)504-0911 '
							name='contact_phone '
							className='whcard__input '
							value={contact_phone}
						/>
						{contact_phoneError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>Please Enter a Valid Phone Number</p>
							</div>
						)}
					</label>
					<label htmlFor=' ' className='whcard__label '>
						Contact Email
						<input
							onChange={(e) => setContact_email(e.target.value)}
							type='contact_email'
							placeholder='glyon@instock.com '
							name='contact_email '
							className='whcard__input '
							value={contact_email}
						/>
					</label>
					{contact_emailError && (
						<div className='whcard__error-wrp'>
							<img className='whcard__error-img' src={Error} alt='' />
							<p className='whcard__error-text'>Pleasee Enter a Valid Email</p>
						</div>
					)}
				</div>
			</div>
			<div className='whcard__btns-wrp'>
				<Link to='/'>
					<button type='button' className='button--secondary'>
						Cancel
					</button>
				</Link>
				<button type='submit' className='button--primary'>
					Save
				</button>
			</div>
		</form>
	);
}
