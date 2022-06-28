const res = require("express/lib/response");

function Calcular() {
  let url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let card1 = document.getElementById("numero1").value;
      let card2 = document.getElementById("numero2").value;
      let resultado = document.getElementById("resultado");

      for (let i = 0; i < 52; i++) {
        if (card1 == data.cards[i].code) {
          for (let j = 0; j < 52; j++) {
            if (card2 == data.cards[j].code) {
              if (card1 == card2) {
                resultado.innerHTML = `
                <h2>Las cartas de tu mano no pueden ser las mismas</h2>
                `
              } else {
                var color = CalcularCombinatoriaColor(
                  data.cards[i].suit,
                  data.cards[j].suit
                );
                var real = CalcularCombinatoriaEscaleraReal(
                  data.cards[i],
                  data.cards[j]
                );

                resultado.innerHTML = `
                <div class="row mb-4 mt-3">
                  
                  <div class="col-2 mb-3">
                    <img height="100px" src="${data.cards[i].image}">
                  </div>
                  <div class="col-2 mb-3">
                    <img height="100px" src="${data.cards[j].image}">
                  </div>
                  <div class="col-12 mb-2">
                    <h3>
                      <div class="col-12">
                        Probabilidades de conseguir Color: 
                      </div>
                      <div class="col-12">
                        <Sup>${color[0]}</sup>/<sub>${color[1]}</sub>
                      </div>
                    </h3>
                  </div>
                  <div class="col-12">
                    <h3>
                      <div class="col-12">
                        Probabilidades de conseguir Escalera Real: 
                      </div>
                      <div class="col-12">
                        <Sup>${real[0]}</sup>/<sub>${real[1]}</sub>
                      </div>
                    </h3>
                  </div>
                </div>
                `;
              }
            }
          }
        }
      }
    });
}

function Factorial(n) {
  var total = 1;
  for (i = 1; i <= n; i++) {
    total = total * i;
  }
  return total;
}

function CalcularCombinatoriaColor(palo1, palo2) 
{
  let resultado = 0;

  if (palo1 == palo2) 
  {
    let resultado1 =
      (((Factorial(11) / (Factorial(11 - 3) * 6)) * 39) * 38) / (Factorial(52) / (Factorial(52 - 5) * 120));
    let resultado2 =
      ((Factorial(12) / (Factorial(12 - 4) * 24)) * 38) /
      (Factorial(52) / (Factorial(52 - 5) * 120));
    let resultado3 =
      Factorial(12) /
      (Factorial(12 - 5) * 120) /
      (Factorial(52) / (Factorial(52 - 5) * 120));
    resultado = resultado1 + resultado2 + resultado3;
    resultadoPosible = (Factorial(39) / (Factorial(39 - 5) * 120) / (Factorial(52) / (Factorial(52 - 5) * 120))) * 3
    resultadoTotal = [resultado, resultadoPosible];
    return resultadoTotal;
  } 
  else {
    let resultado1 =
      ((Factorial(12) / (Factorial(12 - 4) * 24)) * 38) /
      (Factorial(52) / (Factorial(52 - 5) * 120));
    let resultado2 =
      Factorial(12) /
      (Factorial(12 - 5) * 120) /
      (Factorial(52) / (Factorial(52 - 5) * 120));
    resultado = 2 * (resultado1 + resultado2);
    resultadoPosible = ((Factorial(26) / (Factorial(26 - 5) * 120))/ (Factorial(52) / (Factorial(52 - 5) * 120))) * 2;
    resultadoTotal = [resultado, resultadoPosible];
    return resultadoTotal;
  }
}

function CalcularCombinatoriaEscaleraReal(n1, n2) {
  if (n1.value == "KING" || n1.value == "QUEEN" || n1.value == "JACK" || n1.value == "10" || n1.value == "ACE") {
    if (n2.value == "KING" ||n2.value == "QUEEN" || n2.value == "JACK" || n2.value == "10" || n2.value == "ACE") {
      if(n1.suit == n2.suit) {
        // me sirven las 2
        let resultadoNumerador = (47 * 46)
        let resultadoDenominador = (Factorial(50) / (Factorial(50 - 5) * Factorial(5)));
        let resultado = [resultadoNumerador, resultadoDenominador];
        return resultado;
      }
      // me sirven las 2 pero son de distinto palo
      let resultadoNumerador = 2 * 46;
      let resultadoDenominador = (Factorial(50) / (Factorial(50 - 5) * Factorial(5)));
      let resultado = [resultadoNumerador, resultadoDenominador];
      return resultado;
    } 
    else {
      // me sirve solo n1
      let resultadoNumerador = 46;
      let resultadoDenominador = (Factorial(50) / (Factorial(50 - 5) * Factorial(5)));
      let resultado = [resultadoNumerador, resultadoDenominador];
      return resultado;
    }
  } 
  else if (n2.value == "KING" ||n2.value == "QUEEN" ||n2.value == "JACK" ||n2.value == "10" ||n2.value == "ACE") {
    // me sirve solo n2
    let resultadoNumerador = 2 * 46;
    let resultadoDenominador = (Factorial(50) / (Factorial(50 - 5) * Factorial(5)));
    let resultado = [resultadoNumerador, resultadoDenominador];
    return resultado;
  } 
  else {
    // no me sirve ninguna
    let resultadoNumerador = 4
    let resultadoDenominador = (Factorial(50) / (Factorial(50 - 5) * Factorial(5)));
    let resultado = [resultadoNumerador, resultadoDenominador];
    return resultado;
  }
}
