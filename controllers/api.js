exports.getUsers = (req, res, next) => {
    res.send({"id": 1, "name": "Vlad"});
}

exports.getUser = (req, res, next) => {
    res.send({"id": 1, "name": "Vlad"});
}

exports.addUser = (req, res, next) => {
    res.send({"id": 1, "name": "Vlad"});
}

exports.putUser = (req, res, next) => {
    res.send({"id": 1, "name": "Vlad"});
}

exports.deleteUser = (req, res, next) => {
    res.send({"status": 400, "success": true});
}