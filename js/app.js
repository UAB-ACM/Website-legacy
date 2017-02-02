var myApp = angular.module('angularApp', []);

myApp.controller('mainController', function($scope, $log, $filter) {


  // This data object below is a nested list of all tutors along with their
  // offered classes and available times. Modify this data object whenever
  // tutors come and go and the html will adjust dynamically.

  $scope.tutors = [

    // First tutor information
    {
      tutorName: "Ayushi Patel",
      tutorEmail: "ayushi27@uab.edu",
      classes: [{
        classNumber: "CS 203",
        className: "Object-Oriented Programming"
      }],
      availableTimes: [
        "Tuesday: 11:00am - 12:00pm",
        "Thursday: 11:00am - 12:00pm"
      ]
    },
    {
      tutorName: "Josh Caryney",
      tutorEmail: "ayushi27@uab.edu",
      classes: [{
        classNumber: "CS 203",
        className: "Object-Oriented Programming"
      }],
      availableTimes: [
        "Tuesday: 5:00am - 6:00pm",
        "Thursday: 5:00am - 6:00pm"
      ]
    }
  ];

  $scope.loadUniqueTutors = function() {
    var temp_unique = [];
    $scope.unique_classes = [];
    $scope.available_tutors = [];
    angular.forEach($scope.tutors, function(item) {
      angular.forEach(item.classes, function(inner) {
        $scope.available_tutors.push({
          tutorName: item.tutorName,
          availableTimes: item.availableTimes,

        })
        if (temp_unique[inner.classNumber] === null || !temp_unique[inner.classNumber]) {
          $scope.unique_classes.push({
            classNumber: inner.classNumber,
            className: inner.className
          });
          temp_unique[inner.classNumber] = true;
        }
      });
    });
  }

  $scope.doesTutorThisClass = function(tutor, classNumber) {
    var temp_return = false;
    angular.forEach(tutor.classes, function(data) {
      if (data.classNumber === classNumber) {
        temp_return = true;
      }
    });

    var return_temp = (temp_return === true ? true : false);
    return return_temp;
  }

  $scope.loadUniqueTutors();

});
