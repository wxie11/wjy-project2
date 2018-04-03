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
    email: /.+@.+/,
    name: /^[a-zA-Z\s]+$/,
    number: /^\d{16}$/,
    exp: /^\d{4}$/
  };
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

  // Cookies
  $("#event1").click(function() {
    Cookies.set('event', 'Strategies for Success');
    Cookies.set('provider', 'Wenzhao Zhang');
  });
  $("#event2").click(function() {
    Cookies.set('event', 'The Challenge of Change');
    Cookies.set('provider', 'Jessica DeJesus');
  });
  $("#event3").click(function() {
    Cookies.set('event', 'Why choose ITM?');
    Cookies.set('provider', 'Wenwen Xie');
  });
  $("#event4").click(function() {
    Cookies.set('event', 'Innovate, Integrate, Motivate');
    Cookies.set('provider', 'Jia Yu Huang');
  });
  $("#event5").click(function() {
    Cookies.set('event', 'THINK APIs!');
    Cookies.set('provider', 'Professor Karl Stolley');
  });
  $("#event6").click(function() {
    Cookies.set('event', 'Git your Hub');
    Cookies.set('provider', 'Yifan Yao');
  });

  console.log(Cookies.get());

  // Seat Selection
  $('.ticket-info').append('<li>' + Cookies.get('event') + '</li>');
  $('.ticket-info').append('<li>' + Cookies.get('provider') + '</li>');
  $('input[type="checkbox"]').toggleClass('hidden');

  $('.seat input,.seat label').on('click', function(e) {
    var selected = [];
    var total = 0;
    $(this).toggleClass('selected');
    $('.selected', '.rows').each(function() {
      var seat = $(this).attr('for');
      // Add the current seat in the set to the `selected` array
      selected.push(seat);
    });
    console.log(selected.length);
    $('#summary').empty();
    $('#summary').append(selected.join(","));
    $('#money').empty();
    total = selected.length * 12;
    $('#money').append('$' + total);
    Cookies.set('seats', selected.join(","));
    Cookies.set('amount', total);
    e.preventDefault();
  });

  $('.submission').on('click', function(e) {
    if($('.selected').length < 1) {
      $('.submitButton').append('<p>Please choose at least one seat</p>');
      console.log($('.selected').length);

      return false;
      }
      else {
        return true;
      }
  });

  // Get seat and amounts
  $('.ticket-info.conformation').append('<li>Seat(s): ' + Cookies.get('seats') + '</li>');
  $('.ticket-info.conformation').append('<li class="total">Total: $' + Cookies.get('amount') + '</li>');

  // Animation for payment/index.html
  $('#email').on('focus', function() {
    $('#input-email label').addClass('active');
    $('#email').removeClass('red');
  });
  $('#email').on('blur', function() {
    if ($('#email').val().length === 0) {
      $('#input-email label').removeClass('active');
    }
    if (!reg.email.test($('#email').val())) {
      $('#email').addClass('red');
      validate.email = false;
    } else {
      validate.email = true;
    }
  });
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
      Cookies.set('cardType', cardType);
      Cookies.set('lastFourCard', cardNumber.substring(12,16));
      console.log(cardType);
    }
  });
  $('#expDate').on('focus', function() {
    $('#input-expDate label').addClass('active');
    $('#expDate').attr('placeholder', 'mmyy');
    $('#expDate').removeClass('red');
  });
  $('#expDate').on('blur', function() {
    var expDate = $(this).val();
    if (expDate.length === 0) {
      $('#input-expDate label').removeClass('active');
      $('#expDate').removeAttr('placeholder', 'mmyy');
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
    var time = Date.now();
    var orderNumber = Math.round(time / 10000);
    if (formValidation() === true) {
      console.log("Success");
      $('#form-content').remove();
      $('#ticket').replaceWith('<h2>Your Confirmation</h2>');
      $('.ticket-info.conformation').prepend('<li><h3>Order number: ' + orderNumber + '</h3></li>');
      $('.ticket-info.conformation').append('<li>Paid By: ' + Cookies.get('cardType') + ' ' + Cookies.get('lastFourCard') + '</li>');
      $('.ticket-info.conformation').append('<li class="barcode">' + orderNumber + '</li>');
    }
    e.preventDefault();
  });

  //animation for html

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
      $('#expDate').addClass('red');
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
          $('#billZip').addClass('red');
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
