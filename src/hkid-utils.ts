
function randInt(min: number, max: number) : number{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function calculateCheckDigit(alphabet: string, number: string): string{
    if (alphabet.length >= 3)
        throw new Error();

    if (number.length !== 6)
        throw new Error();

    var checkSum = 0;
    if (alphabet.length === 2){
        checkSum = checkSum + 9 * (10 + alphabet.charCodeAt(0) - 65)
        checkSum = checkSum + 8 * (10 + alphabet.charCodeAt(1) - 65)
    }
    else {
        checkSum = 9 * 36
        checkSum = checkSum + 8 * (10 + alphabet.charCodeAt(0) - 65)
    }

    for (var i = 0; i < number.length; i++){
        checkSum = checkSum + (7- i) * Number(number.charAt(i));        
    }

    const remaining = checkSum % 11;
    const verify = remaining === 0 ? 0 : ( (11 - remaining) === 10) ? 'A' : (11 - remaining)
    return verify.toString();
}

export function generateHkid(): string{
    const hkidMode = randInt(1, 10);

    var randomAlphabet = String.fromCharCode(randInt(65, 90))
    if (hkidMode === 10)
        randomAlphabet += String.fromCharCode(randInt(65, 90));

    var randomNumber = '';
    for (var i = 0; i< 6; i++)
        randomNumber = randomNumber + randInt(0, 9).toString();

    const checkDigit = calculateCheckDigit(randomAlphabet, randomNumber);
    
    return randomAlphabet + randomNumber + '(' + checkDigit + ')';
}

export function generateHkidBatch(batchSize: number): string[] {
    return [...Array(batchSize)].map(() => generateHkid())
}