
import {Router} from "express"
import {registerUser,loginUser,setUser,getUser} from "../controllers/user.controllers.js"
import {protect} from "../middlewares/auth.middleware.js"

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-user",protect,getUser);
router.patch("/update-user",protect,setUser);


export default router;
