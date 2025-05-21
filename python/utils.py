def show(_curent_position):
    symbols = {1: 'X', -1: 'O', 0: '.'}
    for row in _curent_position:
        print(' '.join(symbols[val] for val in row))

def colinear(p_list):
    ax = p_list[0][0]
    ay = p_list[0][1]

    bx = p_list[1][0]
    by = p_list[1][1]

    cx = p_list[2][0]
    cy = p_list[2][1]

    det = ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)
    return det == 0


def parse_coordinates(dep):
    # exemple ('00','10')
    i_origin = int(dep[0][0])  # origin
    j_origin = int(dep[0][1])
    i_target = int(dep[1][0])  # target
    j_target = int(dep[1][1])

    return i_origin, j_origin, i_target, j_target


def valid_move(dep, position, _start, turn):
    # Vérifier que dep est de la forme ('xy','ij') où x,y,i,j € [0,1,2[
    # Vérifier que dep est un tuple de deux chaînes de 2 caractères
    if not isinstance(dep, tuple) or len(dep) != 2:
        return False
    if not all(isinstance(coord, str) and len(coord) == 2 for coord in dep):
        return False

    # Vérifier que chaque caractère dans les deux chaînes est un chiffre entre 0 et 2
    for coord in dep:
        for c in coord:
            if c not in '012':
                return False

    # Récup les coordonnées
    io, jo, it, jt = parse_coordinates(dep)

    # Vérifier que l'origine a la bonne pièce
    side = 1 if turn % _start == 0 else -1

    if position[io][jo] != side:
        return False

    # Vérifier que la case cible est libre
    if position[it][jt] != 0:
        return False

    # Au centre, la piece peut aller dans toutes les diréctions
    if dep[0] == '11':
        return True

    # Diagonales interdites
    if ((io + jo) % 2 == 1) and ((it + jt) % 2 == 1):
        return False

    # Vérifier qu'on ne saute pas de case
    cond1 = (io - it)**2 < 2
    cond2 = (jo - jt)**2 < 2

    if cond1 and cond2:
        return True

    # Autre
    return False

