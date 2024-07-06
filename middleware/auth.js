const auth = async (req, res, next) => {
    try {
        
        if (!req.headers.authorization) {
            throw new Error('Authorization header is required');
        }
        
        // Get the user id through header named authorization
        const userid = req.headers.authorization.split(' ')[1];

        // Attaching the user object to the request
        req.user = {
            _id: userid
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;