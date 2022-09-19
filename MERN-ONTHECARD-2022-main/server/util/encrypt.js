// Visit this for more details: 
// https://attacomsian.com/blog/nodejs-encrypt-decrypt-data

import crypto from "crypto"; 

const algorithm = 'aes-256-ctr';
// Key has to be 32 characters long
const secretKey = 'TrungTrinhOnTheCardCanada2016202';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

export {encrypt, decrypt}