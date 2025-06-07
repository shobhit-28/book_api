import jwt from "jsonwebtoken";


export default (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith(`Bearer `)) {
        return res.status(401).json({error: `Unauthorised`});
    }
    try {
        const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}