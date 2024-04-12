const { verifyToken } = require("../utils/auth");

const Authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1]; 
        if(!accessToken) res.status(401).json({error: "Unauthorized"});
        try {
            const { userId } = verifyToken(accessToken);
            req.headers['x-userId'] = userId;
        }
        catch(err) {
            next(err);
        }
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = Authentication;