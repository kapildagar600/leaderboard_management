const {z} = require('zod');

exports.userCreationSchema = z.object({
    name: z.string().min(1,"Name is required"),
    totalPoints: z.number().optional().default(0),
    avatar:z.string().optional()
})