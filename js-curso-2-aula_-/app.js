let drawnNumbers = [];
let maxNumber = 10;
let secretNumber = randomNumberGenerator();
let tries = 1;

function textOnScreen(tag, text){
let field = document.querySelector (tag);
field.innerHTML = text
responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate: 1.3});
}

function initialMessage (){
textOnScreen ('h1', 'Jogo do Número Secreto');
textOnScreen ('p', `Escolha um número de 1 a ${maxNumber}`);
}

initialMessage();

function checkShot() {
    let shot = document.querySelector ('input').value;
    if (shot == secretNumber) {
        textOnScreen ('h1', 'PARABÉNS!');
        let wordTries = tries > 1? 'tentativas' : 'tentativa';
        let messageTries = `Você descobriu o número secreto com ${tries} ${wordTries}! :)`;
        textOnScreen ('p', messageTries);
        document.getElementById ('restart').removeAttribute('disabled');
    }
    else {
        if (shot > secretNumber){
            textOnScreen ('p', `O número secreto é menor que ${shot}`);
        }
        else {
            textOnScreen ('p', `O número secreto é maior que ${shot}`);
        }
        tries++;
        cleanField();
    };
};
function randomNumberGenerator() {
    let chosenNumber = parseInt(Math.random () *maxNumber + 1);
    let quantDrawnNumbers = drawnNumbers.length;
    if (quantDrawnNumbers == 100){
        drawnNumbers = []
    };
    if (drawnNumbers.includes(chosenNumber)) {
        return randomNumberGenerator();
    }
    else {
        drawnNumbers.push(chosenNumber);
        console.log (drawnNumbers);
        return chosenNumber;
    }
}

function cleanField(){
    shot = document.querySelector ('input');
    shot.value = '';
}

function restartGame (){
    secretNumber = randomNumberGenerator();
    cleanField();
    tries = 1;
    initialMessage();
    document.getElementById ('restart').setAttribute('disabled', true);
}