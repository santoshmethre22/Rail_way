const adminAuth = (req, res, next) => {
    console.log("the req.user is ",req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
  
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only!" });
    }
  
    next();
  };
  
  export default adminAuth;
  