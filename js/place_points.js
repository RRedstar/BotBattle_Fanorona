table = document.getElementById("game");
run_btn = document.getElementById("run-btn");

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

    // Nettoyer la table
    for (c in global_position){
        child = global_position[c];
        if (child == "")
            continue
        table.removeChild(child);
    }

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
    det = ax*(by-cy) + bx*(cy-ay) + cx*(ay-by);
    return det == 0;
}

initialise_points(
    [[-1,-1,-1],
     [ 0, 0, 0],
     [ 1, 1, 1]]
);

function run_script(){
    console.log("Script ran!");
}

run_btn.onclick = run_script;