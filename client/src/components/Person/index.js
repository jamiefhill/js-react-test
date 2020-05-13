import React from 'react';
import LabelledInput, { LabelledInputTextType } from '../LabelledInput';
import '../../pages/App/App.css';

function Person() {
	return (
		<div className='App'>
			<h1>Person</h1>
			<LabelledInput
				label={'First Name:'}
				name={'firstname'}
				type={LabelledInputTextType}
			/>
			<br />
			<LabelledInput
				label={'Last Name:'}
				name={'lastname'}
				type={LabelledInputTextType}
			/>
		</div>
	);
}

export default Person;
