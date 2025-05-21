import player
import level1
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

def parse_coordinates(dep):
	# exemple ('00','10')
	i_origin = int(dep[0][0])  # origin
	j_origin = int(dep[0][1])
	i_target = int(dep[1][0])  # target
	j_target = int(dep[1][1])

	return i_origin, j_origin, i_target, j_target


def valid_move(dep, turn):
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
	side = turn % _start == 0 and 1 or -1
	if _curent_position[io][jo] != side:
		return False

	# Vérifier que la case cible est libre
	if _curent_position[it][jt] != 0:
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


def update_position(dep):
	io, jo, it, jt = parse_coordinates(dep)

	_curent_position[it][jt] = _curent_position[io][jo]
	_curent_position[io][jo] = 0


def simulate():
	story = []

	# Simuler un jeu de 100 tours
	for turn in range(100):
		# Si le nombre de tour est impair, c'est au tours du joueur
		move_calc = turn % _start == 0 and player.main or level1.main

		# Calculer le deplacement
		dep = move_calc(_curent_position)

		# Vérifier si le deplacement est valide
		if not valid_move(dep, turn):
			print(f"Mouvement invalide : {dep}")

		# Effectuer le deplacement et mettre à jour la position actuelle
		update_position(dep)

		# Enregistrer le déplacement
		story.append(dep)

	# pour chaque boucle, faire appele à la fonction main de chaque joueur

	# S'il y a une erreur, casser la boucle
