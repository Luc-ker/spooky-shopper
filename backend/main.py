from flask import Flask, request, jsonify
import pandas as pd
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
    def __init__(self, food, aisle, row, column, price):
        self.price = price
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
            if distance < lowest:
                item = i
                lowest = distance
                newStart = i.coords
        if item != None:
            list.remove(item)
        return [item] + shortestPythagoras(list, newStart)

app = Flask(__name__)

try:
    items_df = pd.read_csv("backend/items.csv")
except Exception as e:
    raise Exception("Error reading items.csv: {}".format(e))

# The request handlers
@app.route('/', methods=["POST"])
def item_location():
    
    item = request.json.get("item")

    if item is None:
        print("item is empty")
        return jsonify("Item not provided"), 400 
    
    item = item.lower() 
    all_items = items_df["item"].str.lower()
    result = []
    for x in all_items:
        if item in x:
            result.append(x)

    if len(result) == 0:
        print("no items")
        return jsonify({'message': "Sorry, this item is not available in the store"}), 400
    else:
        results_df = items_df[items_df["item"].str.lower().isin(result)]
        
        return jsonify(results_df[["item", "price", "aisle", "column", "row"]].to_dict(orient='records'))


@app.route('/mapScreen', methods=["POST"])
def main():

    shopping_list = request.json.get("shopping_list")

    pixelSize = 25
    mapArray = []

    with open("backend/coordinates.txt", "r") as f1:
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
                mapArray[x+shrinked[0]][shrinked[1]+y] = ShelfCell(aisle.num)

    list = [Item(x["item"], x["aisle"], x["row"], x["column"], x["price"]) for x in shopping_list]
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

    itemCells = shortestPythagoras(itemCells)
    foods = []
    locations = []
    for cell in itemCells:
        food = cell.item
        food.printDetails()
        print(cell.coords)
        foods.append(food.food)
        aisle = aisles[food.aisle-1]
        if aisle.height > aisle.length:
            locations.append((aisle.x+pixelSize//2, aisle.y+food.column*pixelSize+pixelSize//2))
        else:
            locations.append((aisle.x+food.column*pixelSize+pixelSize//2, aisle.y+pixelSize//2))
    print(locations)

    items_dic = dict(zip(foods, locations))

    return jsonify(items_dic)


if __name__ == '__main__':
    app.run(debug=True, port=8001)