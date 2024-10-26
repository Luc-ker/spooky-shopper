class Item():
    def __init__(self, type, food, aisle, row, column):
        self.type = type
        self.food = food
        self.aisle = aisle
        self.row = row
        self.column = column

    def printDetails(self):
        print(self.type, self.food, self.aisle, self.row, self.column)

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
list.sort(key=lambda x: (x.aisle, x.column, x.row))
for item in list:
    item.printDetails()
