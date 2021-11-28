import jwt from 'jsonwebtoken';
//  custom  middleware

export const auth = async (request, response, next) => {
    try{
        const token = request.header("x-auth-token");
        console.log(token);
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch(err) {
        response.status(401).send({ error: err.message });
    }
};