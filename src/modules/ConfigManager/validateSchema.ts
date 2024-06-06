import { type Config } from './ConfigManager';
import schema from './schema';

export default function validateSchema(config: Config): Config {
	const { error, value } = schema.validate(config);

	if (error != null) throw error;

	return value;
}
