////////////////////////////////////////////
// VARIABLES
////////////////////////////////////////////
var valorAnterior = 0;
var valorActual = 0;
var resultado = 0;
var ultimoOperador = 0;

///////////////////////////////////////////
// OBTENCIÓN DE ELEMENTOS
///////////////////////////////////////////
var salida = document.querySelector("#salida");
var textoDeEntrada = document.querySelector("#textoDeEntrada");

var nRes = document.querySelector("#nresultado");
var nValAc = document.querySelector("#nvaloractual");
var nValAn = document.querySelector("#nvaloranterior");
var nOp = document.querySelector("#noperacion");
var btn = [];
btn[0] = document.querySelector("#cero");
btn[1] = document.querySelector("#uno");
btn[2] = document.querySelector("#dos");
btn[3] = document.querySelector("#tres");
btn[4] = document.querySelector("#cuatro");
btn[5] = document.querySelector("#cinco");
btn[6] = document.querySelector("#seis");
btn[7] = document.querySelector("#siete");
btn[8] = document.querySelector("#ocho");
btn[9] = document.querySelector("#nueve");
var punto = document.querySelector("#punto");
var adicion = document.querySelector("#adicion");
var sustraccion = document.querySelector("#sustraccion");
var multiplicacion = document.querySelector("#multiplicacion");
var division = document.querySelector("#division");
var igual = document.querySelector("#igual");
var AC = document.querySelector("#AC");
var retroceder = document.querySelector("#retroceder");

///////////////////////////////////////////
// EVENTOS DE TECLAS EN PANTALLA
///////////////////////////////////////////
btn[0].addEventListener("click", function(){
  if(valorActual != '0')
    valorActual+='0';
  actualizarPantalla(valorActual)
  textoDeEntrada.style.display = 'none';
});
btn[1].addEventListener("click", function(){
  ponNumero('1');
  textoDeEntrada.style.display = 'none';
});
btn[2].addEventListener("click", function(){
  ponNumero('2');
  textoDeEntrada.style.display = 'none';
});
btn[3].addEventListener("click", function(){
  ponNumero('3');
  textoDeEntrada.style.display = 'none';
});
btn[4].addEventListener("click", function(){
  ponNumero('4');
  textoDeEntrada.style.display = 'none';
});
btn[5].addEventListener("click", function(){
  ponNumero('5');
  textoDeEntrada.style.display = 'none';
});
btn[6].addEventListener("click", function(){
  ponNumero('6');
  textoDeEntrada.style.display = 'none';
});
btn[7].addEventListener("click", function(){
  ponNumero('7');
  textoDeEntrada.style.display = 'none';
});
btn[8].addEventListener("click", function(){
  ponNumero('8');
  textoDeEntrada.style.display = 'none';
});
btn[9].addEventListener("click", function(){
  ponNumero('9');
  textoDeEntrada.style.display = 'none';
});
// +
adicion.addEventListener("click", function(){
  realizaOperacion();
  ultimoOperador = 'adicion';
  textoDeEntrada.style.display = 'none';
});
// -
sustraccion.addEventListener("click", function(){
  realizaOperacion();
  ultimoOperador = 'sustraccion';
  textoDeEntrada.style.display = 'none';
});
// *
multiplicacion.addEventListener("click", function(){
  realizaOperacion();
  ultimoOperador = 'multiplicacion';
  textoDeEntrada.style.display = 'none';
});
// /
division.addEventListener("click", function(){
  realizaOperacion();
  ultimoOperador = 'division';
  textoDeEntrada.style.display = 'none';
});
punto.addEventListener("click", function(){
  if(!salida.innerHTML.includes('.'))
    valorActual+='.';
  actualizarPantalla(valorActual)
  textoDeEntrada.style.display = 'none';
});
igual.addEventListener("click", function(){
  if(ultimoOperador != 0)
    realizaOperacion();
  valorAnterior = 0;
  valorActual = resultado;
  ultimoOperador = 'igual';
  textoDeEntrada.style.display = 'none';
});
retroceder.addEventListener("click", function(){
  if(salida.innerHTML != 0) {
    valorActual = salida.innerHTML.substring(0, salida.innerHTML.length-1);
    if(valorActual == 0)
      valorActual = 0;
  }
  actualizarPantalla(valorActual);
  textoDeEntrada.style.display = 'none';
});
AC.addEventListener("click", function(){
  valorActual = 0;
  valorAnterior = 0;
  resultado = 0;
  ultimoOperador = 0;
  actualizarPantalla(valorActual);
  textoDeEntrada.style.display = 'none';
});

///////////////////////////////////////////
// LLAMAR A LOS EVENTOS ANTERIORES POR TECLADO
///////////////////////////////////////////
document.addEventListener('keydown', presionarTeclas); // este crack dice "si se presiona una tecla, vete a presionarTeclas() a ver que pex"
const tecla = { //JSON sólo para no ver números a lo tonto en la función siguiente
  DCERO: 48,
  DNUEVE: 57,
  NCERO: 96,
  NNUEVE: 105,
  NMULTIPLICACION: 106,
  NADICION: 107,
  NSUSTRACCION: 109,
  NDIVISION: 111,
  PUNTO: 190,
  NPUNTO: 110,
  BORRAR: 46,
  RETROCEDER: 8,
  ENTER: 13,
}
function presionarTeclas(teclaPresionada) {
  const press = teclaPresionada.keyCode;
  if(press > tecla.NCERO && press <= tecla.NNUEVE // del 1 al 9 en el numpad
    || press > tecla.DCERO && press <= tecla.DNUEVE) // o del 1 al 9 en el teclado digital
  { // si se escribió un número del 1 al 9, entra aquí
    btn[teclaPresionada.key].click();
  }
  else
    switch(teclaPresionada.keyCode) {
      case tecla.DCERO: // 0, digital
      case tecla.NCERO: // 0, pad numérico
        btn[0].click();
        break;
      case tecla.NADICION: // +, pad numérico
        adicion.click();
        break;
      case tecla.NSUSTRACCION: // -, pad numérico
        sustraccion.click();
        break;
      case tecla.NMULTIPLICACION: // *, pad numérico
        multiplicacion.click();
        break;
      case tecla.NDIVISION: // /, pad numérico
        division.click();
        break;
      case tecla.PUNTO: // ., pad numérico
      case tecla.NPUNTO:
        punto.click();
        break;
      case tecla.ENTER: // entrar
        igual.click();
        break;
      case tecla.RETROCEDER: // backspace/retroceso
        retroceder.click();
        break;
      case tecla.BORRAR: // delete/suprimir
        AC.click();
        break;
      }
}

///////////////////////////////////////////
// FUNCIONES DEL PROGRAMA
///////////////////////////////////////////
function actualizarPantalla(valorActualSalida) {
  salida.innerHTML = valorActualSalida;
}

function ponNumero(numero) { // del 1 al 9
  if(valorActual.length >= 19)
    return;
  if(salida.innerHTML == '0')
    valorActual=numero;
  else
    valorActual+=numero;
  actualizarPantalla(valorActual);
}

function realizaOperacion() {
  if(valorAnterior != '0') {
    resultado = realizarOperacionDeFondo();
    valorAnterior = resultado;
  }
  else
    valorAnterior = valorActual;
  valorActual = 0;
  if(ultimoOperador!='igual')
    actualizarPantalla(resultado);
  else
    actualizarPantalla(0);
}

function realizarOperacionDeFondo() {
  switch(ultimoOperador) {
    case 'adicion':
      return parseFloat(valorAnterior) + parseFloat(valorActual);
      break;
    case 'sustraccion':
      return parseFloat(valorAnterior) - parseFloat(valorActual);
      break;
    case 'multiplicacion':
      return parseFloat(valorAnterior) * parseFloat(valorActual);
      break;
    case 'division':
      var valor = parseFloat(valorAnterior) / parseFloat(valorActual);
      if (valor == "Infinity") { // si se divide entre 0 
        window.alert("No dividas entre 0!")
        return 0;
      }
      else {
        return valor; 
      }
      break;
    case 'igual':
      actualizarPantalla('Esto no debería haber pasado nunca xD');
      break;
    default:
      actualizarPantalla('Hubo un error inesperado');
      break;
  }
  return null;
}
