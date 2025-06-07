import jwt from "jsonwebtoken";


export const authenticateToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({error: `Authorization header missing`});
    }
    const token = auth.split(' ')[1]
    if (!token) {
        return res.status(401).json({error: `Token not found`})
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({error: `Unauthorised`})
        }
        req.user = user
        next();
    })

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (error) {
    //     return res.status(401).json({ error: 'Invalid token' });
    // }
}