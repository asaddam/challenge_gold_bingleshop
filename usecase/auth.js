class AuthUC {
    constructor(
        UserRepository,
        AuthRepository,
        bcrypt,
        generateToken,
        _,
    ) {
        this.UserRepository = UserRepository;
        this.AuthRepository = AuthRepository;
        this.bcrypt = bcrypt;
        this.generateToken = generateToken;
        this._ = _;
    }

    async registerUser(userData) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: '',
            data: null,
            token: null
        }

        let user = await this.UserRepository.getUserExists(userData.username, userData.email);
        // if (userData.password !== userData.confirmPassword) {
        //     result.reason = 'Password and confirm password not match';
        //     return result;
        // }

        if (user !== null) {
            result.reason = 'Username or email not available';
            return result;
        }

        userData.password = await this.bcrypt.hash(userData.password, 10);

        user = await this.AuthRepository.registerUser(userData)
        let dataUser = this._.omit(user.dataValues, ["password"]);
        let token = this.generateToken(dataUser);

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = dataUser;
        result.token = token;
        return result;
    }

    async loginUser(username, password) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: '',
            data: null,
            token: null
        }

        let user = await this.AuthRepository.loginUser(username);
        console.log(user);
        if(user === null) {
            result.reason = 'Incorrect username or password';
            return result;
        }
        if(!this.bcrypt.compareSync(password, user.password)) {
            result.reason = 'Incorrect username or password';
            return result;
        }
        let dataUser = this._.omit(user.dataValues, ['password']);
        let token = this.generateToken(dataUser);

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = dataUser;
        result.token = token;
        return result;
    }
}

module.exports = AuthUC;