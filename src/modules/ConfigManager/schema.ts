import Joi from 'joi';

const onboardingInstructionsSchema = Joi.object({
	timesShown: Joi.number().integer().min(0).required(),
}).optional();

const schema = Joi.object({
	onboardingInstructions: onboardingInstructionsSchema,
}).required();

export default schema;
