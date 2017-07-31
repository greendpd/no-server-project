app.controller('theController', function($scope, $timeout,theSrvc) {

  theSrvc.getQuote().then(function(response){
    var theVal=response.data[0].content;
    theVal=theVal.substring(3,theVal.length-5)
    $scope.quote=theSrvc.formatQuote(theSrvc.encode(theVal))
  });
})
