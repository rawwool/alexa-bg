'use strict';

const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    var sentence = item.AnswerNumber;
    return sentence;
}

//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter/*, property*/, item)
{
    //return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.StateName + "?";
    return "Here is your " + counter + "th question. " + item.Question;
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state abbreviation, we add some SSML to make sure that Alexa spells that abbreviation out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
     return item.AnswerNumber.split("|")[1];
}

function getAnswerWithIndex(property, item)
{
     return item.AnswerNumber.split("|")[0] + " . " + item.AnswerNumber.split("|")[1];
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite", 
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew", 
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "D'oh", 
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to the Bishop Gilpin Quiz!  You can ask me about the school or you can ask me to give oyu the headlines or you can ask me to start a quiz.  What would you like to do?";  

//This is the message a user will hear when they start a quiz.
var START_QUIZ_MESSAGE = "OK. I will ask you 10 quiz questions about Bishop Gilpin Church of England School.";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for playing the Bishop Gilpin Quiz!  Let's play again soon!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
var REPROMPT_SPEECH = "What would you like to know about?";

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I know lots of facts about the Bishop Gilpin Church Of England School. You can test your knowledge by asking me to start a quiz. What would you like to do?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
var USE_CARDS_FLAG = false;//true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.StateName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

//=========================================================================================================================================
//TODO: Replace this data with your own.
//=========================================================================================================================================
var data = [
    { Question: "The school is how many years old? 1. Little over 250 years, 2. Less than 200 years, 3. More than 500 years, 4. Don't know",                  AnswerNumber: "1|Little over 250 years" },
    { Question: "What is the name of the head teacher? 1. Mr. Ball, 2. Mr. William, 3. Mr. McShane, 4. Don't know",                        AnswerNumber: "1|Mr. Ball" },
    { Question: "What was the school known as in the 18th century? 1. International School, 2. National School, 3. Wimbledon School, 4. Don't know",             AnswerNumber: "2|National School"},
    { Question: "What was the school known as in the late 19th century? 1. New Century, 2. Old Wimbledon, 3. Old Central, 4. Don't know",        AnswerNumber: "3|Old Central"},
    { Question: "What is the colour of Neptune house? 1. Red, 2. Green, 3. Blue, 4. Don't know",                          AnswerNumber: "3|blue"},
    { Question: "What is the colour of Mercury house? 1. Red, 2. Green, 3. Blue, 4. Don't know",                          AnswerNumber: "1|red"},
    { Question: "What is the colour of Saturn house? 1. Red, 2. Green, 3. Blue, 4. Don't know",                           AnswerNumber: "2|green"},
    { Question: "What is the colour of Jupiter house? 1. Red, 2. Green, 3. Yellow, 4. Don't know",                          AnswerNumber: "3|yellow"},
    { Question: "What is the first R of the four dispositions? 1. Resourcefulness, 2. Resilience, 3. Readiness, 4. Don't know",                 AnswerNumber: "2|Resilience"},
    { Question: "What is the last R of the four dispositions? 1. Resourcefulness, 2. Resilience, 3. Readiness, 4. Don't know",                  AnswerNumber: "1|Resourcefulness"},
    { Question: "What is the colour of the school gate? 1. Red, 2. Green, 3. Yellow, 4. Don't know",                       AnswerNumber: "2|green"},
    { Question: "What is the name of the coding teacher? 1. Mr. WIlliams, 2. Mr. Ball, 3. Mr. Jack, 4. Don't know",         AnswerNumber: "2|Mr. Ball"},
    

    ];
    
var facts = [
    { Year: 1758, Fact : "The school was founded in 1758. It was called Old Central."},
    { Year: 1966, Fact : "The school moved to the current buildings in Lake Road, Wimbledon in 1966."},
    { Year: 1757, Fact : "On the evening of 26th June 1757, the Vicar of Wimbledon, Revd John Cooksey, convened a meeting of the local ratepayers and gentlemen of influence at the Rose and Crown public house to agree upon the design and costs of a charity school to be built for poor children of the Parish."},
    { Year: 1759, Fact : "The school opened on Monday 31 December 1759 with 56 pupils on the roll."},
    { Year: 1890, Fact : "in 1890, the syllabus for year 1 (aged 7) was reading fluently from two books and writing dictation of single words, transcribing from books and writing their own name."},
    { Year: 1759, Fact : "The school was on the Wimbledon Common for 207 years."},
    { Year: 2008, Fact : "In 2008, it was the 250th anniversary of the founding of the school."},
    { Year: 1950, Fact : "John Harvey authored a book called 'A Firm Foundation' in 2010 to tell the story of Old Central and Bishop Gilpin School."},
    { Year: 1900, Fact : "John Harvey was a pupil of Old Central in 1950s and grew up to become Deputy Headmaster of what now is Bishop Gilpin School"},
    
    
    
     
    ];
    
var headlines = [
    { Date: "2017-04-28", Headlines: "PJ Day at Bishop Gilpin. Children and staff are in their pyjamas today, which has helped to create an extra-special sense of community."},
    { Date: "2017-04-28", Headlines: "Google Expeditions- Virtual Reality at BG. Training for staff on the use of Google expeditions in 2D (EYFS/KS1) and 3D virtual reality (KS2) has taken place in April. Children across the school enjoyed workshops using this technology."},
    { Date: "2017-04-28", Headlines: "Year 5 Sleepover- Tonight, our year 5 children will be making use of PJ day to sleepover at school."},
    { Date: "2017-04-28", Headlines: "Reading Mentors- Virtual Reality at BG. We have now introduced a Reading Mentor programme to support readers at Bishop Gilpin."},
    { Date: "2017-04-28", Headlines: "Yearr 5 Victoria and Albert Museum Visit- As part of Year 5s history topic on Anglo-Saxons and Vikings, they had a great day of learning at the V&A museum."},
    { Date: "2017-04-28", Headlines: "Programming/coding club- In addition to the coding sessions taking place in class, which from this term will include a great deal more robotics, we also have a healthy lunchtime coding club. An example of this is their new project to code Alexa (via Amazon Echo) to perform new tasks."},
    ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ",
    FACTS: "_FACTS",
    HEADLINES: "_HEADLINES",
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "FactsIntent": function() {
        this.handler.state = states.FACTS;
        this.emitWithState("Facts");
    },
    "HeadlinesIntent": function() {
        this.handler.state = states.HEADLINES;
        this.emitWithState("Headlines");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "AnswerIntent": function() {
        var item = getItem(this.event.request.intent.slots);

        if (item[Object.getOwnPropertyNames(data[0])[0]] !== undefined)
        {
            if (USE_CARDS_FLAG)
            {
                var imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};
                this.emit(":askWithCard", getSpeechDescription(item), REPROMPT_SPEECH, getCardTitle(item), getTextDescription(item), imageObj);
            }
            else
            {
                this.emit(":ask", getSpeechDescription(item), REPROMPT_SPEECH);
            }
        }
        else
        {
            this.emit(":ask", getBadAnswer(item), getBadAnswer(item));
            
        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "FactsIntent": function() {
        this.handler.state = states.FACTS;
        this.emitWithState("Facts");
    },
    "HeadlinesIntent": function() {
        this.handler.state = states.HEADLINES;
        this.emitWithState("Headlines");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});

var headlinesHandler = Alexa.CreateStateHandler(states.HEADLINES, {
    "Headlines": function() {
        
        var index = 0;
        var theHeadlines = "";
        var dateStr = null
        while(index < headlines.length){
            var fact = headlines[index];
            theHeadlines = theHeadlines  + encodeXml(fact.Headlines) + " <break time='1s'/> ";
            dateStr = fact.Date;
            index++;
        }
        var date = new Date(dateStr);
        console.log(date);
        
        theHeadlines = date.toLocaleDateString("en-UK") + " <break time='1s'/>" + theHeadlines;
        theHeadlines += " <break time='1s'/> Those were you headlines. Have a good day!";
        //var dateStr = JSON.parse(dateJson);  
        //console.log(dateStr); // 2014-01-01T23:28:56.782Z

        this.emit(":tell", theHeadlines);
    },
    
})

var factsHandlers = Alexa.CreateStateHandler(states.FACTS, {
    "Facts": function() {
        var count = 3;
        for (var slot in this.event.request.intent.slots)
            {
                if (this.event.request.intent.slots[slot].value !== undefined && this.event.request.intent.slots[slot].name == 'number')
                {
                    count = this.event.request.intent.slots[slot].value;
                    break;
                }
            }
            
        if (count > facts.length) count = facts.length;
        var theseFacts = "";
        if (count == 0){
            theseFacts = "Verry funny! you asked for zero facts, but I am still giving you one. "
            count = 1;
        }
        var threeRandomMembers = getRandomSubarray(facts, count);
        threeRandomMembers.sort(function(a, b){return b.Year-a.Year});
        var index = threeRandomMembers.length;
        
        while(--index>=0){
            var fact = threeRandomMembers[index];
            theseFacts = theseFacts + encodeXml(fact.Fact) + ' <break time="1s"/> ';
        }
        var prologue = "";
        if (count == 1){
            prologue = "That was your fact.";
        } else {
            prologue = "Those were your " + count.toString()  + " facts.";
        }
        
        theseFacts += prologue + " Have a good day!";
        this.emit(":tell", theseFacts);
    },
    
})

var quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        //var x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        var tenRandomMembers = getRandomSubarray(data, 10);
        //var ranNums = shuffle(fiveRandomMembers);
        this.attributes["randomNext"] = tenRandomMembers;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] === 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        //var random = this.attributes["randomNext"][this.attributes["counter"]]; //getRandom(0, data.length-1);
        //var item = data[random];
        var item = this.attributes["randomNext"][this.attributes["counter"]];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        var question = getQuestion(this.attributes["counter"]/*, property*/, item);
        var speech = this.attributes["response"] + question;
        
        this.attributes["question"] = question;
        this.attributes["speech"] = speech;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"]

        // test if the response is an allowed value
        var validResponse = validate(this.event.request.intent.slots, item[property]);
        if (validResponse === false)
        {
            //Retry (TODO: once?)
            var lastQuestion =  this.attributes["question"];
            var lastSpeech = this.attributes["speech"];

            this.emit(":ask", "I think I heard you wrong. Please answer again as 1, 2, 3 or 4."/* + lastSpeech*/, lastQuestion);
        }
        
        var correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
            response += getAnswer(property, item) + " it is!";
        }
        else
        {
            response = getSpeechCon(false);
            var test = "";
            for (var slot in this.event.request.intent.slots)
            {
                if (this.event.request.intent.slots[slot].value !== undefined)
                {
                    test = test + this.event.request.intent.slots[slot].value.toString();
                    
                }
            }
            response += "The right answer is " + (getAnswerWithIndex(property, item) + " <break time='100ms'/> and you answered - " + test +" . ");
        }
        /*
        var splits = item[property].toString().split("|");
        var test = "<" + splits[0].trim() + ">";
        */
        

        if (this.attributes["counter"] < 10)
        {
            response += "<break time='100ms'/>" + getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.emit(":tell", response + " " + EXIT_SKILL_MESSAGE);
        }
    },
    /*
    "FactsIntent": function() {
        /*this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        //var x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        var tenRandomMembers = getRandomSubarray(data, 10);
        //var ranNums = shuffle(fiveRandomMembers);
        this.attributes["randomNext"] = tenRandomMembers;*/
        /*var threeRandomMembers = getRandomSubarray(facts, 3);*/
        /*var index = 3;
        while(index-->=0){
            var fact = threeRandomMembers[index];
            
            this.emit(":tell", fact.Fact);
        }*/
        /*this.emit(":tell", "COme on!");
        
    },*/
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

//http://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

//http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function encodeXml(s) {
    return (s
        .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;')
    );
}

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            var splits = value.toString().split("|");
            for (var splitValue in splits)
            {
                if (slots[slot].value.toString().trim().toLowerCase() == splits[splitValue].trim().toLowerCase())
                {
                    return true;
                }
            }
        }
    }
    return false;
}

function validate(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            var slotVal = slots[slot].value.toString().trim().toLowerCase();
            return slotVal == "1" || slotVal == "2" || slotVal == "3" || slotVal == "4";
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;
    
    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";    
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";
    
    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers, factsHandlers, headlinesHandler);
    alexa.execute();
};