let deck =[];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

const btnPedir = document.querySelector('#pedir')
const btnDetener = document.querySelector('#detener')
const btnNuevo = document.querySelector('#nuevo')

let puntosJugador = 0;
let puntosComputadora = 0;

const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputadora= document.querySelector('#computadora-cartas');

const puntos = document.querySelectorAll('small')

const crearDeck = () => {
    for( let i = 2; i <= 10;
        i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo )
            }
        }
    for ( let tipo of tipos ){
        for ( let esp of especiales ){
            deck.push( esp + tipo );
        }
    }    
        deck = _.shuffle ( deck );
        return deck;
}

crearDeck ();

const pedirCarta = () => {

    if ( deck.length === 0){
        throw 'No hay cartas en el deck.';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN ( valor ) ) ?
    ( valor === 'A' ) ? 11 : 10
    : parseInt ( valor );

}

const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntos [1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        cartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Ganaste, ¡Felicidades!');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta ( carta );
    puntos [0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );
    cartasJugador.append(imgCarta);

    if ( puntosJugador > 21 ){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    } else if( puntosJugador === 21 ){
        console.warn('Llegaste a 21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

btnDetener.addEventListener( 'click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora ( puntosJugador );
});

btnNuevo.addEventListener ( 'click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    
    puntos[0].innerText = 0;
    puntos[1].innerText = 0;

    cartasComputadora.innerHTML = '';
    cartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});