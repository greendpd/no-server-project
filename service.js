app.service('theSrvc', function($http) {
  var actualString = "";
  var encryptedString = "";
  var mapping = [];
  var mappingAttempt = [];
  var usedInMapping = [];

  var finished=false;

  var byPopularity = [];

  var newMap = function() {
    var arrConvert = [];
    var startPoint = [];
    for (var i = 0; i < 26; i++) {
      startPoint.push(i)
      mappingAttempt.push(-1);
    }

    while (startPoint.length > 0) {
      arrConvert.push(startPoint.splice(Math.floor(Math.random() * startPoint.length), 1)[0]);
    }
    mapping = arrConvert;
  }()

  this.getQuote = function() {
    return $http({
      method: "GET",
      url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=2",
    })
  }

  this.resetMapping = function() {
    newMap();
  }

  this.getMostPopular = function() {
    //Don't return most popular, look at mapping, and return the one that hasn't been guessed that is most popular.
    //This will not correct a wrong guess unless necessary?
    if (byPopularity.length == 0) {
      populatePopularity();
    }
    var index = -1;
    var freq = 0;
    for (var i = 0; i < byPopularity.length; i++) {
      if (byPopularity[i] > freq) {
        if (mappingAttempt[mapping[i]] != i) {
          index = i;
          freq = byPopularity[i];
        }
      }
    }
    return String.fromCharCode(mapping[index]+65)+String.fromCharCode(index+65);
  }

  this.getLeastPopular=function(){
    if (byPopularity.length == 0) {
      populatePopularity();
    }
    var index = -1;
    var freq = 0;
    for (var i = 0; i < byPopularity.length; i++) {
      if (byPopularity[i]>0&& (freq==0|| byPopularity[i] < freq)) {
        if (mappingAttempt[mapping[i]] != i) {
          index = i;
          freq = byPopularity[i];
        }
      }
    }
    return String.fromCharCode(mapping[index]+65)+String.fromCharCode(index+65);
  }

  function populatePopularity() {
    byPopularity = [];
    for (var i = 0; i < 26; i++) {
      byPopularity.push(0);
    }

    for (var i = 0; i < actualString.length; i++) {
      var index = String(actualString[i]).charCodeAt() - 65;
      if (index >= 0 && index <= 25) {
        byPopularity[index]++;
      }
    }
  }


  var encode = function(str) {
    str = str.toUpperCase();
    actualString = str;
    var rawArr = str.split('');
    var toRet = rawArr.map(function(cur, i, arr) {
      var charCode = cur.charCodeAt(0);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
        return cur;
      }
      if (charCode >= 65 && charCode <= 90) {
        if (!usedInMapping.includes(charCode - 65)) {
          usedInMapping.push(charCode - 65);
        }
        return String.fromCharCode(mapping[charCode - 65] + 65);
      }
      if (charCode >= 97 && charCode <= 122) {
        if (!usedInMapping.includes(charCode - 97)) {
          usedInMapping.push(charCode - 97);
        }
        return String.fromCharCode(mapping[charCode - 97] + 97);
      }
    }).join('');
    encryptedString = toRet;
    formatQuote(toRet);
    return toRet;
  }

  this.encode = function(str) {
    str = str.toUpperCase();
    actualString = str;
    var rawArr = str.split('');
    var toRet = rawArr.map(function(cur, i, arr) {
      var charCode = cur.charCodeAt(0);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
        return cur;
      }
      if (charCode >= 65 && charCode <= 90) {
        if (!usedInMapping.includes(charCode - 65)) {
          usedInMapping.push(charCode - 65);
        }
        return String.fromCharCode(mapping[charCode - 65] + 65);
      }
      if (charCode >= 97 && charCode <= 122) {
        if (!usedInMapping.includes(charCode - 97)) {
          usedInMapping.push(charCode - 97);
        }
        return String.fromCharCode(mapping[charCode - 97] + 97);
      }
    }).join('');
    encryptedString = toRet;
    formatQuote(toRet);
    return toRet;
  }

  var formatQuote = function(str) {
    var temp = str.split(' ');
    var toRet = [];
    temp.forEach(function(cur, i, arr) {
      toRet.push(cur.split(''));
    })
    return toRet;
  }

  this.formatQuote = function(str) {
    var temp = str.split(' ');
    var toRet = [];
    temp.forEach(function(cur, i, arr) {
      toRet.push(cur.split(''));
    })
    return toRet;
  }

  this.getQ = function() {
    var quote = "Her yellow SUV is now the enemy, looks at her average life and nothing has been alright since Bruce Springsteen's, Madonna, way before Nirvana.";
    // var quote="ABCDEFGHIJKlmno pq.r ?st'uvwxyz";
    // quote="abba"
    return formatQuote(encode(quote));
    // return encode(quote);
  }

  this.changeLetter = function(replaceThis, withThis) {
    var asciiToRep = replaceThis.toUpperCase().charCodeAt(0) - 65;
    var asciiRepWith = withThis.toUpperCase().charCodeAt(0) - 65;
    if (((asciiToRep >= 0 && asciiToRep <= 25) && (asciiRepWith >= 0 && asciiRepWith <= 25))) {
      mappingAttempt[asciiToRep] = asciiRepWith;
    }
    var toRet = updateMappingWithAttempt();
    return toRet;
  }

  function updateMappingWithAttempt() {
    var toRet = encryptedString.split('').map(function(cur, i, arr) {
      var numOfLetter = cur.charCodeAt(0) - 65;
      if (numOfLetter < 0 || numOfLetter >= 26) {
        return cur;
      }
      if (mappingAttempt[numOfLetter] >= 0) {
        return String.fromCharCode(65 + mappingAttempt[numOfLetter]);
      }
      return cur;
    });
    return toRet;
  }

  this.finished=function(){
    return finished;
  }

  this.victoryCheck=function() {
    var toRet = usedInMapping.every(function(cur, i, arr) {
      return mappingAttempt[mapping[cur]] == cur || (mapping[cur] == cur && mappingAttempt[mapping[cur]] == -1);
    })
    if(toRet){
      finished=true;
    }
    return toRet;
  }
})
