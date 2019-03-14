
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

        $("#add-new").find(".input").val("");
        
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
            var timeRemainder = timeDifference % snapshot.val().frequency;
            var minutesAway = snapshot.val().frequency - timeRemainder;
            var nextArrival = moment().add(minutesAway, "minutes");
            nextArrival = moment(nextArrival).format("HH:mm");
            
            
            console.log("train name" + info.trainName);
            console.log("new dest" + info.destination);
            console.log("first train" + info.firstTrain);
            console.log("minutes until" + minutesAway);
            console.log("next arrival" + nextArrival);

          
            $("#new-row").append("<tr> <td>" + info.trainName + 
            "</td><td>" + info.destination +
            "</td><td>" +  info.frequency + 
            "</td><td>" + nextArrival +
            "</td><td>" + minutesAway + " " + "min" +"</td></tr>")
          
            //fill space on larger version
            
            $("#avail-dest").append("<li>" + info.destination + "</li>");

        }, function(errorObject) {
            
            console.log("Errors handled: " + errorObject.code);
          });

    $("form").find("input[type=text]", "input[type=number").val("");

    
  
