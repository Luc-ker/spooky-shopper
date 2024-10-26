from flask import Flask, request, jsonify
import pandas as pd
from fuzzywuzzy import fuzz

app = Flask(__name__)

try:
    items_df = pd.read_csv("backend/items.csv")
except Exception as e:
    raise Exception("Error reading items.csv: {}".format(e))

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
        if x == item: 
            result.append(x)

    if len(result) == 0:
        print("no items")
        return jsonify({'message': "Sorry, this item is not available in the store"}), 400
    else:
        results_df = items_df[items_df["item"].str.lower().isin(result)]
        print("got items")
        print(results_df[["item", "price", "aisle", "column", "row"]].to_dict(orient='records'))
        return jsonify(results_df[["item", "price", "aisle", "column", "row"]].to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=8001)