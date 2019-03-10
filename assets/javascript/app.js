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
    var firstTrain = 0;
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
            frequency:frequency
            //timestamp:firebase.database.ServerValue.TIMESTAMP
        })

        database.ref().on("child_added", function(snapshot) {
        
            var info = snapshot.val();
    
            console.log(info.trainName);
            console.log(info.destination);
            console.log(info.firstTrain);
            console.log();

            var row = $("<tr>");
            var newTrainName = $("<td>").text(info.trainName);
            var newDestination = $("<td>").text(info.destination);
            var newFirstTrain = $("<td>").text(info.firstTrain);
            var newFrequency = $("<td>").text(info.frequency);
            //var newArrival = $("<td>");
           // newTrainName.text(info.trainName);
            //newDestination.text(info.destination);
            //newFirstTrain.text(info.firstTrain);
            //newFrequency.text(info.frequency);
            $("#train-table").append(row);
            $("#train-table").append(newTrainName)
            $("#train-table").append(newDestination)
            $("#train-table").append(newFirstTrain)
            $("#train-table").append(newFrequency)
           // $("#train-table").append()

        dataRef.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
            // Change the HTML to reflect
            $("#name-display").text(snapshot.val().name);
            $("#email-display").text(snapshot.val().email);
            $("#age-display").text(snapshot.val().age);
            $("#comment-display").text(snapshot.val().comment);
      });
  

          }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
          });
      })

      