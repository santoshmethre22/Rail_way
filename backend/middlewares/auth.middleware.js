import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        token = token.split(" ")[1];

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", verified); // Debugging log

        req.user = verified; // Attach user info to request

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

export { protect };
