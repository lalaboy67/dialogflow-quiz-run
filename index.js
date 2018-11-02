const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
var CurrentQuestion = '3';
var StringQuestion = 'Q'
var CurrentTopic = 'History'
// initialise DB connection
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'ws:https://quizgame-26a25.firebaseio.com/',
});

process.env.DEBUG = 'dialogflow:debug';

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function StartIntent(agent) {
    agent.add('da' + Math.floor((Math.random() * 100) + 1));
    agent.add(`Let's begin!`);
    agent.add(`There will be a set of questions! You're only given one life so use it wisely!`);
    agent.add(`Type ready to receive the first question!`);
    return admin.database().ref('QuizData').transaction((quizData) => {
        if(quizData !== null) {
            quizData.QuizStart = 1;
            quizData.Score = 1;
            quizData.Life = 3;
        }
        return quizData;
    }, 
    function(error, isSuccess) {
    console.log('Update Quiz transaction success: ' + isSuccess);
    });
  }
  
    
    function answer(agent){
        const answer = agent.parameters.Answer;
        console.log('You may or may not have gottent he right answer'); 
        return admin.database().ref('QuizData').transaction((ansData) => {
        console.log('Quiz Data is loading...')
        if(ansData !== null) {
            console.log('Checking Answer...');
            if(ansData.QuizStart === 1) {
            console.log('Data Exist!');
                if(answer === ansData.Q1.Answer && ansData.Score === 1)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 200;
                }
                else if(answer === ansData.Q2.Answer && ansData.Score === 200)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 400;
                }
                else if(answer === ansData.Q3.Answer && ansData.Score === 400)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 600;
                }
                else if(answer === ansData.Q4.Answer && ansData.Score === 600)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 800;
                }
                else if(answer === ansData.Q5.Answer && ansData.Score === 800)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 1000;
                }
                else if(answer === ansData.Q6.Answer && ansData.Score === 1000)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 1200;
                }
                else if(answer === ansData.Q7.Answer && ansData.Score === 1200)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 1400;
                }
                else if(answer === ansData.Q8.Answer && ansData.Score === 1400)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 1600;
                }
                else if(answer === ansData.Q9.Answer && ansData.Score === 1600)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 1800;
                }
                else if(answer === ansData.Q10.Answer && ansData.Score === 1800)
                {
                    agent.add('Your Answer is correct!');
                    agent.add('Type ready for the next question!');
                    ansData.Score = 2000;
                }
                else if(ansData.Life === 1)
                {
                    agent.add('I am sorry... You have run out of lifes!');
                    agent.add('Better luck next time!');
                    ansData.QuizStart = 0;
                }
                else
                {
                    ansData.Life -= 1;
                    agent.add('I am sorry, the answer was incorrect!');
                    agent.add('You have lost a life point!');
                    agent.add('Your life point is currently: ' + ansData.Life);
                    agent.add('Say next to continue!');
                }
            }
        }
        return ansData});
    }
  
    function Ready(agent){
        return admin.database().ref('QuizData').transaction((readyData) => {
        console.log('Checking...');
        if(readyData !== null) {
            console.log('quizData  is not null');
            if(readyData.QuizStart === 1 && readyData.Life !== 0) {
                console.log('Quiz is in a yes state');
                if(readyData.Score === 1)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q1.Question)
                    agent.add('a' + readyData.Q1.OptionA)
                    agent.add('b' + readyData.Q1.OptionB)
                    agent.add('c' + readyData.Q1.OptionC)
                    agent.add('d' + readyData.Q1.OptionD)
                }
                else if(readyData.Score === 200)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q2.Question)
                    agent.add('a' + readyData.Q2.OptionA)
                    agent.add('b' + readyData.Q2.OptionB)
                    agent.add('c' + readyData.Q2.OptionC)
                    agent.add('d' + readyData.Q2.OptionD)
                }
                else if(readyData.Score === 400)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q3.Question)
                    agent.add('a' + readyData.Q3.OptionA)
                    agent.add('b' + readyData.Q3.OptionB)
                    agent.add('c' + readyData.Q3.OptionC)
                    agent.add('d' + readyData.Q3.OptionD)
                }
                else if(readyData.Score === 600)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q4.Question)
                    agent.add('a' + readyData.Q4.OptionA)
                    agent.add('b' + readyData.Q4.OptionB)
                    agent.add('c' + readyData.Q4.OptionC)
                    agent.add('d' + readyData.Q4.OptionD)
                }
                else if(readyData.Score === 800)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q5.Question)
                    agent.add('a' + readyData.Q5.OptionA)
                    agent.add('b' + readyData.Q5.OptionB)
                    agent.add('c' + readyData.Q5.OptionC)
                    agent.add('d' + readyData.Q5.OptionD)
                }
                else if(readyData.Score === 1000)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q6.Question)
                    agent.add('a' + readyData.Q6.OptionA)
                    agent.add('b' + readyData.Q6.OptionB)
                    agent.add('c' + readyData.Q6.OptionC)
                    agent.add('d' + readyData.Q6.OptionD)
                }
                else if(readyData.Score === 1200)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q7.Question)
                    agent.add('a' + readyData.Q7.OptionA)
                    agent.add('b' + readyData.Q7.OptionB)
                    agent.add('c' + readyData.Q7.OptionC)
                    agent.add('d' + readyData.Q7.OptionD)
                }
                else if(readyData.Score === 1400)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q8.Question)
                    agent.add('a' + readyData.Q8.OptionA)
                    agent.add('b' + readyData.Q8.OptionB)
                    agent.add('c' + readyData.Q8.OptionC)
                    agent.add('d' + readyData.Q8.OptionD)
                }
                else if(readyData.Score === 1600)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q9.Question)
                    agent.add('a' + readyData.Q9.OptionA)
                    agent.add('b' + readyData.Q9.OptionB)
                    agent.add('c' + readyData.Q9.OptionC)
                    agent.add('d' + readyData.Q9.OptionD)
                }
                else if(readyData.Score === 1800)
                {
                    console.log('First Question is asked');
                    agent.add(readyData.Q10.Question)
                    agent.add('a' + readyData.Q10.OptionA)
                    agent.add('b' + readyData.Q10.OptionB)
                    agent.add('c' + readyData.Q10.OptionC)
                    agent.add('d' + readyData.Q10.OptionD)
                }
                else if(readyData.Score === 2000)
                {
                    agent.add('Congradulation! You have completed the quiz!');
                    agent.add('Your total score is: ' + readyData.Score + ' Nice work!');
                }
            }//)}
        }//)}
        return readyData;
    }, 
    function(error, isSuccess) {
    console.log('Update quiz transaction success: ' + isSuccess);
    }); 
  }

  
    function CheckScore(agent){
      var question  = admin.database().ref('QuizData/Q1').once('value');
          if(question !== null)
          {
            agent.add('The question is: ' + question);
          }
          if(question === null)
          {
              agent.add('The data is null')
          }
  }
  
  function PullData(agent){
    const NameOfBase = CurrentTopic + 'Q' + CurrentQuestion;
    agent.add(NameOfBase);
    return admin.database().ref(NameOfBase).transaction((Pdata) => {
        if(Pdata !== null)
        {
            agent.add(Pdata.Question);
        }
        else if (Pdata === null)
        {
            console.log('There is no data found!');
        }
        return Pdata;
    });
  }
  
  function SelectGenre(agent)
  {
       agent.add('You have selected...');
       var Genre = agent.parameters.Genre;
       if(Genre === 'OverWatch')
       {
           CurrentTopic = 'Overwatch';
           agent.add('You have selected OverWatch!')
       }
        else if(Genre === 'history of Singapore')
       {
           CurrentTopic = 'History';
           agent.add('You have selected History of Singapore');
       }
       else if(Genre === 'animals')
       {
           CurrentTopic = 'Animals';
           agent.add('You have selected Animals!')
       }
  }
  
  function GetAnswers (agent){
        const KeyWords1 = agent.parameters.KeyWords1;
        const KeyWords2 = agent.parameters.KeyWords2;
        const NameOfBase = CurrentTopic + 'Q' + CurrentQuestion;
        console.log('Loading Database...');
        //return Test()
           //.then(result => {
                //console.log(result)
                //console.log("LOLOLOL")
                //return result;
            //})
            //.then(result => agent.add(result))
            //.then(() => 
        return admin.database().ref(NameOfBase).transaction((ansData) => {
           if(ansData !== null)
           {
                console.log('Load was Success... Checking answer now...');
                if(ansData.NumOfKey == 1)
                {
                    if(ansData.KeyWords1 === KeyWords1)
                    {
                        CurrentQuestion = Math.floor((Math.random() * 5) + 1);
                        agent.add('You are correct! Say or type ready to continue to the next question!');
                        agent.add('Next qustion is: ' + CurrentTopic + 'Q' + CurrentQuestion);
                    }
                    else if(ansData.KeyWords1 !== KeyWords1)
                    {
                        agent.add('I am sorry but that is the wrong answer!');
                    }
                }
                else if(ansData.NumOfKey == 2)
                {
                    console.log('checking for 2 parameters');
                    console.log(KeyWords1 + ' ' + KeyWords2)
                    if(KeyWords2 === ansData.KeyWords2)
                    {
                        console.log('Keyword number 2 match database')
                    }
                    if(KeyWords1 === ansData.KeyWords1)
                    {
                        console.log('Keyword number 1 match database')
                    }
                    if(KeyWords2 !== null)
                    {
                        if(KeyWords2 === ansData.KeyWords2 && KeyWords1 === ansData.KeyWords1)
                        {
                        CurrentQuestion = Math.floor((Math.random() * 5) + 1);
                        console.log('Running correct answer response');
                        agent.add('You got both keywords! Congratulation! Say or type ready to continue!')
                        }
                        else if(ansData.KeyWords1 !== KeyWords1 && ansData.KeyWords2 !== KeyWords2)
                        {
                            console.log('Running correct answer response');
                            agent.add('I am sorry but that is the wrong answer!')
                        }
                    }
                    else if(Keywords2 === null)
                    {
                        agent.add('Your missing something... Please think about it! Then try again!');
                    }
                }
                else
                {
                    agent.add('idk');
                }
            }
            else if(ansData === null)
            {
                console.log('Answer data not found! Check your console for errors!');
            }
           return ansData 
        });
  }
  
  function Test()
  {
        console.log('Running test');
        return admin.database().ref('QuizData').transaction((testData) => {
            if(testData !== null)
            {
                return '5';
            }
            else if(testData === null)
            {
                console.log('test data is null');
                return '4';
            }
            else 
            {
                return '7';
            }
      })
      .then(result => result.snapshot)
      .then(snapshot => snapshot.val())
      .catch(err => {
          console.log("ERRRRR")
          console.log(err)
          return "3"
      });
      
      //return '4';
  }
 
  

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('StartQuiz', StartIntent);
  //intentMap.set('ready', Ready);
  intentMap.set('SelectGenre', SelectGenre);
  intentMap.set('Answer', answer);
  intentMap.set('CheckScore', CheckScore);
  intentMap.set('PullData', PullData);
  intentMap.set('GetAnswers', GetAnswers)
  agent.handleRequest(intentMap);
});
