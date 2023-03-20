import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteInventoryCard from '../../components/DeleteInventoryCard/DeleteInventoryCard';
import Inventory from '../Inventory/Inventory';
import './InventoryDelete.scss';

export default function InventoryDelete() {
	const API_URL = process.env.REACT_APP_SERVER_URL;
	const id = useParams();
	const inventoryId = id.inventory_id;

	const [itemName, setItemName] = useState('');

	axios.get(`${API_URL}/inventory/${inventoryId}`).then((response) => {
		setItemName(response.data[0].item_name);
	});

	return (
		<>
			<div className='inventory'>
				<Inventory />
			</div>
			<div className='modal'>
				<DeleteInventoryCard inventoryId={inventoryId} itemName={itemName} />
			</div>
		</>
	);
}
