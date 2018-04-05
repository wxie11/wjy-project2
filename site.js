/* eslint-disable */
/* jshint ignore:start */

/* jshint ignore:end */
/* eslint-enable */

// Tell jQuery to give up the dollar sign
$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
jQuery(function($) {
  // Define veriables
  var event = {
    name: null,
    provider: null,
    time: null
  };
  var reg = {
    email: /.+@.+/,
    name: /^[a-zA-Z\s]+$/,
    number: /^\d{16}$/,
    exp: /^\d{4}$/
  };
  var creditCard = {
    name: null,
    number: null,
    exp: null,
    zip: null,
    type: null,
  }
  var validate = {
    email: false,
    name: false,
    number: false,
    exp: false,
    zip: false
  };
  var loadFX = function() {
    $('html').addClass('fx');
  };
  setTimeout(loadFX, 500);

  $('html').removeClass('nojs');
  $('html').addClass('hasjs');

  $(".event").click(function() {
    var log = $.trim($(this).text());
    var eventClick = {
      raw: log.split("\n")
    };
    event.name = eventClick.raw[0];
    event.provider = $.trim(eventClick.raw[4]);
    event.time = $.trim(eventClick.raw[5]);

    Cookies.set('event', event.name);
    Cookies.set('provider', event.provider);
    Cookies.set('time', event.time);

    $(this).attr('href', 'seats');
  });


  // Seat Selection
  $('.ticket-info').append('<li>' + Cookies.get('event') + '</li>');
  $('.ticket-info').append('<li class="padding">' + Cookies.get('provider') + '</li>');
  $('.ticket-info').append('<li>' + Cookies.get('time') + '</li>');
  $('input[type="checkbox"]').toggleClass('hidden');

  $('.seat input,.seat label').on('click', function(e) {
    var selected = [];
    var total = 0;
    $(this).toggleClass('selected');
    $('.selected', '.rows').each(function() {
      var seat = $(this).attr('name');
      // Add the current seat in the set to the `selected` array
      selected.push(seat);
    });
    $('#summary').empty();
    $('#summary').append(selected.join(","));
    $('#money').empty();
    total = selected.length * 12;
    $('#money').append('$' + total);
    Cookies.set('seats', selected.join(","));
    Cookies.set('amount', total);
    e.preventDefault();
  });

  $('.submission').on('click', function() {
    if($('.selected').length < 1) {
      $('#oneSeat').remove();
      $('.submit-button').append('<p id="oneSeat">Please choose at least one seat.</p>');
      return false;
    }
    else {
      return true;
    }
  });

  // Get seat and amounts
  $('.ticket-info.conformation').append('<li class="padding">Seat(s): ' + Cookies.get('seats') + '</li>');
  $('.ticket-info.conformation').append('<li class="total">Total: $' + Cookies.get('amount') + '</li>');

  // Animation for payment/index.html
  $('#email').on('focus', function() {
    $('#input-email label').addClass('active');
    $('#email').removeClass('red');
  });
  $('#email').on('blur', function() {
    if ($('#email').val().length === 0) {
      $('#input-email label').removeClass('active');
      $('#input-email label').addClass('red');
    } else {
      $('#input-email label').removeClass('red');
    }
    if (!reg.email.test($('#email').val())) {
      $('#email').addClass('red');
      validate.email = false;
    } else {
      validate.email = true;
    }
  });
  $('#cardname').on('focus', function() {
    $('#input-cardname label').addClass('active');
    $('#cardname').removeClass('red');
  });
  $('#cardname').on('blur', function() {
    creditCard.name = $('#cardname').val();
    if (creditCard.name.length === 0) {
      $('#input-cardname label').removeClass('active');
      $('#input-cardname label').addClass('red');
    } else {
      $('#input-cardname label').removeClass('red');
    }
    if (!reg.name.test(creditCard.name)) {
      $('#cardname').addClass('red');
      validate.name = false;
    } else {
      validate.name = true;
    }
  });
  $('#cardnumber').on('focus', function() {
    $('#input-cardnumber label').addClass('active');
    $('#cardnumber').removeClass('red');
  });
  $('#cardnumber').on('blur', function() {
    creditCard.number = $(this).val();
    if (creditCard.number.length === 0) {
      $('#input-cardnumber label').removeClass('active');
      $('#cardnumber').removeClass('red');
      $('#input-cardnumber label').addClass('red');
    } else {
      $('#input-cardnumber label').removeClass('red');
    }
    if (!reg.number.test(creditCard.number)) {
      $('#cardnumber').addClass('red');
    } else {
      creditCard.cardType = cardValidation(creditCard.number);
      Cookies.set('cardType', creditCard.cardType);
      Cookies.set('lastFourCard', creditCard.number.substring(12, 16));
    }
  });
  $('#expdate').on('focus', function() {
    $('#input-expdate label').addClass('active');
    $('#expdate').attr('placeholder', 'mmyy');
    $('#expdate').removeClass('red');
  });
  $('#expdate').on('blur', function() {
    creditCard.exp = $(this).val();
    if (creditCard.exp.length === 0) {
      $('#input-expdate label').removeClass('active');
      $('#expdate').removeAttr('placeholder', 'mmyy');
      $('#input-expdate label').addClass('red');
    } else {
      $('#input-expdate label').removeClass('red');
    }
    if (!reg.exp.test(creditCard.exp)) {
      $('#expdate').addClass('red');
      validate.exp = false;
    } else {
      expValidation(creditCard.exp);
    }
  });
  $('#billzip').on('focus', function() {
    $('#input-billzip label').addClass('active');
    $('#billzip').removeClass('red');
  });
  $('#billzip').on('blur', function() {
    creditCard.zip = $(this).val();
    if (creditCard.zip.length === 0) {
      $('#input-billzip label').removeClass('active');
      $('#input-billzip label').addClass('red');
    } else {
      $('#input-billzip label').removeClass('red');
    }
    if (creditCard.zip.length === 5) {
      zipValidation(creditCard.zip);
    } else if (creditCard.zip.length !== 5) {
      $('#billzip').addClass('red');
    }
  });
  $('#form-card').on("submit", function(e) {
    var time = Date.now();
    var orderNumber = Math.round(time / 10000);
    if (formValidation() === true) {
      console.log("Success");
      $('#form-content').remove();
      $('#ticket').replaceWith('<h2>Your Confirmation</h2>');
      $('.ticket-info.conformation').prepend('<li><h3>Order number: ' + orderNumber + '</h3></li>');
      $('.ticket-info.conformation').append('<li>Paid By: ' + Cookies.get('cardType') + ' ' + Cookies.get('lastFourCard') + '</li>');
      $('.ticket-info.conformation').append('<li class="barcode">' + orderNumber + '</li>');
      $('.ticket-info.conformation').append('<li>Please check your email for your ticket information or print out this page.</li>');
      $('#previouspage').remove();
      $('#back').append('<a href="../index.html" id="previouspage">Back Home</a>');
    }
    e.preventDefault();
  });

  // Animation for html
  $('#intro').css('display', 'none');
  $('#intro').fadeIn(5000);
  $('#spreadinfo').css('display', 'none');
  $('#spreadinfo').fadeIn(3000);
  $('#button').css('display', 'none');
  $('#button').fadeIn(3000);

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
    } else {
      $('#cardnumber').addClass('red');
      cardType = "unknown";
      validate.number = false;
      return cardType;
    }
  }

  // Expiration date validation
  function expValidation(expDate) {
    var today = new Date();
    var exp = {
      month: expDate.substring(0, 2),
      year: expDate.substring(2, 4)
    };
    var month = (Number(exp.month) - today.getMonth() - 1);
    var year = (Number(exp.year) - today.getYear() + 100);
    if (month < 0 || month > 12) {
      validate.exp = false;
    }
    if (year > 0) {
      validate.exp = true;
    } else if (year === 0 && month >= 0) {
      validate.exp = true;
    } else {
      $('#expdate').addClass('red');
      validate.exp = false;
    }
    console.log("Card expired in " + year + " year " + month + " month.");
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
          $('#billzip').addClass('red');
          validate.zip = false;
        }
      }
    });
  }

  // From validateion
  function formValidation() {
    if (validate.email === true &&
      validate.name === true &&
      validate.number === true &&
      validate.exp === true &&
      validate.zip === true) {
      return true;
    } else {
      return false;
    }
  }

});
