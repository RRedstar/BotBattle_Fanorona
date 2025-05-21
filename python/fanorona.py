import player
import level1
from utils import parse_coordinates, colinear, valid_move, show

_global_position = {
    '00': -1,
    '01': -1,
    '02': -1,
    '10': 0,
}

# Qui commence? 2 pour player et 1 pour IA
_start = 2

# Position initiale
_curent_position = [
    [-1,-1,-1],
    [ 0, 0, 0],
    [ 1, 1, 1],
]


def update_position(dep):
    io, jo, it, jt = parse_coordinates(dep)

    _curent_position[it][jt] = _curent_position[io][jo]
    _curent_position[io][jo] = 0

def is_winner():
    # Exclure la position initiale
    initial_p1 = _curent_position[2] != [ 1, 1, 1]
    initial_p2 = _curent_position[0] != [-1,-1,-1]

    # Récupérer les coordonnées de chaque partie
    p1, p2 = [], []
    for i in range(3):
        for j in range(3):
            p = (i,j)
            v = _curent_position[i][j]

            if v == 1 : p1.append(p)
            if v == -1: p2.append(p)

    if colinear(p1) and initial_p1:
        print("Side 1 winner!")
        return 1

    if colinear(p2) and initial_p2:
        print("Side -1 winner!")
        return -1

    return 0

def simulate():
    story = []
    w = 0

    # Simuler un jeu de 100 tours
    for turn in range(50):
        # Si le nombre de tours est impair, c'est au tour du joueur
        move_calc = turn % _start == 0 and player.main or level1.main
        side = 1 if turn % _start == 0 else -1

        # Calculer le déplacement
        dep = move_calc(_curent_position, side)

        # Vérifier si le déplacement est valide
        if not valid_move(dep, _curent_position, _start, turn):
            print(f"Mouvement invalide : {dep}")
            break

        # Effectuer le déplacement et mettre à jour la position actuelle
        update_position(dep)

        # Enregistrer le déplacement
        story.append(dep)

        # Calculer le winner
        w = is_winner()
        print("*"*50)
        print(f"Tour n° {turn}")
        show(_curent_position)

        if w != 0:
            break



    story.append(w)


if __name__=="__main__":
    simulate()