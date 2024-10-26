from flask import Flask, request, jsonify
import pandas as pd
from fuzzywuzzy import fuzz

app = Flask(__name__)

# Load items data from CSV file
try:
    items_df = pd.read_csv("backend/items.csv")
except Exception as e:
    raise Exception("Error reading items.csv: {}".format(e))

@app.route('/', methods=["POST"])
def item_location():
    # Retrieve the item from the request form
    item = request.form.get("item")
    if item is None:
        return jsonify("Item not provided"), 400  # Return error if no item provided
    
    item = item.lower()  # Convert the input to lowercase
    all_items = items_df["item"].str.lower()  # Convert all items to lowercase for comparison
    result = []

    # Loop through all items to find matches based on fuzzy matching
    for x in all_items:
        if fuzz.ratio(item, x) > 50:  # Adjust threshold as needed
            result.append(x)

    if len(result) == 0:
        return jsonify("Sorry, this item is not available in the store"), 404  # Return 404 if no matches found
    else:
        # Filter the DataFrame for the matched items
        results_df = items_df[items_df["item"].str.lower().isin(result)]
        return jsonify(results_df[["item", "price", "aisle", "column", "row"]].to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=8001)