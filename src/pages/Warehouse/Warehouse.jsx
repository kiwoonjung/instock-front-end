import './Warehouse.scss';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Warehouse() {
	return (
		<>
			<div div className='bg-color'>
				<Header />
				<WarehouseList />
				<Footer />
			</div>
		</>
	);
}
