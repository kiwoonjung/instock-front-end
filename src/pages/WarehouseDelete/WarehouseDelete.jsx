import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteWarehouseCard from '../../components/DeleteWarehouseCard/DeleteWarehouseCard';
import Warehouse from '../Warehouse/Warehouse';
import './WarehouseDelete.scss';

export default function WarehouseDelete() {
	const API_URL = process.env.REACT_APP_SERVER_URL;

	const id = useParams();
	const warehouseId = id.warehouse_id;

	const [warehouseName, setWarehouseName] = useState('');

	axios.get(`${API_URL}/warehouses/${warehouseId}`).then((response) => {
		setWarehouseName(response.data[0].warehouse_name);
	});

	return (
		<>
			<div className='warehouse'>
				<Warehouse />
			</div>
			<div className='modal'>
				<DeleteWarehouseCard warehouseId={warehouseId} warehouseName={warehouseName} />
			</div>
		</>
	);
}
