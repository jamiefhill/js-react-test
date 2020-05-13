import React from 'react';
import LabelledInput, { LabelledInputTextType } from '../LabelledInput';
import '../../pages/App/App.css';

function Address() {
	return (
		<div className='App'>
			<h1>Address</h1>
			<LabelledInput label={'House Number:'} type={LabelledInputTextType} />
			<br />
			<LabelledInput label={'Street:'} type={LabelledInputTextType} />
			<br />
			<LabelledInput label={'City:'} type={LabelledInputTextType} />
			<br />
			<LabelledInput label={'County:'} type={LabelledInputTextType} />
			<br />
			<LabelledInput label={'Country:'} type={LabelledInputTextType} />
		</div>
	);
}

export default Address;
