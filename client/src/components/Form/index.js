import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import httpStatusCodes from 'http-status-codes';

function Form({ children }) {
	const [data, setData] = useState({
		message: '',
		sent: false,
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		event.currentTarget.reset();
		const response = await superagent
			.post('http://localhost:8080/create')
			.send(data);
		if (response.status === httpStatusCodes.OK) {
			setData({ message: 'Your contact request has been sent.', sent: true });
		} else {
			setData({
				message:
					'There was an error sending your contact request, please try again.',
				sent: true,
			});
		}
	};

	let msg;
	if (data.sent) {
		msg = <h3>{data.message}</h3>;
	}
	return (
		<div>
			{msg}
			<form onSubmit={handleSubmit}>{children}</form>
		</div>
	);
}

export default Form;
