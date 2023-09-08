class User {
    constructor(
        id,
        username,
        password,
    ){
        this.id = id;
        this.username = username;
        this.password = password;
    }

    set token(token){
        this.token = token;
    }

    get token(){
        return this.token;
    }
}

module.exports = User;