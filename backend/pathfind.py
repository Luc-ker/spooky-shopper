from math import sqrt

class Aisle():
    def __init__(self, x, y, length, height, num):
        self.x = x
        self.y = y
        self.length = length
        self.height = height
        self.num = num

    def printDetails(self):
        print(self.x, self.y, self.length, self.height, self.num)

class Item():
    def __init__(self, type, food, aisle, row, column):
        self.type = type
        self.food = food
        self.aisle = aisle
        self.row = row
        self.column = column

    def printDetails(self):
        print(self.food, self.aisle, self.column, self.row)

class Cell():
    def __init__(self):
        self.state = "0"
        self.aisle = -1

    def set_state(self, state, aisle=-1):
        self.state = state
        if aisle != -1:
            self.aisle = aisle
    
    def print_details(self):
        print(self.state, self.aisle)

    def return_self(self):
        return f"| {self.state} "

class ShelfCell(Cell):
    def __init__(self, aisle):
        super().__init__()
        self.state = "X"
        self.aisle = aisle
        self.has_item = False
        self.item = None
        self.coords = (-1,-1)
        
    def set_item(self, item, coords):
        self.state = "O"
        self.has_item = True
        self.coords = coords
        self.item = item
        return self

def findMaxWidth(array):
    maxXstart = max([item.x for item in array])
    maxLength = max([item.length for item in array if item.x == maxXstart])
    return maxXstart + maxLength

def findMaxHeight(array):
    maxYstart = max([item.y for item in array])
    maxHeight = max([item.height for item in array if item.y == maxYstart])
    return maxYstart + maxHeight
def pythagCalc(coord1, coord2):
    # first number is vertical, second number is horizontal
    if coord1 == (0,0):
        distance = coord2[0] + coord2[1]
    elif (coord1[1] != coord2[1]):
        distance = abs(coord2[1]-coord1[1])
        distance += abs(coord2[0]-coord1[0])
        # distance = min([aisleLength-coord1[0], coord1[0]])
        # if distance == coord1 and distance == (aisleLength-coord1[0]):
        #     distance += min([aisleLength-coord2[0], coord2[0]])
        # elif distance == coord1[0]:
        #     distance += coord2[0]
        # else:
        #     distance += aisleLength-coord2[0]
        # distance += abs(coord2[1]-coord1[1])
    elif (coord1[1] == coord2[1]):
        distance = abs(coord2[0]-coord1[0])
    return distance

def shortestPythagoras(list, start=(0,0)):
    if len(list) == 0:
        return list
    else:
        lowest = float("inf")
        item = None
        for i in list:
            distance = pythagCalc(start, i.coords)
            # print(distance)
            if distance < lowest:
                item = i
                lowest = distance
                newStart = i.coords
        if item != None:
            list.remove(item)
        return [item] + shortestPythagoras(list, newStart)
    
# def write_array_to_file(array):
#     with open("C:\\Users\\jlee4\\Documents\\shopping-list-sorter\\backend\\map.txt", "a") as f2:
#         for x in array:
#             for cell in x:
#                 f2.write(f"{cell.return_self()}")
#             f2.write("|\n")

# def print_array(array):
#     for x in array:
#         for cell in x:
#             print(cell.return_self(), end="")
#         print("|")

def main():
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
    aisleLength = 11
    pixelSize = 25
    mapArray = []

    with open("C:\\Users\\jlee4\\Documents\\shopping-list-sorter\\backend\\coordinates.txt", "r") as f1:
        aisles = []
        aisle = 1
        for line in f1:
            newline = [int(x) for x in line.split(",")]
            aisles.append(Aisle(newline[0], newline[1], newline[2], newline[3], aisle))
            aisle += 1
        aisles = sorted(aisles, key=lambda item : (item.x, item.y))

    x_boxes = (findMaxWidth(aisles)//pixelSize) + 2
    y_boxes = (findMaxHeight(aisles)//pixelSize) + 2

    for x in range(x_boxes):
        mapArray.append([Cell()]*y_boxes) # aisle gets set later

    for aisle in aisles:
        shrinked = [aisle.x//25, aisle.y//25, aisle.length//25, aisle.height//25]
        for x in range(shrinked[2]):
            for y in range(shrinked[3]):
                if shrinked[2] < shrinked[3]:
                    aisle_num = aisle.num*2+x-1
                else:
                    aisle_num = aisle.num*2+y-1
                mapArray[x+shrinked[0]][shrinked[1]+y] = ShelfCell(aisle_num)

    list = [Item(x[0], x[1], x[3], x[4], x[5]) for x in list]
    itemCells = []
    for item in list:
        aisleCells = []
        coords = []
        for x, i in enumerate(mapArray):
            for y, cell in enumerate(i):
                if cell.aisle == item.aisle:
                    aisleCells.append(cell)
                    coords.append((x,y))
        aisleCells[item.column-1] = aisleCells[item.column-1].set_item(item, coords[item.column-1])
        itemCells.append(aisleCells[item.column-1])
        print(coords[item.column-1])

    itemCells = shortestPythagoras(itemCells)
    for cell in itemCells:
        cell.item.printDetails()
        print(cell.coords)

if __name__ == '__main__':
    main()
