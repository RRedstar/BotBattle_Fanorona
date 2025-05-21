from utils import parse_coordinates

def valid_move(dep):
    # Récup les coordonnées
    io, jo, it, jt = parse_coordinates(dep)

    # Diagonales interdites
    if ((io + jo) % 2 == 1) and ((it + jt) % 2 == 1):
        return False

    # Vérifier qu'on ne saute pas de case
    cond1 = (io - it) ** 2 < 2
    cond2 = (jo - jt) ** 2 < 2

    if cond1 and cond2:
        return True

    # Autre
    return False

def main(position, side):
    for i in range(3):
        for j in range(3):
            # chercher un pion à déplacer
            if position[i][j] == side:
                origin = f"{i}{j}"
                # tester toutes les cases libres
                for x in range(3):
                    for y in range(3):
                        if position[x][y] == 0:
                            target = f"{x}{y}"
                            dep = (origin, target)
                            if valid_move(dep):
                                return dep