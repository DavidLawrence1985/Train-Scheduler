/*add to database train  name
add destination
first train in 
frequency 
calculate when next train will arrive
diffrent machines view same train times
*/

var config = {
    apiKey: "AIzaSyCBZj8fwuG_5ipwcG7h4dXFyNNkx3zXh2w",
    authDomain: "train-scheduler-c6a78.firebaseapp.com",
    databaseURL: "https://train-scheduler-c6a78.firebaseio.com",
    projectId: "train-scheduler-c6a78",
    storageBucket: "train-scheduler-c6a78.appspot.com",
    messagingSenderId: "571561797299"
  };

  firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrain; 
    var frequency = 0;

    $("#submit-train").on("click", function(event) {
      event.preventDefault();

      
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrain = $("#first-train").val().trim();
      frequency = $("#frequency").val().trim();

      
        database.ref().push({
            trainName:trainName,
            destination:destination,
            firstTrain:firstTrain,
            frequency:frequency,
            timestamp:firebase.database.ServerValue.TIMESTAMP
        })

    })

        database.ref().on("child_added", function(snapshot) {
        
            var info = snapshot.val();

            var firstTime = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");
            
            
            var timeDifference = moment().diff(moment(firstTime), "minutes");
            var TimeRemainder = timeDifference % snapshot.val().frequency;
            var minutesAway = snapshot.val().frequency - TimeRemainder;
            var nextArrival = moment().add(minutesAway, "minutes");
            nextArrival = moment(nextArrival).format("hh:mm");
            
            
            console.log("train name" + info.trainName);
            console.log("new dest" + info.destination);
            console.log("first train" + info.firstTrain);
            console.log("minutes until" + minutesAway);
            console.log("next arrival" + nextArrival);

            $("#new-row").append("<tr> <td>" + info.trainName + 
            "</td><td>" + info.destination +
            "</td><td>" +  info.frequency + 
            "</td><td>" + nextArrival +
            "</td><td>" + minutesAway + "</td></tr>");

            //$("#add-train").reset();

  

        }, function(errorObject) {
           
            console.log("Errors handled: " + errorObject.code);
          });
          
      

      