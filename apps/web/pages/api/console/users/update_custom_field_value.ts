import { ok, oops } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

const UpdateCustomField = checkAuth(async function updateCustomField(req, res) {

    const {
        id,
        value
    } = (req.body);


    if (id != undefined) {

        await prisma.user_custom_field.update({
            where: {
                field_id: id
            },
            data: {
                value
            }
        })


        return ok(res);
    }
    else {
        return oops(res);
    }

})

export default UpdateCustomField;
