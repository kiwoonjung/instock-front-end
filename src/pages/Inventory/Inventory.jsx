import './Inventory.scss';
import InventoryList from '../../components/InventoryList/InventoryList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Inventory() {
	return (
		<div className='bg-color'>
			<Header />
			<InventoryList />
			<Footer />
		</div>
	);
}
