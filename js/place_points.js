table = document.getElementById("game");

const t_size = 300; //dimension de la table
const p_size = 10; //taille du point/2

let initial_position = [[-1,-1,-1],
                        [ 0, 0, 0],
                        [ 1, 1, 1]];

let current_position = [[-1,-1,-1],
                        [ 0, 0, 0],
                        [ 1, 1, 1]];

let global_position = {
    "00": "",
    "01": "",
    "02": "",

    "10": "",
    "11": "",
    "12": "",

    "00": "",
    "01": "",
    "02": "",
}

const coordinates = {
    "00": [-p_size, -p_size], //left, top
    "01": [-p_size+t_size/2, -p_size],
    "02": [-p_size+t_size, -p_size],

    "10": [-p_size, -p_size+t_size/2],
    "11": [-p_size+t_size/2, -p_size+t_size/2],
    "12": [-p_size+t_size, -p_size+t_size/2],

    "20": [-p_size, -p_size+t_size],
    "21": [-p_size+t_size/2, -p_size+t_size],
    "22": [-p_size+t_size, -p_size+t_size],
}

function create_point(side, coordinate){
    let point = document.createElement("div");
    point.setAttribute("class","point p" + side);
    
    point.style.left = coordinates[coordinate][0] + "px";
    point.style.top = coordinates[coordinate][1] + "px";

    table.appendChild(point);

    return point
}

function initialise_points(position){
    // param : [[-1, -1, -1],
    //          [ 0,  0,  0], 
    //          [ 1,  1,  1]]
    //-1 : ennemy_point
    // 1 : own_point
    // 0 : libre

    // Parcourir la matrice de position
    for (let r = 0; r < position.length; r++){
        // pour chaque ligne
        let row = position[r];
        for (let c = 0; c < row.length; c++){
            // pour chaque colonne récup la valeur du point
            let side = row[c];

            if (side == 0)
                continue
            
            let coord = String(r)+String(c)

            let point_element = create_point(side, coord);
            global_position[coord] = point_element;

        }
    }   
}


function colinear(p_list){
    ax = p_list[0][0];
    ay = p_list[0][1];

    bx = p_list[1][0];
    by = p_list[1][1];

    cx = p_list[2][0];
    cy = p_list[2][1];

    // Calculer le det
    det = ax*(by-cy) + bx*(cy-ay) + cx*(ay-by)

    return det == 0;
}

function winner(pos){
    // Détermine si le jeu est terminé ou non    
    let initial_p2 = pos[0] != [-1,-1,-1];
    let initial_p1 = pos[2] != [ 1, 1, 1];    

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

            side == 1 ? p1.push((r,c)) : p2.push((r,c))
        }
    }

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

initialise_points(
    [[-1,-1,-1],
     [ 0, 0, 0],
     [ 1, 1, 1]]
);

// move('00','11')
// move('20','10')
// move('11','12')
// move('10','00')
// move('01','11')
// move('21','20')
// move('11','21')
// move('20','11')
// 