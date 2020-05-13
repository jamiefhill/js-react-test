import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
import LabelledInput, {
	LabelledInputSubmitType,
} from '../../components/LabelledInput';
import './App.css';
import Address from '../../components/Address';
import Communicate from '../../components/Communicate';
import Person from '../../components/Person';
import Message from '../../components/Message';

function App() {
	const [data, setData] = useState({
		message: 'Fetching from API...',
		fetched: false,
	});

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('http://localhost:8080/').then((res) =>
				res.json()
			);
			setData({
				message: data.data.message,
				fetched: true,
			});
		};

		if (!data.fetched) {
			fetchData();
		}
	});

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Contact Us</h1>
				<p>{data.message}</p>
				<Form>
					<Person />
					<Communicate />
					<Address />
					<Message />
					<LabelledInput type={LabelledInputSubmitType} />
				</Form>
			</header>
		</div>
	);
}

export default App;
