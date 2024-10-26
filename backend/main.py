from flask import Flask, request, jsonify
import pandas as pd
from fuzzywuzzy import fuzz


app = Flask(__name__)
items_df = pd.read_csv("backend/items.csv")


@app.route('/', methods=["POST"])
def ItemLocation():
    result = []
    item = request.form.get("item")
    item = item.lower()
    all_items = items_df["item"]
    for x in all_items:
        if fuzz.ratio(item, x) > 50:
            result.append(x)

    if len(result) == 0:
        return jsonify("Sorry, This item is not availabe in the store")
    else:
        results_df = items_df[items_df["item"].isin(result)]
        return jsonify(results_df[["item","price","aisle","column","row"]])
    

if __name__ == '__main__':
    app.run(debug=True, port=8001)