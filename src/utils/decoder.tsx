function heDecoder(string: string) {
    const he = require('he');
    return he.decode(string);
}

export {heDecoder};