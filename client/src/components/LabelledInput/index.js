import React from 'react';

export const LabelledInputTextType = 'text';
export const LabelledInputNumberType = 'number';
export const LabelledInputEmailType = 'email';
export const LabelledInputSubmitType = 'submit';

function LabelledInput({ type = LabelledInputTextType, label = false }) {
	return (
		<>
			{label && <label htmlFor=''>{label}</label>}
			<input required type={type} />
		</>
	);
}

export default LabelledInput;
