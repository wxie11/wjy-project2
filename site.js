/* eslint-disable */
/* jshint ignore:start */

/* jshint ignore:end */
/* eslint-enable */

// Tell jQuery to give up the dollar sign
$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
jQuery(function($) {
  // Define veriables
  var validate = {
    zip: false
  };

  $('html').removeClass('nojs');
  $('html').addClass('hasjs');

  // Animation for payment/index.html
  $('#cardName').on('focus', function() {
    $('#input-cardName label').addClass('active');
  });
  $('#cardName').on('blur', function() {
    if ($('#cardName').val().length === 0) {
      $('#input-cardName label').removeClass('active');
    }
  });
  $('#cardNumber').on('focus', function() {
    $('#input-cardNumber label').addClass('active');
  });
  $('#cardNumber').on('blur', function() {
    if ($('#cardNumber').val().length === 0) {
      $('#input-cardNumber label').removeClass('active');
    }
  });
  $('#expDate').on('focus', function() {
    $('#input-expDate label').addClass('active');
  });
  $('#expDate').on('blur', function() {
    if ($('#expDate').val().length === 0) {
      $('#input-expDate label').removeClass('active');
    }
  });
  $('#billZip').on('focus', function() {
    $('#input-billZip label').addClass('active');
    $('#billZip').removeClass('red');
  });
  $('#billZip').on('blur', function() {
    var zipCode = $(this).val();
    if (zipCode.length === 0) {
      $('#input-billZip label').removeClass('active');
    }
    if (zipCode.length === 5) {
      zipValidation(zipCode);
    } else if (zipCode.length !== 5) {
      $('#billZip').addClass('red');
    }
  });
  $('#form-card').on("submit", function(e) {
    if (validate.billZip === true) {
      return true;
    }
    e.preventDefault();
  });

  // Zip code validation
  function zipValidation(zipCode) {
    $.ajax({
      url: 'https://api.zippopotam.us/us/' + zipCode,
      statusCode: {
        200: function(data) {
          console.log(data);
          validate.zip === true;
        },
        404: function() {
          $('#billZip').addClass('red');
          validate.zip === false;
        }
      }
    });
  }

});
