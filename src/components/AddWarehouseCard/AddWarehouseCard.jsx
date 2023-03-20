import './AddWarehouseCard.scss';
import '../../App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/images/icons/arrow_back-24px.svg';
import Error from '../../../src/assets/images/icons/error-24px.svg';
const { v4: uuid } = require('uuid');

export default function AddWarehouseCard() {
	const API_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();

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

	function validatecontact_phoneNumber(number) {
		const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
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
		if (validatecontact_phoneNumber(contact_phone) !== false) {
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
		} else {
			axios.post(`${API_URL}/warehouses`, {
				id: uuid(),
				warehouse_name: warehouse_name,
				address: address,
				city: city,
				country: country,
				contact_name: contact_name,
				contact_position: contact_position,
				contact_phone: contact_phone,
				contact_email: contact_email,
			});
			alert('Warehouse Added!');
			navigate('/');
		}
	}

	return (
		<form className='whcard ' onSubmit={handleAddWarehouse}>
			<div className='whcard__wrp-header '>
				<Link to='/'>
					<img className='whcard__back-icon ' src={BackIcon} alt='back arrow ' />
				</Link>
				<div className='whcard__header-title '>Add Warehouse</div>
			</div>
			<div className='whcard__content-wrp'>
				<div className='whcard__details-wrp '>
					<div className='whcard__sub-header '>Warehouse Details</div>
					<label className='whcard__label '>
						Warehouse Name
						<input
							onChange={(e) => setwarehouse_name(e.target.value)}
							type='text '
							placeholder='Washington '
							name='warehouse '
							className='whcard__input '
						/>
						{warehouse_nameError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label className='whcard__label '>
						Street Adress
						<input
							onChange={(e) => setAddress(e.target.value)}
							type='text '
							placeholder='33 Pearl Street SW '
							name='address '
							className='whcard__input '
						/>
						{addressError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label className='whcard__label '>
						City
						<input
							onChange={(e) => setCity(e.target.value)}
							type='text '
							placeholder='Washington '
							name='city '
							className='whcard__input '
						/>
						{cityError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label className='whcard__label '>
						Country
						<input
							onChange={(e) => setCountry(e.target.value)}
							type='text '
							placeholder='USA '
							name='country '
							className='{errorState ? whcard__input error : whcard__card}'
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
					<label className='whcard__label '>
						Contact Name
						<input
							onChange={(e) => setContact_name(e.target.value)}
							type='text '
							placeholder='Graeme Lyon '
							className='whcard__input '
							name='contact_name '
						/>
						{contact_nameError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label className='whcard__label '>
						contact_position
						<input
							onChange={(e) => setContact_Position(e.target.value)}
							type='text '
							placeholder='Warehouse Manager '
							name='contact_position '
							className='whcard__input '
						/>
						{contact_positionError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label className='whcard__label '>
						contact_phone Number
						<input
							onChange={(e) => setContact_phone(e.target.value)}
							type='text '
							placeholder='+1(647)504-0911 '
							name='contact_phone '
							className='whcard__input '
						/>
						{contact_phoneError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>Please Enter a Valid Phone Number</p>
							</div>
						)}
					</label>
					<label className='whcard__label '>
						contact_email
						<input
							onChange={(e) => setContact_email(e.target.value)}
							type='contact_email'
							placeholder='glyon@instock.com '
							name='contact_email '
							className='whcard__input '
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
				<button className='button--primary'>Cancel</button>
				<button type='submit' className='button--primary'>
					+ Add Warehouse
				</button>
			</div>
		</form>
	);
}
