/* eslint-disable */
/* jshint ignore:start */

/* jshint ignore:end */
/* eslint-enable */

// Tell jQuery to give up the dollar sign
$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
jQuery(function($) {
  // Define veriables
  var reg = {
    name: /^[a-zA-Z\s]+$/,
    number: /^(\d{16})$/,
    exp: /^\d{2}\/\d{4}$/
  };
  var validate = {
    name: false,
    number: false,
    exp: false,
    zip: false
  };

  $('html').removeClass('nojs');
  $('html').addClass('hasjs');

  // Animation for payment/index.html
  $('#cardName').on('focus', function() {
    $('#input-cardName label').addClass('active');
    $('#cardName').removeClass('red');
  });
  $('#cardName').on('blur', function() {
    if ($('#cardName').val().length === 0) {
      $('#input-cardName label').removeClass('active');
    }
    if (!reg.name.test($('#cardName').val())) {
      $('#cardName').addClass('red');
      validate.name = false;
    } else {
      validate.name = true;
    }
  });
  $('#cardNumber').on('focus', function() {
    $('#input-cardNumber label').addClass('active');
    $('#cardNumber').removeClass('red');
  });
  $('#cardNumber').on('blur', function() {
    var cardNumber = $(this).val();
    var cardType = null;
    if (cardNumber.length === 0) {
      $('#input-cardNumber label').removeClass('active');
      $('#cardNumber').removeClass('red');
    }
    if (!reg.number.test(cardNumber)) {
      $('#cardNumber').addClass('red');
    } else {
      cardType = cardValidation(cardNumber);
      console.log(cardType);
    }
  });
  $('#expDate').on('focus', function() {
    $('#input-expDate label').addClass('active');
    $('#expDate').attr('placeholder', 'mm/yyyy');
    $('#expDate').removeClass('red');
  });
  $('#expDate').on('blur', function() {
    var expDate = $(this).val();
    if (expDate.length === 0) {
      $('#input-expDate label').removeClass('active');
      $('#expDate').removeAttr('placeholder', 'mm/yyyy');
    }
    if (!reg.exp.test(expDate)) {
      $('#expDate').addClass('red');
      validate.exp = false;
    } else {
      expValidation(expDate);
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
    if (validate.name === true && validate.number === true && validate.exp === true && validate.zip === true) {
      console.log("Success");
      $(this).remove();
    }
    e.preventDefault();
  });

  // Card number validation
  function cardValidation(cardNumber) {
    var cardType = null;
    if (cardNumber.substring(0, 1) === "3") {
      cardType = "American Express";
      validate.number = true;
      return cardType;
    }
    if (cardNumber.substring(0, 1) === "4") {
      cardType = "Visa";
      validate.number = true;
      return cardType;
    }
    if (cardNumber.substring(0, 1) === "5") {
      cardType = "Mastercard";
      validate.number = true;
      return cardType;
    }
    if (cardNumber.substring(0, 2) === "60" || cardNumber.substring(0, 2) === "65") {
      cardType = "Discover";
      validate.number = true;
      return cardType;
    }
    else {
      $('#cardNumber').addClass('red');
      cardType = "unknown";
      validate.number = false;
      return cardType;
    }
  }

  // Expiration date validation
  function expValidation(expDate) {
    var today = new Date();
    var exp = {
      raw: expDate.split('/')
    };
    var year = (Number(exp.raw[1]) - today.getFullYear());
    var month = (Number(exp.raw[0]) - today.getMonth() - 1);
    if (month < 0 || month > 12) {
      validate.exp = false;
    }
    if (year > 0) {
      validate.exp = true;
    } else if (year === 0 && month >= 0) {
      validate.exp = true;
    } else {
      $('#expDate').addClass('red');
      validate.exp = false;
    }
    console.log("Year: " + year + ", Month: " + month);
  }

  // Zip code validation
  function zipValidation(zipCode) {
    $.ajax({
      url: 'https://api.zippopotam.us/us/' + zipCode,
      statusCode: {
        200: function(data) {
          console.log(data);
          validate.zip = true;
        },
        404: function() {
          $('#billZip').addClass('red');
          validate.zip = false;
        }
      }
    });
  }

});
