import React from 'react';
import LabelledInput, { LabelledInputTextType } from '../LabelledInput';
import '../../pages/App/App.css';

function Person() {
	return (
		<div className='App'>
			<h1>Message</h1>
			<LabelledInput label={'Message:'} type={LabelledInputTextType} />
		</div>
	);
}

export default Person;
