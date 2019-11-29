let characters = {
    characters: [
      {
        name: 'Patrick',
        path: 'assets/chars/char1',
        stats: 
          {
            heat: 15,
            moistness: -15
          }
      },
      {
        name: 'Morgana',
        path: 'assets/chars/char2',
        stats:
          {
            heat: -40,
            moistness: 20
          }
      },
      {
        name: 'Saara',
        path: 'assets/chars/char3',
        stats:
          {
            heat: 20,
            moistness: 20
          }
      }
    ]
  }
  let food = {
    food: [
      {
        name: 'moutarde',
        heat: 3,
        moistness: -3
      },
      {
        name: 'menthe',
        heat: 3,
        moistness: -3
      },
      {
        name: 'poisson frais',
        heat: 3,
        moistness: -3
      },
      {
        name: 'poireau',
        heat: 3,
        moistness: -2
      },
      {
        name: 'fenouil',
        heat: 3,
        moistness: -2
      },
      {
        name: 'oignon',
        heat: 4,
        moistness: 3
      },
      {
        name: 'aubergine',
        heat: 4,
        moistness: 3
      },
      {
        name: 'noisette',
        heat: 3,
        moistness: 1
      },
      {
        name: 'sel',
        heat: 2,
        moistness: -3
      },
      {
        name: 'vieux vin',
        heat: 2,
        moistness: -3
      },
      {
        name: 'amande',
        heat: 2,
        moistness: -2
      },
      {
        name: 'persil',
        heat: 2,
        moistness: -2
      },
      {
        name: 'coq',
        heat: 2,
        moistness: -2
      },
      {
        name: 'lièvre',
        heat: 2,
        moistness: -2
      },
      {
        name: 'vache',
        heat: 2,
        moistness: -2
      },
      {
        name: 'vin nouveau',
        heat: 2,
        moistness: -2
      },
      {
        name: 'miel',
        heat: 2,
        moistness: -2
      },
      {
        name: 'basilic',
        heat: 2,
        moistness: -1
      },
      {
        name: 'pain',
        heat: 2,
        moistness: 0
      },
      {
        name: 'perdrix / faisan',
        heat: 2,
        moistness: 0
      },
      {
        name: 'banane',
        heat: 2,
        moistness: 1
      },
      {
        name: 'panais',
        heat: 2,
        moistness: 1
      },
      {
        name: 'datte',
        heat: 2,
        moistness: 2
      },
      {
        name: 'pâtes',
        heat: 2,
        moistness: 2
      },
      {
        name: 'canard',
        heat: 2,
        moistness: 2
      },
      {
        name: 'châtaigne',
        heat: 1,
        moistness: -2
      },
      {
        name: 'chou',
        heat: 1,
        moistness: -2
      },
      {
        name: 'sauge',
        heat: 1,
        moistness: -2
      },
      {
        name: 'rave',
        heat: 1,
        moistness: -2
      },
      {
        name: 'céleri',
        heat: 1,
        moistness: -1
      },
      {
        name: 'safran',
        heat: 1,
        moistness: -1
      },
      {
        name: 'blette',
        heat: 1,
        moistness: -1
      },
      {
        name: 'figue',
        heat: 1,
        moistness: 1
      },
      {
        name: 'asperge',
        heat: 1,
        moistness: 1
      },
      {
        name: 'pois chiche',
        heat: 1,
        moistness: 1
      },
      {
        name: 'raisin sec',
        heat: 1,
        moistness: 1
      },
      {
        name: 'raisin',
        heat: 1,
        moistness: 2
      },
      {
        name: 'noisette',
        heat: 1,
        moistness: 2
      },
      {
        name: 'navet',
        heat: 1,
        moistness: 2
      },
      {
        name: 'fromage sec',
        heat: 1,
        moistness: 2
      },
      {
        name: 'sucre',
        heat: 1,
        moistness: 2
      },
      {
        name: 'olive',
        heat: 0,
        moistness: -1
      },
      {
        name: 'lait',
        heat: 0,
        moistness: 0
      },
      {
        name: 'épeautre',
        heat: 0,
        moistness: 0
      },
      {
        name: 'eau',
        heat: -4,
        moistness: 4
      },
      {
        name: 'abricot',
        heat: 2,
        moistness: 3
      },
      {
        name: 'riz',
        heat: -2,
        moistness: -3
      }
    ]
  }

console.log(characters.characters[2])
//returns a character object with updated stats
function compare(food_item,char){
    // new "heat" stat will be the sum of the existing stat and the food modifier.
    heat_res = char.stats.heat + food_item.heat
    // the same applies for moistness.
    moist_res = char.stats.moistness + food_item.moistness
    // return a character object with modified stats.
    return {"name": char.name,
            "path": char.path,
            stats:{
                "heat": heat_res,
                "moistness":moist_res}
    }
}
// log to test
console.log(compare(food.food[0], characters.characters[2]))
  