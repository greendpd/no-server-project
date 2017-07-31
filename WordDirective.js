app.directive("wordDirective",function(quoteSrvc){
  return{
    // template: "<p>The sum of the square roots of any two sides of an isosceles triangle is equal to the square root of the remaining side</p>"
    //template: "<p ng-repeat='letter in word track by $index'>{{letter}}</p>",
    templateUrl:'quote.html',

    controller: function($scope){

    },

    scope:{
      quote:'=theWord'
    }



  }



})
