import React from 'react';
import LabelledInput, {
	LabelledInputEmailType,
	LabelledInputNumberType,
} from '../LabelledInput';
import '../../pages/App/App.css';

function Communicate() {
	return (
		<div className='App'>
			<h1>Communication</h1>
			<LabelledInput
				label={'Telephone:'}
				name={'telephone'}
				type={LabelledInputNumberType}
			/>
			<br />
			<LabelledInput
				label={'Email:'}
				name={'email'}
				type={LabelledInputEmailType}
			/>
		</div>
	);
}

export default Communicate;
