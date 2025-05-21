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

    if (cond1 && cond2)
        return true;

    // Autre
    return false
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function arraysDifferents(a, b) {
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return true;
  }
  return false;
}

function winner(pos){
    // Détermine si le jeu est terminé ou non    
    let initial_p1 = arraysDifferents(pos[2], [ 1, 1, 1]);   
    let initial_p2 = arraysDifferents(pos[0], [-1,-1,-1]);  

    // Récupère les points de chaque joueur
    let p1 = [];
    let p2 = [];

    // Parcourir les points dans la position actuelle
    for (let r = 0; r < pos.length; r++){
        // pour chaque ligne
        let row = pos[r];
        for (let c = 0; c < row.length; c++){
            // pour chaque colonne récup la valeur du point
            let side = row[c];

            if (side == 0)
                continue
            
            p = [r,c]
            side == 1 ? p1.push(p) : p2.push(p)
        }
    }

    return
    // déterminer si p1 gagne
    if (colinear(p1) && initial_p1){
        alert("Le Joueur 1 a gagné!");
        initialise_points(
            [[-1,-1,-1],
            [ 0, 0, 0],
            [ 1, 1, 1]]
        );
        return
    }
        

    // déterminer si p2 gagne
    else if (colinear(p2) && initial_p2){
        alert("Le Joueur 2 a gagné!");

        initialise_points(
            [[-1,-1,-1],
            [ 0, 0, 0],
            [ 1, 1, 1]]
        );
        return
    }
        
}


function move(origin, target){
    // exemple: move("00","01")
    // Check si le déplacement est valide
    let can_move = valid_move(origin, target);

    if (!can_move) {
        alert("Mouvement non valide : '" + origin + "' to '" + target + "'!");
        return false;
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

    winner(current_position);
    return true    
}

async function make_me_win(){
    move('00','11');
    await sleep(600);
    move('20','10');
    await sleep(600);
    move('11','12');
    await sleep(600);
    move('10','00');
    await sleep(600);
    move('01','11');
    await sleep(600);
    move('21','20');
    await sleep(600);
    move('11','21');
    await sleep(600);
    move('20','11');
}