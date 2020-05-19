import React from 'react';
import superagent from 'superagent';

function Form({ children }) {
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		await superagent.post('http://localhost:8080/create').send(data);
	};

	return <form onSubmit={handleSubmit}>{children}</form>;
}

export default Form;
