//
//  caloriesIn.swift
//  CalorieTracker
//
//  Created by Sera Yang on 1/22/17.
//  Copyright © 2017 CalorieCounter. All rights reserved.
//

import UIKit

class caloriesIn: UIViewController{
    let dictionary : [String:Int] = [
        "apple" : 95,
        "apple pie": 67,
        "apricot": 17,
        "artichoke": 60,
        "asparagus": 60,
        "avocado": 234,
        "baked salmon": 200,
        "banana" : 105,
        "beef": 213,
        "beets": 75,
        "blackberries": 62,
        "bologna": 140,
        "brisket": 178,
        "broccoli": 85,
        "brownies": 132,
        "brussel sprouts": 38,
        "cabbage": 70,
        "caesar salad": 94,
        "cantaloupe": 160,
        "cauliflower": 55,
        "carrot": 60,
        "celery": 10,
        "cherries": 85,
        "chicken": 335,
        "chicken noodle soup": 87,
        "chocolate strawberries": 140,
        "chocolate": 235,
        "chorizo": 273,
        "clam chowder": 301,
        "corn": 75,
        "cranberries": 60,
        "cucumber": 40,
        "dark chocolate": 155,
        "eggplant": 60,
        "frozen yogurt": 159,
        "fruit salad": 124,
        "grapes": 115,
        "grapefruit": 75,
        "grilled chicken": 335,
        "hamburger": 354,
        "honeydew": 400,
        "kale": 70,
        "kiwi": 55,
        "leek": 40,
        "mango" : 201,
        "mashed potatoes": 214,
        "mushrooms": 40,
        "nectarine": 70,
        "onion": 60,
        "orange" : 45,
        "papaya": 150,
        "peach" : 59,
        "peanut brittle": 138,
        "pear": 100,
        "peppers": 45,
        "pepperoni": 273,
        "pickle": 25,
        "pineapple": 75,
        "pizza": 285,
        "pork": 216,
        "pot roast": 252,
        "ribs": 299,
        "salami": 230,
        "salmon": 330,
        "sirloin": 153,
        "spaghetti": 221,
        "spinach": 55,
        "steak": 679,
        "tangerine": 43,
        "tomato": 55,
        "tripe": 53,
        "turnips": 60,
        "t-bone": 182,
        "watermelon" : 85,
        "vanilla": 137,
        "veggie burger": 124,
        "zucchini": 60]
    
    @IBOutlet weak var check: UIButton!
    @IBOutlet weak var food: UITextField!
    @IBOutlet weak var calories: UILabel!
    
    
    @IBAction func convertCalories(_ sender: Any) {
        let f = String(food.text!) ?? "none"
        
        if let temp = dictionary[f] {
            calories.text = String(dictionary[f]!) + " calories"
        }
        else
        {
            calories.text = "N/A"
        }
    }
    
}
