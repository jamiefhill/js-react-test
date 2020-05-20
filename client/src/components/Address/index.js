import React from 'react';
import LabelledInput, { LabelledInputTextType } from '../LabelledInput';
import '../../pages/App/App.css';

function Address() {
	return (
		<div className='App'>
			<h1>Address</h1>
			<LabelledInput
				label={'House Number:'}
				type={LabelledInputTextType}
				name={'housenumber'}
			/>
			<br />
			<LabelledInput
				label={'Street:'}
				type={LabelledInputTextType}
				name={'street'}
			/>
			<br />
			<LabelledInput
				label={'City:'}
				type={LabelledInputTextType}
				name={'city'}
			/>
			<br />
			<LabelledInput
				label={'County:'}
				type={LabelledInputTextType}
				name={'county'}
			/>
			<br />
			<LabelledInput
				label={'Country:'}
				type={LabelledInputTextType}
				name={'country'}
			/>
		</div>
	);
}

export default Address;
