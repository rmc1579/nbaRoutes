var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
    
    this.addNewGame = function(gameObj) {
        var url = "https://api.parse.com/1/classes/'" + gameObj.homeTeam;
        var home = parseInt(gameObj.homeTeamScore);
        var opponent = parseInt(gameObj.opponentScore);
        if (home > opponent ){
            gameObj.won = true;
        }
        else{
            gameObj.won = false;
        }
        $http({
            method: 'POST',
            url: url,
            data: gameObj

        });
            
    };//end addNewGame
        
    this.getTeamData = function(team){
        var deferred = $q.defer();
        var url = "https://api.parse.com/1/classes/" + team;
        $http ({
            method: 'GET',
            url: url
        })
        .then(function(data){
            var results = data.data.results;
            var wins = 0;
            var losses = 0;
            
            for (var i in results){
                if (results[i].won == true){
                    wins++;
                }
                if (results[i].won == false){
                    losses++;
                }
                    
            }
            results["wins"] = wins;
            results["losses"] = losses;
            deferred.resolve(results);
        });
        
        return deferred.promise;
    };//end method getTeamData
    
    
    
    
}); //end service