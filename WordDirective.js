app.directive("wordDirective",function(quoteSrvc){
  return{
    templateUrl:'quote.html',
    controller: function($scope){
    },

    scope:{
      quote:'=theWord'
    }
  }
})
