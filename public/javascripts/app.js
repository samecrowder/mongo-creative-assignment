function mainCtrl ($scope) {
    $scope.getJoke = function() {
        var myURL = "http://api.icndb.com/jokes/random/exclude[explicit]";
        var name = $('#joke-name').val().split(' ');
        var firstName = name[0];
        var lastName = name[1];
        myURL += "?firstName=" + firstName;
        myURL += "&lastName=" + lastName;
        $.ajax({
            url : myURL,
            dataType : "json",
            success : function(parsed_json) {
                var joke = parsed_json['value']['joke'];
                $("#output").html(joke);
            }
        });
    }
    
    $scope.updateJokes = function() {
        $scope.jokes = "";
        
        $.ajax({
            url: "jokes",
            method: "POST",
            dataType: "json",
            data: { json: $("#output").html() }
        });
        
        $scope.getAllJokes();
    }
    
    $scope.getAllJokes = function() {
        $.ajax({
            url: "jokes",
            dataType: "json",
            method: "GET",
            success: function(parsed_json) {
                $scope.updateJokesList(parsed_json);
            }
        });
    }
    
    $scope.updateJokesList = function(parsed_json) {
        var newJokesList = "";
        var i;
        for(i = 0; i < parsed_json.length; i++) {
            newJokesList += "<li>" + parsed_json[i]['Joke'] + "</li>";
        }
        $("#jokesList").html(newJokesList);
    }
    
    $scope.getAllJokes();
}

angular.module('app', []).controller('mainCtrl', mainCtrl);