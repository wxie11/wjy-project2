/* eslint-disable */
/* jshint ignore:start */
/**
 * Minified by jsDelivr using UglifyJS v3.3.16.
 * Original file: /npm/js-cookie@2.2.0/src/js.cookie.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function g(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}return function e(l){function C(e,n,o){var t;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(o=g({path:"/"},C.defaults,o)).expires){var r=new Date;r.setMilliseconds(r.getMilliseconds()+864e5*o.expires),o.expires=r}o.expires=o.expires?o.expires.toUTCString():"";try{t=JSON.stringify(n),/^[\{\[]/.test(t)&&(n=t)}catch(e){}n=l.write?l.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var i="";for(var c in o)o[c]&&(i+="; "+c,!0!==o[c]&&(i+="="+o[c]));return document.cookie=e+"="+n+i}e||(t={});for(var a=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,f=0;f<a.length;f++){var p=a[f].split("="),d=p.slice(1).join("=");this.json||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var u=p[0].replace(s,decodeURIComponent);if(d=l.read?l.read(d,u):l(d,u)||d.replace(s,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(e){}if(e===u){t=d;break}e||(t[u]=d)}catch(e){}}return t}}return(C.set=C).get=function(e){return C.call(C,e)},C.getJSON=function(){return C.apply({json:!0},[].slice.call(arguments))},C.defaults={},C.remove=function(e,n){C(e,"",g(n,{expires:-1}))},C.withConverter=e,C}(function(){})});
//# sourceMappingURL=/sm/31d5cd1b58ce5e6231e4ea03a69b2801a53e76e98152bc29dc82a494ed0a1ee6.map
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

  // Unavailable seats
  var unavailable = ["one-b", "one-c", "five-e"];

  // Form elements
  var reg = {
    email: /.+@.+/,
    name: /^[a-zA-Z\s]+$/,
    number: /^\d{16}$/,
    exp: /^\d{4}$/
  };
  var creditCard = {
    email: null,
    name: null,
    number: null,
    exp: null,
    zip: null,
    type: null
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

  // Animation for html
  $('#intro').css('display', 'none');
  $('#intro').fadeIn(5000);
  $('#spreadinfo').css('display', 'none');
  $('#spreadinfo').fadeIn(3000);
  $('#button').css('display', 'none');
  $('#button').fadeIn(3000);

  // Event selection
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

  $.each(unavailable, function(i, v){
    $('.seat [for="'+v+'"]').addClass('unavailable');
  });

  $('.seat input,.seat label').on('click', function(e) {
    var selected = [];
    var total = 0;

    e.preventDefault();
    if ($(this).hasClass('unavailable')) {
      return;
    }

    $(this).toggleClass('selected');
    $('.selected', '.rows').each(function() {
      var seat = $(this).text();
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
    if ($('.selected').length < 1) {
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
    creditCard.email = $('#email').val();
    if (creditCard.email.length === 0) {
      $('#input-email label').removeClass('active');
      $('#input-email label').addClass('red');
    } else {
      $('#input-email label').removeClass('red');
    }
    if (!reg.email.test(creditCard.email)) {
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
    // Check input value
    if (exp.month < 0 || exp.month > 12) {
      $('#expdate').addClass('red');
      validate.exp = false;
    } else if (year > 0 && exp.month > 0 && exp.month <= 12) {
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
    // Highlight missing value
    if (creditCard.email === null) {
      $('#input-email label').addClass('red');
    }
    if (creditCard.name === null) {
      $('#input-cardname label').addClass('red');
    }
    if (creditCard.number === null) {
      $('#input-cardnumber label').addClass('red');
    }
    if (creditCard.exp === null) {
      $('#input-expdate label').addClass('red');
    }
    if (creditCard.zip === null) {
      $('#input-billzip label').addClass('red');
    }
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
