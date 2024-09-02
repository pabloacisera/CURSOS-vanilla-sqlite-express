import Router from 'express'
import { 
    getDashboardPage,
    getLoginPage,
    getRegisterPage,
    loginUsers,
    registerUser,
 } from "../controllers/user.controller.js";

const r = Router()

//RUTAS DE ARCHIVOS
r.get("/dashboard", getDashboardPage)
r.get("/login_page", getLoginPage )
r.get("/register_page", getRegisterPage)


//RUTA DE LOGICA
r.post("/login_user", loginUsers)
r.post("/register_user", registerUser)

export default r