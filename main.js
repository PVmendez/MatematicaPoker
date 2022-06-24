function Calcular() {
  let url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let card1 = document.getElementById("numero1").value;
      let card2 = document.getElementById("numero2").value;

      for (let i = 0; i < 52; i++) {
        if (card1 == data.cards[i].code) {
          for (let j = 0; j < 52; j++) {
            if (card2 == data.cards[j].code) {
              CalcularCombinatoria(data.cards[i].suit, data.cards[j].suit)

            }
          }
        }
      }
    });
}

function CalcularFactorial(n) {
  var total = 1;
  for (i = 1; i <= n; i++) {
    total = total * i;
  }
  console.log(total);
}

function CalcularCombinatoriaColor(palo1, palo2) {
  let resultado = 0;

  if (palo1 == palo2) {
    let resultado1 = CalcularFactorial(11) / CalcularFactorial(11 - 3) * 6;
    let resultado2 = CalcularFactorial(12) / CalcularFactorial(12 - 4) * 24;
    let resultado3 = CalcularFactorial(12) / CalcularFactorial(12 - 5) * 120;
    resultado = resultado1 + resultado2 + resultado3;

  }
  else {
    let resultado1 = CalcularFactorial(12) / CalcularFactorial(12 - 4) * 24;
    let resultado2 = CalcularFactorial(12) / CalcularFactorial(12 - 5) * 120;
    resultado = resultado1 + resultado2;
  }
}
