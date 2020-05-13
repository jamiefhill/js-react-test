import React from 'react';

export const LabelledInputTextType = 'text';
export const LabelledInputNumberType = 'number';
export const LabelledInputEmailType = 'email';
export const LabelledInputSubmitType = 'submit';

function LabelledInput({
	type = LabelledInputTextType,
	label = false,
	name = '',
}) {
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<input required id={name} name={name} type={type} />
		</>
	);
}

export default LabelledInput;
