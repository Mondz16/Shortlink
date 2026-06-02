
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function toBase64(num){
    if(num === 0) return ALPHABET[0];
    let code = '';
    while(num > 0){
        code = ALPHABET[num % 62] + code;
        num = Math.floor(num / 62);
    }

    return code;
}

