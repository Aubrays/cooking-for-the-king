/*

Problème:

Fonction asynchrone qui lit le fichier JSON. Le but de cette fonction est de récupérer facilement et 
humainement des légumes dans le spritesheet afin de pouvoir des légumes dans les tiroirs aléatoirement.

Solution à trouver: exporter le JSON de l'atlas dans l'HTML et le récupérer directement dans le game

Cette fonction serait le pilier de la recherche de ces légumes dans cette base de données (le sprite).

*/ 

var food;

async function getFood(name) {
    fetch('/assets/sprites/foods_atlas.json')
        .then(r => r.json())
        .then(r => {
            // on attribue un nom de légume humain a une coordonnée dans l'atlas
              food = {
                patate: r.frames[0],
                panais: r.frames[4],
                botteCarotte: r.frames[5],
                carotte: r.frames[6],
                radis: r.frames[8],
                betterave: r.frames[9],
                rave: r.frames[10],
                oignon: r.frames[13],
                ail: r.frames[15],
                poireau: r.frames[16],
                pasteque: r.frames[23],
                melon: r.frames[24],
                citrouille: r.frames[27],
            }[name];
        });
}