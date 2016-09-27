//OnReady Listener
$().ready(onReady);                                                             //Call onReady Function when page is completely loaded

//Global vars
var stripeHandle;                                                               //For global access to the configured Stripe API

//On Page Ready
function onReady(){                                                             //Runs when page is completely loaded
  configureStripe();                                                            //Configure Stripe payment API

  addEventListeners();                                                          //Add event listeners to make the page smart and interactivve
}

function configureStripe(){                                                     //Configure Stripe payment API
  var config = {                                                                //Configure object
    key: 'pk_live_Lj6LDBqXdjQSSTkxafNMkfeB',                                    //Public API Key
    image: 'https://s3.amazonaws.com/stripe-uploads/acct_17d5UXBNULRn4Ikfmerchant-icon-1455139861793-facebook-profile-pic.png', //Image to display on popup
    locale: 'auto',                                                             //Automaticly determine language and other regional differences
    token: onPayment,                                                           //Callback for a successful or unsuccessful Payment
  };

  stripeHandle = StripeCheckout.configure(config);                              //Add the configuration to Stripe and set the configured API to the global variable
}
function addEventListeners(){                                                   //Function that contains all event listener adds
  $('#signup_BlazerID').on('blur', blazeridBlur);                                 //Call the blazeridBlur function when user clicks off of blazerID field
  $('#signup_submit').on('click', onSignup);                                      //Call the submit function when user clicks the submit button

  $('#contact_submit').on('click', onContact);                                    //Call the submit function when user clicks the submit button

}

function blazeridBlur(){                                                        //Take the blazerID and auto fill the email field with the blazerID@uab.edu email address
  $('#signup_email_label').addClass('active');
  $('#signup_email').val($("#signup_BlazerID").val() + '@uab.edu');
}

function onSignup(e){                                                           //Function called when user clicks the pay and sign up button
  //Need to check if all fields are filled out
  if($('#signup_full_name').val() == ''){                                       //Checking name field
    alert('Your Name is not quite right');                                       //Telling user to check their name
  }
  else if($('#signup_BlazerID').val() == ''){                                   //Checking BlazerID field
    alert('Your BlazerID is not quite right');                                    //Telling user to check their BlazerID
  }
  else if($('#signup_email').val() == ''){                                      //Checking email field
    alert('Your Email is not quite right');                                       //Telling user to check their email
  }
  else{                                                                         //Everything checks out, can procced with payment

    //Opening Stripe
    stripeHandle.open({                                                         //Open Stripe's checkout popover
      name: 'ACM Membership (1 Year)',                                          //Checkout's name
      description: 'Membership ($10.00)',                                       //Checkout's description
      allowRememberMe: false,                                                   //Don't allow the user to be remembered by phone number
      email: $('#signup_email').val() ,                                                //Auto fill the email address with the email address given in the form
      amount: 1000                                                              //What ammount to charge, in this case $10.00 or 1000 cents
    });

    //Stopping default event
    e.preventDefault();                                                         //Prevent the browser from doing the default thing with this submit button

    // Close Checkout on page navigation
    $(window).on('popstate', function() {                                       //If the user clicks the browser's back button
      stripeHandle.close();                                                     //Closing the popover
    });
  }
}

function onPayment(token){                                                      //Function called when we recieve a answer from the Stripe payment API
  console.log(token);                                                             //Debugging token

  uploadForm(token);                                                              //Upload our form and the token to our server for user registration and final payment
}

function uploadForm(token){                                                     //Function called when wanting to submit user form to server

  var data = {                                                                    //Data object that's going to be sent to server
    name: $('#signup_full_name').val(),                                             //Collecting name from page
    blazerid: $('#signup_BlazerID').val(),                                          //Collecting blazerID from page
    email: $('#signup_email').val(),                                                //Collecting email from page
    token: token                                                                    //Appending full Stripe payment token for server side payment request
  };

  $.ajax({                                                                        //Using an AJAX request to send form and other data to server
    type: 'POST',                                                                   //Setting http type to a POST
    url: '/api/membership/signup.js',                                                   //Location of server upload API
    data: data,                                                                     //Appending data to AJAX request
    dataType: 'JSON',                                                               //Expecting the server to send us a JSON string back, this will auto parse the JSON string
    success: function(data, textStatus, jqXHR){                                     //Talking to server was successful
      //Close Signup Model                                                            //Sending user to the thank you page
      closeSignupModel();
      //Open Thank you Model

    },
    error: function(jqXHR, textStatus, errorThrown){                                //Talking to the server wasn't successful
      alert('There was an error, your card has not been charged.  Please try again!');//Sending an alert to the user that the form was not submitted and their card has not be charged.
    },
  });
}

function closeSignupModel(){
  //Closing Model
  $('#m-signup').removeClass('md-show');

  //Clearing Fields
  $('#signup_full_name').val('');
  $('#signup_BlazerID').val('');
  $('#signup_email').val('');
}

function closeContactModel(){
  //Closing Model
  $('#m-contact').removeClass('md-show');

  //Clearing Fields
  $('#contact_name').val('');
  $('#contact_email').val('');
  $('#contact_message').val('');
}


function onContact(e){                                                          //Function called when user clicks the submit button
  //Need to check if all fields are filled out
  if($('#contact_name').val() == ''){                                             //Checking name field
    alert('Your Name is not quite right');                                          //Telling user to check their name
  }
  else if($('#contact_email').val() == ''){                                       //Checking BlazerID field
    alert('Your Email is not quite right');                                         //Telling user to check their BlazerID
  }
  else if($('#contact_message').val() == ''){                                     //Checking email field
    alert('You have no message');                                                   //Telling user to check their email
  }

  var data = {                                                                  //Data object that's going to be sent to server
    name: $('#contact_name').val(),                                                //Collecting name from page
    email: $('#contact_email').val(),                                             //Collecting blazerID from page
    message: $('#contact_message').val(),                                         //Collecting email from page
  };

  $.ajax({                                                                      //Using an AJAX request to send form and other data to server
    type: 'POST',                                                                 //Setting http type to a POST
    url: '/api/contact.js',                                                           //Location of server upload API
    data: data,                                                                   //Appending data to AJAX request
    success: function(data, textStatus, jqXHR){                                   //Talking to server was successful
      //Close Signup Model                                                          //Sending user to the thank you page
      closeContactModel();
      //Open Thank you Model

    },
    error: function(jqXHR, textStatus, errorThrown){                              //Talking to the server wasn't successful
      alert('There was an error, your message has not been sent.  Please try again!');  //Sending an alert to the user that the form was not submitted and their card has not be charged.
    },
  });
}
