import './AddInventoryCard.scss';
import '../../App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/images/icons/arrow_back-24px.svg';
import Error from '../../../src/assets/images/icons/error-24px.svg';
const { v4: uuid } = require('uuid');

export default function AddInventoryCard() {
	const API_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();

	const [warehouseList, setWarehouseList] = useState([]);
	const [inventory, setInventory] = useState([]);

	const [item_name, setItem_name] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [warehouse_id, setWarehouse_id] = useState('');
	const [status, setStatus] = useState('In Stock');

	const [item_nameError, setitem_nameError] = useState(null);
	const [descriptionError, setDescriptionError] = useState(null);
	const [categoryError, setCategoryError] = useState(null);
	const [quantityError, setQuantityError] = useState(null);
	const [warehouseError, setWarehouseError] = useState(null);

	useEffect(() => {
		axios.get(`${API_URL}/warehouses`).then((response) => {
			setWarehouseList(response.data);
		});
		axios.get(`${API_URL}/inventory`).then((response) => {
			setInventory(response.data);
		});
	}, [API_URL]);

	const listOfCategories = inventory.map((inventory) => inventory.category);
	let uniqueCategories = [...new Set(listOfCategories)];
	useEffect(() => {}, [warehouse_id]);

	useEffect(() => {
		if (item_name !== '') {
			setitem_nameError(null);
		} else {
			setitem_nameError(true);
		}
	}, [item_name]);

	useEffect(() => {
		if (warehouse_id !== '') {
			setWarehouseError(null);
		} else {
			setWarehouseError(true);
		}
	}, [warehouse_id]);

	useEffect(() => {
		if (description !== '') {
			setDescriptionError(null);
		} else {
			setDescriptionError(true);
		}
	}, [description]);

	useEffect(() => {
		if (category !== '') {
			setCategoryError(null);
		} else {
			setCategoryError(true);
		}
	}, [category]);

	useEffect(() => {
		if (quantity !== '') {
			setQuantityError(null);
		} else if (status === 'Out of Stock') {
			setQuantity(0);
			setQuantityError(null);
		} else {
			setQuantityError(true);
		}
	}, [quantity, status]);

	function handleAddInventory(event) {
		event.preventDefault();

		if (item_nameError === true || descriptionError === true || categoryError === true || quantityError === true) {
			alert('Please Complete the Form');
		} else {
			axios.post(`${API_URL}/inventory`, {
				id: uuid(),
				warehouse_id: warehouse_id,
				item_name: item_name,
				description: description,
				category: category,
				status: status,
				quantity: quantity,
			});
			alert('Item Added!');
			navigate('/inventory');
		}
	}

	return (
		<>
			<form className='addinv-card' onSubmit={handleAddInventory}>
				<div className='addinv-card__wrpr-header'>
					<Link to='/inventory'>
						<img className='addinv-card__back-icon' src={BackIcon} alt='back arrow' />
					</Link>
					<div className='addinv-card__header-title'>Add Inventory Item</div>
				</div>
				<div className='addinv-card__wrpr-content'>
					<div className='addinv-card__wrpr-item-details'>
						<div className='addinv-card__subheader'>Item Details</div>
						<label htmlFor='item_name' className='addinv-card__label-name'>
							Item Name
							<input
								type='text'
								name='item_name'
								id=''
								className='addinv-card__input-name'
								onChange={(e) => setItem_name(e.target.value)}
							/>
							{item_nameError && (
								<div className='addinv-card__error-wrp'>
									<img className='-invcard__error-img' src={Error} alt='' />
									<p className='addinv-card__error-text'>This field is required</p>
								</div>
							)}
						</label>
						<label htmlFor='description' className='addinv-card__label-des'>
							Description
							<textarea
								name='description'
								id='description'
								cols='30'
								rows='10'
								className='addinv-card__input-desc'
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
							{descriptionError && (
								<div className='addinv-card__error-wrp'>
									<img className='-invcard__error-img' src={Error} alt='' />
									<p className='addinv-card__error-text'>This field is required</p>
								</div>
							)}
						</label>
						<div className='addinv-card__wrpr-form'>
							<div className='addinv-card__form-category'>
								<label for='lang' className='addinv-card__label'>
									Category
								</label>
								<select
									name='languages'
									id='lang'
									className='addinv-card__label-option-category-b'
									onChange={(e) => setCategory(e.target.value)}
								>
									<option value={null}></option>
									{uniqueCategories.map((categoryList) => (
										<option
											value={categoryList}
											selected={category === categoryList ? true : false}
										>
											{categoryList}
										</option>
									))}
								</select>
								{categoryError && (
									<div className='addinv-card__error-wrp'>
										<img className='-invcard__error-img' src={Error} alt='' />
										<p className='addinv-card__error-text'>This field is required</p>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='addinv-card__wrpr-item-availability'>
						<div className='addinv-card__subheader-item'>Item Availability</div>
						<div action='' className='addinv-card__form-status'>
							<fieldset id='group1' className='addinv-card__form-status-fieldset'>
								<legend className='addinv-card__label'>Status</legend>
								<div>
									<input
										type='radio'
										id='in-stock'
										name='group1'
										value='In Stock'
										checked={status === 'In Stock' ? true : false}
										onChange={(e) => setStatus(e.target.value)}
									/>
									<label htmlFor='in-stock'>In Stock</label>
								</div>
								<div>
									<input
										type='radio'
										id='out-stock'
										name='group1'
										value='Out of Stock'
										onChange={(e) => setStatus(e.target.value)}
									/>
									<label htmlFor='out-stock'>Out of Stock</label>
								</div>
							</fieldset>
						</div>
						<div className='addinv-card__form-availability' action='#'>
							{status === 'In Stock' ? (
								<div className='addinv-card__quantity-wrapper'>
									<label for='warehouse ' className='addinv-card__label '>
										Quantity
									</label>
									<input
										name=' '
										id=' '
										type='number'
										className='addinv-card__label-option-q '
										onChange={(e) => setQuantity(e.target.value)}
									></input>
									{quantityError && (
										<div className='addinv-card__error-wrp'>
											<img className='-invcard__error-img' src={Error} alt='' />
											<p className='addinv-card__error-text'>Please Provide the # of Stock</p>
										</div>
									)}
								</div>
							) : null}
							<label for='' className='addinv-card__label'>
								Warehouse
							</label>
							<select
								name='languages'
								id='lang'
								className='addinv-card__label-option-availability'
								onChange={(e) => {
									setWarehouse_id(e.target.value);
								}}
							>
								<option value={null}></option>
								{warehouseList.map((warehouse) => (
									<option value={warehouse.id}>{warehouse.city}</option>
								))}
							</select>
							{warehouseError && (
								<div className='addinv-card__error-wrp'>
									<img className='-invcard__error-img' src={Error} alt='' />
									<p className='addinv-card__error-text'>This field is required</p>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='addinv-card__btns-wrp'>
					<Link to='/'>
						<button className='button--secondary'>Cancel</button>
					</Link>
					<button className='button--primary' type='submit'>
						+Add Item
					</button>
				</div>
			</form>
		</>
	);
}
