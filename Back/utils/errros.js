module.exports.inscriptionErrors = (err) => {
    //Ici on déclare notre objet errror avec tout les proriétés a controller
    let errors = { pseudo: "", email: "", password: "" };

    //Ici on gère si le pseudo est incorrect ou déja pris
    if (err.message.includes("pseudo"))
        errors.pseudo = "Pseudo incorrect ou déjà pris";

    //Ici on gère si l'email est incorrect
    if (err.message.includes("email")) errors.email = "Email incorrect";

    //Ici on gère si le mot de passe n'a pas les 6 caractère minimun requis
    if (err.message.includes("password"))
        errors.password = "Mot de passe de 6 caractère minimun";

    //Ici on controle si le pseudo est déja pris ou non
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Pseudo est déjà existant";

    //Ici on controle si l'email est déja enregistré
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Email déjà existante";

    return errors;
}

module.exports.connexionErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

    return errors;
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: "" };

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatabile";

    if (err.message.includes('max size'))
        errors.maxSize = "Le fichier dépasse 500ko";

    return errors
}