// var caloriesList = require('./calories');
var cList = {
    "apple": 95,
    "apple pie": 67,
    "apricot": 17,
    "artichoke": 60,
    "asparagus": 60,
    "avocado": 234,
    "baked salmon": 200,
    "banana": 105,
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
    "doughnut": 195,
    "donut": 195,
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
    "mango": 201,
    "mashed potatoes": 214,
    "mushrooms": 40,
    "nectarine": 70,
    "onion": 60,
    "orange": 45,
    "papaya": 150,
    "peach": 59,
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
    "watermelon": 85,
    "vanilla": 137,
    "veggie burger": 124,
    "zucchini": 60
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
                        buildSpeechletResponse("Welcome to Calorie Counter, your personal health assistant. Ask me how many calories an apple has, or, what your daily caloric intake is so far. How may I help you?", false)
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
                        history.push(foodName);

                        if (numcalories > 0) {
                            totalCalories = totalCalories + numcalories;
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`You consumed ${numcalories} calories. Your calorie count for the day is now ${totalCalories}`, false), {}
                                )
                            )
                        } else {
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Sorry, I'm not sure how many calories are in ${foodName}. I will add it to your history of meals, but I will not increment your total calorie count. Try another name for that food?`, false), {}
                                )
                            )
                        }
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
                        if (numcalories > 0) {
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`There are ${numcalories} calories in ${foodName}. Your calorie count for the day is ${totalCalories}`, false), {}
                                )
                            )
                        } else {
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Sorry, I'm not sure how many calories are in ${foodName}. Try another name for that food?`, false), {}
                                )
                            )
                        }
                        break;

                    case "PersonalInfo":
                        var change = false;
                        var heightInFeet = event.request.intent.slots.heightFeet;
                        if (heightInFeet && heightInFeet.value) {
                            feet = parseInt(heightInFeet.value);
                            change = true;
                        }
                        var heightInInches = event.request.intent.slots.heightInches;
                        if (heightInInches && heightInInches.value) {
                            inches = parseInt(heightInInches.value);
                            change = true;
                        }
                        var a = event.request.intent.slots.age;
                        if (a && a.value) {
                            age = parseInt(a.value);
                            change = true;
                        }
                        var w = event.request.intent.slots.weight;
                        if (w && w.value) {
                            weight = parseInt(w.value);
                            change = true;
                        }
                        var g = event.request.intent.slots.gender;
                        if (g && g.value) {
                            gender = g.value.toLowerCase();
                            if (gender == "female") {
                                gender = true;
                            } else {
                                gender = false;
                            }
                            change = true;
                        }

                        var sex = "male";
                        if (gender) {
                            sex = "female";
                        }
                        if (change) {
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Got it! You are now ${feet} feet ${inches} inches, ${weight} pounds, ${sex}, and ${age} years old.`, false), {}
                                )
                            )
                        } else {
                            suggestedCalories = calculateRecommendedCalories(feet, inches, weight, gender, age);

                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`You should eat ${suggestedCalories} calories each day. Your calorie count for the day is ${totalCalories}`, false), {}
                                )
                            )
                        }
                        break;

                    case "FoodHistory":
                        var text = " ";
                        if (history.length != 0) {
                            for (count = 0; count < history.length; count++) {
                                text += `${history[count]} `;
                            }
                        } else {
                            text = "nothing yet!";
                        }
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`You have consumed ${totalCalories} calories thus far. Your previous meals include${text}`, false), {}
                            )
                        )
                        break;


                    case "RecommendedMeals":
                        var mainArray = ["Baked Salmon", "Veggie Burger"],
                            sideArray = ["Roasted Brussel Sprouts", "Fruit Salad"],
                            dessertArray = ["Peanut Brittle", "Frozen yogurt"];
                        if (suggestedCalories - totalCalories < 1400) {
                            mainArray.push("Hamburger");
                            mainArray.push("Grilled Chicken");
                            sideArray.push("Chicken Noodle Soup")
                            sideArray.push("Caesar Salad");
                            dessertArray.push("Vanilla Ice Cream");
                            dessertArray.push("Brownies");
                        }
                        if (suggestedCalories - totalCalories < 2100) {
                            mainArray.push("Steak");
                            mainArray.push("Pot Roast");
                            sideArray.push("Mashed Potatoes");
                            sideArray.push("Clam Chowder");
                            dessertArray.push("Chocolate Strawberries");
                            dessertArray.push("Apple pie");
                        }
                        var main = mainArray[Math.floor(Math.random() * mainArray.length)];
                        var side = sideArray[Math.floor(Math.random() * sideArray.length)];
                        var dessert = dessertArray[Math.floor(Math.random() * dessertArray.length)];
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`I would recommend a ${main} with ${side} and ${dessert} to go with that. Anything else?`, false), {}
                            )
                        )
                        break;

                    case "PersonalHistory":
                        var sex = "male";
                        if (gender) {
                            sex = "female";
                        }
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`You are ${feet} feet ${inches} inches, ${weight} pounds, ${sex}, and ${age} years old. If you would like, you can change these entries by saying set my, followed by the age, weight, height, or gender`, false), {}
                            )
                        )
                        break;

                    case "HelpMe":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Hello! This is Calorie Counter, your personal health assistant. You can ask me anything health related! Try asking me how many calories are in different foods, or how many calories you have had today. You can also change your height, weight, age, or gender for customized food recommendations. Go ahead, ask me how many calories are in a doughnut.`, false), {}
                            )
                        )
                        break;

                    case "GetVideoViewCountSinceDate":
                        console.log(event.request.intent.slots.SinceDate.value)
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        break;

                        // default:
                        //     throw "Invalid intent"
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
    var numCalories = 0
    if (cList[foodName]) {
        var numcalories = cList[foodName] * numFood;
    }
    return numcalories;
}

// function addCalories(calories) {
//   totalCalories = totalCalories + calories;
// }
function poundsToKilos(weight) {
    return weight * 0.453592;
}

function inchesToCentimeters(feet, inches) {
    return 2.54 * (parseInt(feet * 12) + parseInt(inches));
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
