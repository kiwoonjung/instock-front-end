import './EditInventoryCard.scss';
import BackIcon from '../../assets/images/icons/arrow_back-24px.svg';
import Error from '../../../src/assets/images/icons/error-24px.svg';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EditInventoryCard() {
	const API_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();
	const paramsId = useParams();
	const inventoryId = paramsId.inventory_id;
	const [inventoryData, setInventoryData] = useState({});
	const [warehouses, setWarehouses] = useState([]);
	const [categories, setCategories] = useState([]);
	const [item_name, setItem_name] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [warehouse_id, setWarehouse_id] = useState('');
	const [warehouse_name, setWarehosue_name] = useState('');
	const [status, setStatus] = useState('In Stock');

	const [item_nameError, setitem_nameError] = useState(null);
	const [descriptionError, setDescriptionError] = useState(null);
	const [categoryError, setCategoryError] = useState(null);
	const [quantityError, setQuantityError] = useState(null);
	const [warehouseError, setWarehouseError] = useState(null);

	useEffect(() => {
		axios.get(`${API_URL}/inventory/${inventoryId}`).then((response) => {
			setInventoryData(response.data[0]);
		});

		axios.get(`${API_URL}/warehouses`).then((response) => {
			setWarehouses(response.data);
		});

		axios.get(`${API_URL}/inventory`).then((response) => {
			setCategories(response.data);
		});
	}, []);

	const listOfCategories = categories.map((inventory) => inventory.category);
	let uniqueCategories = [...new Set(listOfCategories)];

	useEffect(() => {
		setItem_name(inventoryData.item_name);
		setDescription(inventoryData.description);
		setCategory(inventoryData.category);
		setQuantity(inventoryData.quantity);
		setWarehouse_id(inventoryData.warehouse_id);

		// Warehouses
		axios.get(`${API_URL}/warehouses/${warehouse_id}`).then((response) => {
			setWarehosue_name(response.data[0].warehouse_name);
		});
	}, [inventoryData, warehouse_id]);

	const inventoryItemData = {
		item_name: item_name,
		description: description,
		category: category,
		status: status,
		quantity: quantity,
	};

	//   Error validation

	useEffect(() => {
		if (item_name !== '') {
			setitem_nameError(null);
		} else {
			setitem_nameError(true);
		}
	}, [item_name]);

	useEffect(() => {
		if (warehouse_name !== '') {
			setWarehouseError(null);
		} else {
			setWarehouseError(true);
		}
	}, [warehouse_name]);

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

	function handelSubmit(event) {
		if (item_nameError === true || descriptionError === true || categoryError === true || quantityError === true) {
			alert('Please Complete the Form');
		} else {
			event.preventDefault();
			axios
				.put(`${API_URL}/inventory/${inventoryId}`, inventoryItemData)
				.then(() => {
					alert('Changes Added!');
					navigate('/inventory');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	return (
		<form className='inv-card' onSubmit={handelSubmit}>
			<div className='inv-card__wrpr-header'>
				<Link to='/inventory'>
					<img className='inv-card__back-icon' src={BackIcon} alt='back arrow' />
				</Link>
				<div className='inv-card__header-title'>Edit Inventory Item</div>
			</div>
			<div className='inv-card__wrpr-content'>
				<div className='inv-card__wrpr-item-details'>
					<div className='inv-card__subheader'>Item Details</div>
					<label htmlFor='item_name' className='inv-card__label-name'>
						Item Name
						<input
							type='text'
							name='item_name'
							id='item_name'
							className='inv-card__input-name'
							value={item_name}
							onChange={(e) => {
								setItem_name(e.target.value);
							}}
						/>
						{item_nameError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<label htmlFor='description' className='inv-card__label-des'>
						Description
						<textarea
							name='description'
							id='description'
							cols='30'
							rows='10'
							className='inv-card__input-desc'
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						></textarea>
						{descriptionError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</label>
					<div className='inv-card__wrpr-form'>
						<div className='inv-card__form-category'>
							<label htmlFor='category' className='inv-card__label'>
								Category
							</label>
							<select name='category' id='category' className='inv-card__label-option-category-b'>
								{uniqueCategories.map((categoryList) => (
									<option value={categoryList} selected={category === categoryList ? true : false}>
										{categoryList}
									</option>
								))}
							</select>
							{categoryError && (
								<div className='whcard__error-wrp'>
									<img className='whcard__error-img' src={Error} alt='' />
									<p className='whcard__error-text'>This field is required</p>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='inv-card__wrpr-item-availability'>
					<div className='inv-card__subheader-item'>Item Availability</div>
					<div className='inv-card__form-status'>
						<fieldset id='group1' className='inv-card__form-status-fieldset'>
							<legend className='inv-card__label'>Status</legend>
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
									value='Out Of Stock'
									onChange={(e) => setStatus(e.target.value)}
								/>
								<label htmlFor='out-stock'>Out of Stock</label>
							</div>
						</fieldset>
					</div>
					<div className='inv-card__form-availability'>
						{status === 'In Stock' ? (
							<div className='inv-card__quantity-wrapper'>
								<label htmlFor='warehouse' className='inv-card__label'>
									Quantity
								</label>
								<input
									name=''
									id=''
									type='number'
									className='inv-card__label-option-q'
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								></input>
								{quantityError && (
									<div className='whcard__error-wrp'>
										<img className='whcard__error-img' src={Error} alt='' />
										<p className='whcard__error-text'>Please provide a number</p>
									</div>
								)}
							</div>
						) : null}
						<label htmlFor='warehouse' className='inv-card__label'>
							Warehouse
						</label>
						<select
							name=''
							id=''
							className='inv-card__label-option-availability'
							onChange={(event) => {
								setWarehosue_name(event.target.value);
							}}
						>
							{warehouses.map((warehouse) => (
								<option
									value={warehouse.warehouse_name}
									selected={warehouse_name === warehouse.warehouse_name ? true : false}
								>
									{warehouse.warehouse_name}
								</option>
							))}
						</select>
						{warehouseError && (
							<div className='whcard__error-wrp'>
								<img className='whcard__error-img' src={Error} alt='' />
								<p className='whcard__error-text'>This field is required</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='inv-card__btns-wrp'>
				<Link to='/inventory'>
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
