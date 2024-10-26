from flask import Flask, flash, redirect, render_template, request, session, g, jsonify
import sqlite3
import pandas as pd


app = Flask(__name__)
items_df = pd.read_csv("backend/items.csv")


@app.route('/', methods=["POST"])
def ItemLocation():
    item = request.form.get("item")
    item.lower()
    all_items = items_df["item"]
    for x in all_items:
        x.lower()

    if item not in all_items:
        return jsonify("Sorry, This item is not availabe in the store")
    else:
        return jsonify(items_df[["item","price","aisle","column","row"]])