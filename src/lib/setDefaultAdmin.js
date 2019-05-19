//Este archivo establece un usuario administrador por defecto
const User = require("../models/Users");

async function setAdmin() {
    const user = await User.findOne({username : "Admin"});
    if (!user) {
        const username = "Admin";
        const email = "admin@admin.com";
        const password = "adm1n3407";
        const role = "1";
        const newUser = new User({ username, email, password, role });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
    }
}

setAdmin();