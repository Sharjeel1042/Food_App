import os
import json

# Load the nutrition database JSON and normalize keys to underscore_lowercase
_here = os.path.dirname(__file__)
_db_path = os.path.join(_here, "nutrition_db.json")

try:
    with open(_db_path, "r", encoding="utf-8") as f:
        _raw = json.load(f)
except FileNotFoundError:
    _raw = {}

food_nutrition_data = {}
for k, v in _raw.items():
    # normalize the key so it matches directory/class naming used in the images/ folder
    key = k.replace(" ", "_").replace("-", "_").lower()
    food_nutrition_data[key] = v


def get_nutrition_by_name(name: str):
    """Return nutrition dict for a food name. Name matching is case-insensitive and
    spaces/underscores are normalized.
    """
    if not name:
        return None
    key = name.replace(" ", "_").replace("-", "_").lower()
    return food_nutrition_data.get(key)

