let deck =[];
const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

const btnPedir = document.querySelector('#pedir'),
      btnDetener = document.querySelector('#detener'),
      btnNuevo = document.querySelector('#nuevo');

let puntosJugadores = [];

const cartasJugador = document.querySelectorAll('.box-cartas');
const puntos = document.querySelectorAll('small');

const inicializarJuego = ( numJugadores = 2 ) => {
    deck = crearDeck();

    puntosJugadores = [];
    for( let i = 0; i< numJugadores; i++ ){
        puntosJugadores.push(0);
    }
    puntos.forEach( elem => elem.innerText = 0 );
    cartasJugador.forEach( elem => elem.innerText = '' );

    btnPedir.disabled = false;
    btnDetener.disabled = false;

}

const crearDeck = () => {
    deck = [];
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
        return _.shuffle ( deck );
}

const pedirCarta = () => {

    if ( deck.length === 0){
        throw 'No hay cartas en el deck.';
    }
    return deck.pop();
}

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN ( valor ) ) ?
    ( valor === 'A' ) ? 11 : 10
    : parseInt ( valor );

}

const crearCarta = ( carta, turno ) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    cartasJugador[turno].append( imgCarta );
}

const determinarGanador = () => {

    const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );

}

const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
    puntos [turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const turnoComputadora = ( puntosMinimos ) => {
    
    let puntosComputadora = 0;

    do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
        crearCarta( carta, puntosJugadores.length - 1 );

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    determinarGanador();

}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos( carta, 0 );

    crearCarta( carta, 0 );


    if ( puntosJugador > 21 ){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if( puntosJugador === 21 ){
        console.warn('Llegaste a 21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener( 'click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora ( puntosJugadores[0] );
});

btnNuevo.addEventListener ( 'click', () => {
    inicializarJuego();
});