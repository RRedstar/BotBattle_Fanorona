function valid_move(start, end){
    // Vérifier que les coordonnées sont comprises dans le range
    let keys = Object.keys(global_position);
    if (keys.indexOf(start) == -1)
        return false
    if (keys.indexOf(end) == -1)
        return false

    let x_start = parseInt(start[0]);
    let y_start = parseInt(start[1]);
    let x_end = parseInt(end[0]);
    let y_end = parseInt(end[1]);

    // Vérifier si end est libre
    if (global_position[end] != "")
        return false;

    // Vérifier que start contient un point
    if (global_position[start] == "")
        return false;
    

    // Au centre le point peut aller dans toutes les direction
    if (start == "11")
        return true;

    // Diagonales interdies
    let start_sum = x_start + y_start
    let end_sum = x_end + y_end;

    if (start_sum%2==1 && end_sum%2==1)
        return false;

    // Vérifie qu'on ne saute pas de case
    let cond1 = (x_start-x_end)*(x_start-x_end) < 2;
    let cond2 = (y_start-y_end)*(y_start-y_end) < 2;
    console.log(cond1 & cond2);

    if (cond1 && cond2)
        return true;

    // Autre
    return false
}

function move(origin, target){
    // exemple: move("00","01")
    // Check si le déplacement est valide
    let can_move = valid_move(origin, target);

    if (!can_move) {
        console.log("Mouvement non valide : '" + origin + "' to '" + target + "'!");
        return;
    }

    // Si oui, on déplace le point
    // Récupérer les nouveaux coordonées
    let new_coord = coordinates[target];
    let left = new_coord[0];
    let top = new_coord[1];

    // Récupérer le point et le déplacer
    let point = global_position[origin];

    point.style.left = left + "px";
    point.style.top = top + "px";

    // Mettre à jour global_position
    global_position[origin] = "";
    global_position[target] = point;

    // Mettre à jour la matrice
    let x_origin = parseInt(origin[0]);
    let y_origin = parseInt(origin[1]);
    let x_target = parseInt(target[0]);
    let y_target = parseInt(target[1]);

    side = point.className.search('-1') == -1 ? 1 : -1;
    current_position[x_origin][y_origin] = 0;
    current_position[x_target][y_target] = side;

    console.log("'" + origin + "' to '" + target + "'!");

    winner(current_position);
}