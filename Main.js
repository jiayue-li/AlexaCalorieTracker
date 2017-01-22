// var caloriesList = require('./calories');
var cList = {
    "apple": 95,
    "orange": 45,
    "banana": 105,
    "mango": 201,
    "watermelon": 85,
    "peach": 59
};

var totalCalories = 0;
var feet = 5;
var inches = 6; //inches
var weight = 180; //pounds
var gender = "true"; //female, false for male
var age = 20; //years
var history = []; //Empty list to begin with
var suggestedCalories = calculateRecommendedCalories(feet, inches, weight, gender, age);

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            //New Session
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // > Launch Request
                console.log("LAUNCH REQUEST")
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to Calorie Counter. My name is Cal and I'll be your personal health assistant. Ask me how many calories an apple has or what your daily caloric intake is so far. How may I help you?", false)
                    )
                )
                break;

            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`)

                switch (event.request.intent.name) {
                    case "AddCalories":
                        var nFood = 1;
                        var foodSlot = event.request.intent.slots.consumedFood;
                        var foodName;

                        if (foodSlot && foodSlot.value) {
                            foodName = foodSlot.value.toLowerCase();
                        }

                        var nFoodSlot = event.request.intent.slots.nFoods;

                        if (nFoodSlot && nFoodSlot.value) {
                            nFood = parseInt(nFoodSlot.value);
                        }

                        numcalories = foodToCalories(foodName, nFood);
                        nFood = 1;

                        totalCalories = totalCalories + numcalories;
                        history.push(foodName);

                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`You consumed ${numcalories} from ${foodName}. Your calorie count for the day is now ${totalCalories}`, false), {}
                            )
                        )
                        break;

                    case "CountCalories":
                        var numFood = 1;
                        var foodSlot = event.request.intent.slots.Food;
                        var foodName;
                        if (foodSlot && foodSlot.value) {
                            foodName = foodSlot.value.toLowerCase();
                        }

                        var numFoodSlot = event.request.intent.slots.numFoods;

                        if (numFoodSlot && numFoodSlot.value) {
                            numFood = parseInt(numFoodSlot.value);
                        }
                        numcalories = foodToCalories(foodName, numFood);

                        numFood = 1;

                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`There are ${numcalories} calories in ${foodName}. Your calorie count for the day is ${totalCalories}`, false), {}
                            )
                        )

                        break;

                    case "PersonalInfo":
                        var heightInFeet = event.request.intent.slots.heightFeet;
                        if (heightInFeet && heightInFeet.value) {
                            feet = parseInt(heightInFeet.value);
                        }
                        var heightInInches = event.request.intent.slots.heightInches;
                        if (heightInInches && heightInInches.value) {
                            inches = parseInt(heightInInches.value);
                        }
                        var a = event.request.intent.slots.age;
                        if (a && a.value) {
                            age = parseInt(a.value);
                        }
                        var w = event.request.intent.slots.weight;
                        if (w && w.value) {
                            weight = parseInt(w.value);
                        }
                        var g = event.request.intent.slots.gender;
                        if (g && g.value) {
                            gender = g.value.toLowerCase();
                        }

                        suggestedCalories = calculateRecommendedCalories(feet, inches, weight, gender, age);

                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`You should eat ${suggestedCalories} calories each day. Your calorie count for the day is ${totalCalories}`, false), {}
                            )
                        )
                        break;

                    case "RecommendedMeals":
                          var mainArray = ["Baked Salmon","Veggie Burger"], 
                          sideArray = ["Roasted Brussel Sprouts","Fruit Salad"], 
                          dessertArray = ["Peanut Brittle","Frozen yogurt"];
                          if(suggestedCalories - totalCalories < 1400)
                          {
                              mainArray.push("Hamburger");
                              mainArray.push("Grilled Chicken");
                              sideArray.push("Chicken Noodle Soup")
                              sideArray.push("Caesar Salad");
                              dessertArray.push("Vanilla Ice Cream");
                              dessertArray.push("Brownies");
                          }
                          if(suggestedCalories - totalCalories < 2100)
                          {
                              mainArray.push("Steak");
                              mainArray.push("Pot Roast");
                              sideArray.push("Mashed Potato");
                              sideArray.push("Clam Chowder");
                              dessertArray.push("Chocolate strawberries");
                              dessertArray.push("Apple pie");
                          }
                          var main = mainArray[Math.random()*mainArray.length];
                          var side = sideArray[Math.random()*sideArray.length];
                          var dessert = dessertArray[Math.random()*dessertArray.length];
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse('maybe a ${main} with a ${side} and ${dessert} to go with that', false),
                                {}
                            )
                        )
                        break;

                    case "GetVideoViewCountSinceDate":
                        console.log(event.request.intent.slots.SinceDate.value)
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        break;

                    default:
                        throw "Invalid intent"
                }
                break;

            case "SessionEndRequest":
                // Session Ended Request
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(`Thanks for using Calorie Counter. See you around!`, true), {}
                    )
                )
                console.log('SESSION ENDED REQUEST')
                break;

            default:
                context.fail('INVALID REQUEST TYPE ${event.request.type}')

        }
    } catch (error) {
        context.fail('Exception: ${error}')
    }

}

function foodToCalories(foodName, numFood) {
    var numcalories = cList[foodName]*numFood;
    return numcalories;
}

// function addCalories(calories) {
//   totalCalories = totalCalories + calories;
// }
function poundsToKilos(weight) {
    return weight * 0.453592;
}

function inchesToCentimeters(feet, inches) {
    return 2.54 * (parseInt(feet* 12) + parseInt(inches));
}

function calculateRecommendedCalories(feet, inches, weight, gender, age) {
    if (gender == "true") {
        suggestedCalories = 10 * poundsToKilos(weight) + 6.25 * inchesToCentimeters(feet, inches) - 5 * age - 161

    } else {
        suggestedCalories = 10 * poundsToKilos(weight) + 6.25 * inchesToCentimeters(feet, inches) - 5 * age + 5
    }
    return Math.round(suggestedCalories);
}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}
