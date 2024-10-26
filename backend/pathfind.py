from math import sqrt

aisleLength = 11

def shortestPythagoras(list, start=(0,0)):
    if len(list) == 0:
        return list
    else:
        lowest = float("inf")
        item = None
        for i in list:
            distance = pythagCalc(start, (i.aisle, i.column))
            print(distance)
            if distance < lowest:
                item = i
                lowest = distance
                newStart = (i.aisle, i.column)
        if item != None:
            list.remove(item)
        return [item] + shortestPythagoras(list, newStart)

def pythagCalc(coord1, coord2):
    print(coord1, coord2)
    if (coord1[0] != coord2[0]):
        distance = min([aisleLength-coord1[1], coord1[1]])
        if distance == coord1 and distance == (aisleLength-coord1[1]):
            distance += min([aisleLength-coord2[1], coord2[1]])
        elif distance == coord1:
            distance += coord2[1]
        else:
            distance += aisleLength-coord2[1]
        distance += abs(coord2[0]-coord1[0])
    elif (coord1[0] == coord2[0]):
        distance = abs(coord2[1]-coord1[1])
    else:
        distance = sqrt((coord2[0]-coord1[0])**2 + (coord2[1]-coord1[1])**2)
    return distance

class Item():
    def __init__(self, type, food, aisle, row, column):
        self.type = type
        self.food = food
        self.aisle = aisle
        self.row = row
        self.column = column

    def printDetails(self):
        print(self.food, self.aisle, self.column, self.row)

list = [
    ["Food","Flour",1.20,1,2,6],
    ["Dairy","Ice Cream",3.50,4,1,2],
    ["Food","Banana",0.30,1,1,2],
    ["Beverages","Water",0.50,2,1,1],
    ["Food","Grapes",2.00,1,1,4],
    ["Dairy","Cream Cheese",2.00,4,1,4],
    ["Dairy","Milk Alternative",2.50,4,1,3],
    ["Beverages","Soda",1.00,2,1,2],
    ["Food","Orange",0.40,1,1,3],
    ["Beverages","Coffee",3.00,2,1,3]
]

list = [Item(x[0], x[1], x[3], x[4], x[5]) for x in list]
list = shortestPythagoras(list)
for item in list:
    item.printDetails()
