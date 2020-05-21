const Joi = require('@hapi/joi');

const getContactFormValidationSchema = () => {
	const whiteSpacePuncString = /^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/;
	return Joi.object().keys({
		firstname: Joi.string()
			.min(3)
			.max(255)
			.required()
			.regex(whiteSpacePuncString),
		lastname: Joi.string()
			.min(3)
			.max(255)
			.required()
			.regex(whiteSpacePuncString),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		telephone: Joi.string().regex(
			/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
		),
		housenumber: Joi.string()
			.min(3)
			.max(255)
			.regex(whiteSpacePuncString)
			.required(),
		street: Joi.string().min(3).max(255).regex(whiteSpacePuncString).required(),
		city: Joi.string().min(3).max(255).regex(whiteSpacePuncString).required(),
		county: Joi.string().min(3).max(255).regex(whiteSpacePuncString).required(),
		country: Joi.string()
			.min(3)
			.max(255)
			.regex(whiteSpacePuncString)
			.required(),
		message: Joi.string()
			.min(3)
			.max(255)
			.regex(whiteSpacePuncString)
			.required(),
	});
};

const validateContactForm = (contactForm) => {
	const schema = getContactFormValidationSchema();
	const { error, value } = schema.validate(contactForm);
	return isValid(error, value);
};

const isValid = (error, value) => {
	if (error) {
		console.log(error.details[0].message, value);
		throw Error(error.details[0].message);
	}
	return true;
};

module.exports = { validateContactForm };
