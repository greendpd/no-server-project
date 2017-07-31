app.controller('theController', function($scope, $timeout,theSrvc) {

  theSrvc.getQuote().then(function(response){
    var arrayOfQuotes=response.data;
    var chosenNumber=Math.floor(Math.random()*response.data.length);
    console.log(chosenNumber);
    var theVal=response.data[chosenNumber].content;
    theVal=theVal.substring(3,theVal.length-5).toUpperCase();

    while(theVal.includes('&#8217;')){
      theVal=theVal.replace('&#8217;',"'")
      console.log("HELL");
    }
    while(theVal.includes('[&#8230;]')){
      theVal=theVal.replace('[&#8230;]',"")
      console.log("HELL");
    }
    while(theVal.includes('&#8220;')){
      theVal=theVal.replace('&#8220;','"')
      console.log("HELL");
    }
    while(theVal.includes('&#8211;')){
      theVal=theVal.replace('&#8211;',',')
      console.log("HELL");
    }
    while(theVal.includes('&#8216;')){
      theVal=theVal.replace('&#8216;','"')
      console.log("HELL");
    }
    while(theVal.includes('&#8221;')){
      theVal=theVal.replace('&#8221;','"')
      console.log("8221");
    }
    while(theVal.includes('<BR />')){
      theVal=theVal.replace('<BR />','')
      console.log("BR");
    }
    while(theVal.includes('<P>')){
      theVal=theVal.replace('<P>','')
      console.log("P");
    }
    while(theVal.includes('</P>')){
      theVal=theVal.replace('</P>','')
      console.log("ENDP");
    }
    while(theVal.includes('<EM>')){
      theVal=theVal.replace('<EM>','')
      console.log("P");
    }
    while(theVal.includes('</EM>')){
      theVal=theVal.replace('</EM>','')
      console.log("ENDP");
    }
    $scope.quote=theSrvc.formatQuote(theSrvc.encode(theVal))
  });
})
