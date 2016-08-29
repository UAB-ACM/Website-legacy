var myApp = angular.module('angularApp', []);

myApp.controller('mainController', function($scope, $log, $filter) {


  // This data object below is a nested list of all tutors along with their
  // offered classes and available times. Modify this data object whenever
  // tutors come and go and the html will adjust dynamically.

  $scope.tutors = [

    // First tutor information
    {
      tutorName: "Clayton Brawley",
      tutorEmail: "cbrawley@uab.edu",
      classes: [{
        classNumber: "CS 201",
        className: "Intro Programming"
      }, {
        classNumber: "CS 330",
        className: "Assembly Language"
      }],
      availableTimes: [
        "Monday: 8:00am - 11:00am, 1:00pm - 2:30pm",
        "Wednesday: 8:00am - 11:00am",
        "Friday: 8:00am - 11:00am, 1:00pm - 2:30pm"
      ]
    },
    // Second tutor information
    {
      tutorName: "Mossah",
      tutorEmail: "cbrawley@uab.edu",
      classes: [{
        classNumber: "CS 433",
        className: "Operating Systems"
      }, {
        classNumber: "CS 420",
        className: "Software Engineering"
      }, {
        classNumber: "CS 250",
        className: "Discrete Structures"
      }, {
        classNumber: "CS 499",
        className: "Senior Capstone"
      }, {
        classNumber: "CS 201",
        className: "Intro Programming"
      }, {
        classNumber: "CS 330",
        className: "Assembly Language"
      }],
      availableTimes: [
        "Monday: 8:00am - 11:00am, 1:00pm - 2:30pm",
        "Wednesday: 8:00am - 11:00am, 1:00pm - 2:30pm"
      ]
    },
    // Third tutor information
    {
      tutorName: "Lina",
      tutorEmail: "cbrawley@uab.edu",
      classes: [{
        classNumber: "CS 433",
        className: "Operating Systems"
      }, {
        classNumber: "CS 499",
        className: "Senior Capstone"
      }, {
        classNumber: "CS 302",
        className: "Java Programming"
      }, {
        classNumber: "CS 330",
        className: "Assembly Language"
      }],
      availableTimes: [
        "Monday: 8:00am - 11:00am, 1:00pm - 2:30pm",
        "Wednesday: 8:00am - 11:00am, 1:00pm - 2:30pm"
      ]
    },
    // Fourth tutor information
    {
      tutorName: "Andrew",
      tutorEmail: "cbrawley@uab.edu",
      classes: [{
        classNumber: "CS 433",
        className: "Operating Systems"
      }, {
        classNumber: "CS 302",
        className: "Java Programming"
      }, {
        classNumber: "CS 250",
        className: "Discrete Structures"
      }, {
        classNumber: "CS 420",
        className: "Software Engineering"
      }, {
        classNumber: "CS 330",
        className: "Assembly Language"
      }],
      availableTimes: [
        "Monday: 8:00am - 11:00am, 1:00pm - 2:30pm",
        "Wednesday: 8:00am - 11:00am, 1:00pm - 2:30pm"
      ]
    },
    // Fifth tutor information
    {
      tutorName: "Matt",
      tutorEmail: "cbrawley@uab.edu",
      classes: [{
        classNumber: "CS 420",
        className: "Software Engineering"
      }, {
        classNumber: "CS 201",
        className: "Intro Programming"
      }, {
        classNumber: "CS 250",
        className: "Discrete Structures"
      }, {
        classNumber: "CS 330",
        className: "Assembly Language"
      }],
      availableTimes: [
        "Monday: 8:00am - 11:00am, 1:00pm - 2:30pm",
        "Wednesday: 8:00am - 11:00am, 1:00pm - 2:30pm"
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
