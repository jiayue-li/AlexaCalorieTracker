//
//  calorieLog.swift
//  CalorieTracker
//
//  Created by Sera Yang on 1/22/17.
//  Copyright © 2017 CalorieCounter. All rights reserved.
//

import UIKit

class caloriesLog: UIViewController{
    @IBOutlet weak var numFoodsField: UITextField!
    @IBOutlet weak var typeFoodsField: UITextField!

    @IBOutlet weak var logField: UITextView!
    
    var logText = "Log:"
    
    @IBAction func addLog(_ sender: Any) {
        var numFoods = numFoodsField.text
        var typeFood = typeFoodsField.text
        logText = logText + "\n" + numFoods! + " " + typeFood!
        logField.text = logText

    }
    
}
