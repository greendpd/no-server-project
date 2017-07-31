app.service("quoteSrvc", function(theSrvc, $timeout) {
  // angular.element(document).ready(function(){
  //   console.log("READY!!!");
  //   $(".bhButt").css('background-color','black')
  //
  //
  // })
  var clicked = false;
  var classSelected = "";
  var classHighlight = "";
  var changedClasses = [];
  var solvedByHint = [];

  $timeout(function() {
    $(".bhButt").on('click', this, function(event) {
      processHint();
    })

    $(".lhButt").on('click', this, function(event) {
      processSmallHint();
    })
  }, 500)


  function Style(bGroundColor, textColor) {
    this.backgroundColor = bGroundColor;
    this.textColor = textColor;
  }

  var nothing = new Style('rgb(2,117,216)', "white");
  var highlighted = new Style('rgb(185,210,60)', 'white');
  var selected = new Style('white', 'white')
  var certain = new Style('black', 'white')
  var punctuation = new Style('black', 'white')
  var changed = new Style('white', 'black')

  this.defaultBG = nothing.backgroundColor;
  this.defaultTextColor = nothing.textColor;

  this.puncBG = punctuation.backgroundColor;
  this.puncTextColor = punctuation.textColor;

  function updateStyle(selector, style) {
    $(selector).css('background-color', style.backgroundColor)
    $(selector).css('color', style.textColor)
  }

  function clearAll() {
    clicked = false;
    classSelected = "";
    classHighlight = "";
  }


  $(window).on('keydown', this, function(event) {
    if (theSrvc.finished()) {
      clearAll();
    } else {
      if (clicked) {
        var toReplace = classSelected[classSelected.length - 1];
        var replaceWith = event.originalEvent.key.toUpperCase();
        clicked = false;
        if (replaceWith.length == 1 && replaceWith.charCodeAt(0) >= 65 && replaceWith.charCodeAt(0) <= 90) {
          theSrvc.changeLetter(toReplace, replaceWith);
          Array.from($("." + classSelected)).forEach(function(cur, i, arr) {
            cur.innerHTML = event.originalEvent.key.toUpperCase();
          })
          updateStyle("." + classSelected, changed);
          if (!changedClasses.includes(classSelected)) {
            changedClasses.push(classSelected);
          }
        } else if (replaceWith == "DELETE" || replaceWith == "BACKSPACE") {
          theSrvc.changeLetter(toReplace, toReplace);
          Array.from($("." + classSelected)).forEach(function(cur, i, arr) {
            cur.innerHTML = toReplace;
          })
          while (changedClasses.includes(classSelected)) {
            changedClasses.splice(changedClasses.findIndex(function(cur) {
              return cur == classSelected;
            }), 1);
          }
          updateStyle("." + classSelected, nothing);
        }
        if (changedClasses.includes(classSelected)) {
          updateStyle("." + classSelected, changed)
        } else {
          updateStyle("." + classSelected, nothing)
        }
        classSelected = "";
        clicked = false;
      }
      victoryCheck();


    }
  })

  function victoryCheck() {
    if (theSrvc.victoryCheck()) {

      finished = true;
      $(".bhButt").hide("slow");
      $(".lhButt").hide("slow");
      $(".victory").show("slow");
    }
  }

  function processHint() { //returns the current, then what it is replaced by
    if (theSrvc.finished()) {
      clearAll();

    } else {
      clicked = false;
      classSelected = "";

      var temp = theSrvc.getMostPopular();
      var className = "classLetter" + temp[0];
      var solution = temp[1];
      solvedByHint.push(className);
      theSrvc.changeLetter(temp[0], solution);

      Array.from($("." + className)).forEach(function(cur, i, arr) {
        cur.innerHTML = solution;
      })

      updateStyle("." + className, certain);
      victoryCheck();
    }
  }

  function processSmallHint() {
    if (theSrvc.finished()) {
      clearAll();
    } else {
      clicked = false;
      classSelected = "";
      var temp = theSrvc.getLeastPopular();
      var className = "classLetter" + temp[0];
      var solution = temp[1];
      solvedByHint.push(className);
      theSrvc.changeLetter(temp[0], solution);

      Array.from($("." + className)).forEach(function(cur, i, arr) {
        cur.innerHTML = solution;
      })

      updateStyle("." + className, certain);
      victoryCheck();
    }
  }

  this.gotClicked = function(className, classToClear) {
    if (theSrvc.finished()) {
      clearAll();
    } else {
      if (className !== "classPunc" && !solvedByHint.includes(className)) {
        updateStyle("." + className, selected);
      }
      if (classSelected) {
        if (changedClasses.includes(classSelected)) {
          updateStyle("." + classSelected, changed);
        } else {
          updateStyle("." + classSelected, nothing);
        }

      }


      if (className == "classPunc" || className == classSelected || solvedByHint.includes(className)) {
        classSelected = "";
        clicked = false;
      } else {
        classSelected = className;
        clicked = true;
      }
      victoryCheck();
    }
  }

  this.mouseLeft = function(className) {
    if (theSrvc.finished()) {
      clearAll();
    } else {
      if (!clicked && className !== 'classPunc' && !solvedByHint.includes(className)) {
        if (changedClasses.includes(className)) {
          updateStyle("." + className, changed);
        } else {

          updateStyle("." + className, nothing);
        }
      }
      victoryCheck();
    }
  }


  this.mouseEnters = function(className) {
    if (theSrvc.finished()) {
      clearAll();
    } else {
      if (!clicked && !solvedByHint.includes(className)) {
        updateStyle("." + className, highlighted);
        classHighlight = className;
      }
    }
    victoryCheck();
  }




  this.isClicked = function() {
    return clicked;
  }


})
