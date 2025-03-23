import verify  from "jsonwebtoken";

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(403).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Agrega el ID del usuario a la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido." });
    }
}

export default verifyToken;


