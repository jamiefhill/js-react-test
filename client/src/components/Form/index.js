import React from 'react';

function Form({ children }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target);
	};

	return <form onSubmit={handleSubmit}>{children}</form>;
}

export default Form;
