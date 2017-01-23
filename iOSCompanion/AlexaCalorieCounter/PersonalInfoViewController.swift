//
//  PersonalInfoViewController.swift
//  AlexaCalorieCounter
//
//  Created by John Yang on 1/22/17.
//  Copyright © 2017 John Yang. All rights reserved.
//

import UIKit
import Charts

class PersonalInfoViewController: UIViewController {

    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var age: UILabel!
    @IBOutlet weak var height: UILabel!
    @IBOutlet weak var gender: UILabel!
    @IBOutlet weak var weight: UILabel!
    @IBOutlet weak var barChart: BarChartView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        barChart.descriptionText = "Caloric intake over the day"
        barChart.xAxis.labelPosition = .bottom
        barChart.leftAxis.axisMinValue = 0.0
        barChart.leftAxis.axisMaxValue = 1000.0
        barChart.rightAxis.enabled = false
        barChart.xAxis.drawGridLinesEnabled = false
        barChart.legend.enabled = false
        barChart.scaleYEnabled = false
        barChart.scaleXEnabled = false
        barChart.pinchZoomEnabled = false
        barChart.doubleTapToZoomEnabled = false
        barChart.highlighter = nil
        
        // Get and prepare the data
        let sales = DataGenerator.data()
        
        // Initialize an array to store chart data entries (values; y axis)
        var salesEntries = [ChartDataEntry]()
        
        // Initialize an array to store months (labels; x axis)
        var salesMonths = [String]()
        
        var i = 0
        for sale in sales {
            // Create single chart data entry and append it to the array
            let saleEntry = BarChartDataEntry(x: sale.value, y: sale.value)
            salesEntries.append(saleEntry)
            
            // Append the month to the array
            salesMonths.append(sale.month)
            
            i += 1
        }
        
        // Create bar chart data set containing salesEntries
        let chartDataSet = BarChartDataSet(values: salesEntries, label: "Profit")
        chartDataSet.colors = ChartColorTemplates.joyful()
        let chartData = BarChartData(dataSet: chartDataSet)
        barChart.data = chartData
        barChart.layer.cornerRadius = 5
        
        // Animation
        barChart.animate(yAxisDuration: 1.5, easingOption: .easeInOutQuart)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
