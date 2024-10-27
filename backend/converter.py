with open("backend/coordinates.txt", "r") as f1:
    for line in f1:
        with open("backend/coordinates_doubled", "a") as f2:
            f2.write(line)
            f2.write(line)