import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Warehouse from './pages/Warehouse/Warehouse';
import WarehouseDetails from './pages/WarehouseDetails/WarehouseDetails';
import WarehouseDelete from './pages/WarehouseDelete/WarehouseDelete';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import Inventory from './pages/Inventory/Inventory';
import InventoryDetails from './pages/InventoryDetails/InventoryDetails';
import InventoryDelete from './pages/InventoryDelete/InventoryDelete';
import AddInventory from './pages/AddInventory/AddInventory';
import EditInventory from './pages/EditInventory/EditInventory';
import './App.scss';

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Warehouse />} />
					<Route path='/:warehouse_id' element={<WarehouseDetails />} />
					<Route path='/:warehouse_id/delete' element={<WarehouseDelete />} />
					<Route path='/add' element={<AddWarehouse />} />
					<Route path='/:warehouse_id/edit' element={<EditWarehouse />} />
					<Route path='/inventory' element={<Inventory />} />
					<Route path='/inventory/:inventory_id' element={<InventoryDetails />} />
					<Route path='/inventory/:inventory_id/delete' element={<InventoryDelete />} />
					<Route path='/inventory/add' element={<AddInventory />} />
					<Route path='/inventory/:inventory_id/edit' element={<EditInventory />} />
					<Route path='/inventory/add' element={<AddInventory />} />
					<Route path='/inventory/:inventory_id/edit' element={<EditInventory />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
