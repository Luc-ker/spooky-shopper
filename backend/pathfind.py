from math import sqrt
    
def shortestPythagoras(list, start=(0,0)):
    print(len(list))
    if len(list) == 0:
        return list
    else:
        lowest = float("inf")
        item = None
        for i in list:
            distance = pythagCalc((i.aisle, i.column), start)
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
    distance = sqrt((coord2[0]-coord1[0])**2 + (coord2[1]-coord1[1])**2)
    if (coord1[0]==coord2[0]) or (coord1[1]==coord2[1]):
        distance /= 2
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
