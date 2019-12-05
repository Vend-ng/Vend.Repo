def getNearbyMachines(radius, lat, long):
    q_string = '{'
    
    q_string += f"nearbyMachines(radius:{radius}, latitude:{lat}, longitude:{long})"
    q_string += "{ id, latitude, longitude }"
    q_string += "}"

    return q_string

