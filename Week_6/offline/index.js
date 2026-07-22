const jwt = require("jsonwebtoken")
const secret_key = "somejibberish";
const zod = require("zod");

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password){
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }

    const signature = jwt.sign({
        username
    }, secret_key);

    return signature;
}

function decodeJwt(token){
    const decoded = jwt.decode(token);
    if(decoded){
        return true;
    } else {
        return false;
    }
}

function verifyJwt(token){
    const ans = true;
    try{
        jwt.verify(token, secret_key);
    } catch(e){
        ans = false;
    }
    return ans;
}