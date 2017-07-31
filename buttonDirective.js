app.directive("buttonDirective", function(quoteSrvc) {
  return {
    template: '<button style="padding:7px;margin-bottom:5px;width:25px;background-color:{{defaultBG}};color:{{defaultColor}}" type="button" class="btn btn-primary {{classes}}" ng-mouseenter="highlightIt($event)" ng-mouseleave="returnIt($event)" ng-click="clicked($event)">{{letter}}</button>',
    controller: function($scope) {
      var myLetter=$scope.letter;
      $scope.letterClass = "classLetter";
      $scope.classes="classLetter";

      if (($scope.letter) && $scope.letter.charCodeAt(0) >= 65 && $scope.letter.charCodeAt(0) <= 90) {
        $scope.letterClass += $scope.letter;
        $scope.classes=$scope.letterClass+" classLetter";
        $scope.defaultBG=quoteSrvc.defaultBG;
        $scope.defaultColor=quoteSrvc.defaultTextColor;
      }else{
        $scope.letterClass="classPunc";
        $scope.classes="classPunc"
        $scope.defaultBG=quoteSrvc.puncBG;
        $scope.defaultColor=quoteSrvc.puncTextColor;
      }

      $scope.clicked = function(arg1) {
        quoteSrvc.gotClicked($scope.letterClass,'classLetter');
      }

      $scope.highlightIt = function($event) {
        var theClass = $event.currentTarget.classList[2];
        if(theClass!=="classPunc"){
          quoteSrvc.mouseEnters(theClass);
        }
      }

      $scope.returnIt = function($event) {
        quoteSrvc.mouseLeft($event.currentTarget.classList[2]);
      }

    },
    scope: {
      letter: "=letterPassed",
      currSelected:"="
    }
  }
})
