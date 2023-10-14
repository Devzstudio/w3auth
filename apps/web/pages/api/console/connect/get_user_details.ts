import prisma from 'lib/prisma';
import { ok, oops, response } from 'lib/response';
import validateAPI from '../middleware/validateAPI';

const getUserDetails = validateAPI(async (req, res) => {
	const { user_id, wallet_address } = req.query;

	if (user_id && wallet_address) {
		return oops(res, 'You can pass only wallet address or user id. Both values are not accepted.');
	}

	const result = await prisma.users.findFirst({
		where: {
			id: user_id,
		},
		include: {
			user_address: true,
		},
	});

	if (!result) {
		return oops(res, 'User not found');
	}

	const profile = await prisma.user_custom_field.findMany({
		where: {
			user_id: user_id,
		},
		include: {
			custom_fields: true,
		},
	});

	const customProfileFields = profile.map((field) => {
		return {
			label: field.custom_fields.label,
			name: field.custom_fields.name,
			value: field.value,
		};
	});

	return response(res, { data: { ...result, profile: customProfileFields } });
});

export default getUserDetails;
