def interpolate_linear(x1, y1, x2, y2, x):
    """Interpolation linéaire simple entre deux points"""
    if x2 - x1 == 0:
        return y1
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1)

def get_y_equilibre(x, x_data, y_data):
    """Trouve la valeur y correspondante sur la courbe d'équilibre"""
    for i in range(len(x_data)-1):
        if x_data[i] <= x <= x_data[i+1]:
            return interpolate_linear(x_data[i], y_data[i], x_data[i+1], y_data[i+1], x)
    return None

def calcul_rmin(xf, q, xd):
    # Données d'équilibre avec virgules décimales
    data_str = """100,00 0,0000 0,0000
96,40 0,0200 0,1340
93,50 0,0400 0,2300
91,20 0,0600 0,3040
89,30 0,0800 0,3650
87,70 0,1000 0,4180
84,40 0,1500 0,5170
81,70 0,2000 0,5790
78,00 0,3000 0,6650
75,30 0,4000 0,7290
73,10 0,5000 0,7790
71,20 0,6000 0,8250
69,30 0,7000 0,8700
67,60 0,8000 0,9150
66,00 0,9000 0,9580
65,00 0,9500 0,9790
64,50 1,0000 1,0000"""
    
    # Conversion des données en listes en gérant les virgules décimales
    x_data = []
    y_data = []
    for line in data_str.split('\n'):
        T, x, y = line.split()
        x_data.append(float(x.replace(',', '.')))
        y_data.append(float(y.replace(',', '.')))
    
    # Calcul de la droite d'opération pour l'enrichissement à Rmin
    min_diff = float('inf')
    best_slope = 0
    best_x = 0
    best_y = 0
    
    # Parcours de la courbe d'équilibre pour trouver le point de tangence
    for i in range(len(x_data)-1):
        x_current = x_data[i]
        y_current = y_data[i]
        
        if xd - x_current < 1e-10:
            continue
            
        # Calcul de la pente de la droite d'enrichissement
        slope = (xd - y_current)/(xd - x_current)
        
        # Vérification si cette droite est tangente
        is_valid = True
        max_violation = 0
        
        # Test de plusieurs points sur la courbe d'équilibre
        for x_test in x_data:
            if x_test >= x_current and x_test <= xd:
                y_line = y_current + slope * (x_test - x_current)
                y_eq = get_y_equilibre(x_test, x_data, y_data)
                
                if y_eq is not None:
                    if y_line < y_eq:  # La droite ne doit pas couper la courbe
                        violation = y_eq - y_line
                        if violation > max_violation:
                            max_violation = violation
                            is_valid = False
        
        if is_valid and (max_violation < min_diff):
            min_diff = max_violation
            best_slope = slope
            best_x = x_current
            best_y = y_current
    
    # Calcul de Rmin
    if abs(best_slope - 1) < 1e-10:
        print("Le taux de reflux minimum (Rmin) est infini")
        return float('inf')
    else:
        Rmin = best_slope/(1-best_slope)
        print(f'Le taux de reflux minimum (Rmin) est : {Rmin:.4f}')
        print(f'Point de tangence : x = {best_x:.4f}, y = {best_y:.4f}')
        return Rmin

if __name__ == "__main__":
    # Pour q = 1 (alimentation à température d'ébullition)
    # xf = fraction dans l'alimentation
    # xd = fraction souhaitée dans le distillat
    Rmin = calcul_rmin(xf=0.4, q=1.0, xd=0.95)
