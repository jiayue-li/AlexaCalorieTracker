// var caloriesList = require('./calories');
var cList = {
  "apple" : 95,
	"orange" : 45,
	"banana" : 105,
	"mango" : 201,
	"watermelon" : 85,
	"peach" : 59
};

exports.handler = (event, context) =>
{

  try {
    if (event.session.new) {
      //New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // > Launch Request
        console.log("LAUNCH REQUEST")
        context.succeed (
          generateResponse(
            buildSpeechletResponse("Welcome to Calorie Counter", true)
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log('INTENT REQUEST')

        switch(event.request.intent.name) {
          case "CountCalories":
            var c = 300;
            var foodSlot = event.request.intent.slots.Food;
            var foodName;

            if (foodSlot && foodSlot.value) {
              foodName = foodSlot.value.toLowerCase();
            }

            // var cList = caloriesList.fruitCal;

            var numcalories = cList[foodName];

            context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`You consumed ${numcalories} from ${foodName}`, true),
                    {}
                  )
                )
        }


        break;

      case "SessionEndRequest":
        // Session Ended Request
        console.log('SESSION ENDED REQUEST')
        break;

      default:
        context.fail('INVALID REQUEST TYPE ${event.request.type}')

      }
  } catch(error) {context.fail('Exception: ${error}')}

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
