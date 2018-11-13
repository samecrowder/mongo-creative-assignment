function mainCtrl ($scope) {
    $scope.jokes = "<li>stuff</li>";
    
    $("#jokesList").html($scope.jokes);
     
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
            data: { json: $("#output").html() },
            success: function(parsed_json) {
                console.log("Successful joke post");
            }
        });
        
        $.ajax({
            url: "jokes",
            dataType: "json",
            success: function(parsed_json) {
                console.log(parsed_json);
            }
        })
        
        $("#jokesList").html($scope.jokes);
    }
}

angular.module('app', []).controller('mainCtrl', mainCtrl);