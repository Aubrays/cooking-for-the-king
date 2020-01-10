export const getActualStat = (scene, stat) => ({
    "heat": scene.char.data.values.healthStats.heatStart + scene.dish.heat,
    "moistness" : scene.char.data.values.healthStats.moistnessStart + scene.dish.moistness,
    "wealth" : scene.char.data.values.wealth - scene.dish.cost    
})[stat]