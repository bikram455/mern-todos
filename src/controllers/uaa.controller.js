import uaaService from "../services/uaa.service";

const uaaController = {};

uaaController.login = async (req, res) =>{
    try {
        const user = await uaaService.login(req.body);
        res.status(200).json(user);
    } catch(err) {
        res.status(err.status || 500).json({error: err.message});
    }
}

uaaController.register = async (req, res) =>{
    try {
        const user = await uaaService.register(req.body);
        res.status(200).json(user);
    } catch(err) {
        res.status(err.status || 500).json({error: err.message});
    }
}

export default uaaController;