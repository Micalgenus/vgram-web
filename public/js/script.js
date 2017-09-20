/* UI 관련 JS */

// Typehead
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
  var matches, substringRegex;

  // an array that will be populated with substring matches
  matches = [];

  // regex used to determine if a string contains the substring `q`
  substrRegex = new RegExp(q, 'i');

  // iterate through the pool of strings and for any string that
  // contains the substring `q`, add it to the `matches` array
  $.each(strs, function(i, str) {
    if (substrRegex.test(str)) {
    matches.push(str);
    }
  });

  cb(matches);
  };
};

var searchQuery = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('.search').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'query',
  source: substringMatcher(searchQuery)
});

// 팝업 포스트
$(document).on('click', '#wrapper a.ajax-link', function(e) {
  $.ajax({
    type: 'GET',
    url: $(this).attr('href'),
    success: function( result ) {
      var html = $(result);
      $('html').addClass('hasPopup');
      $('body').prepend($(result));
        $('#popup > div').prepend('<button title="Close (Esc)" type="button" class="mfp-close">×</button>');
      },
      error: function( error ) {
        alert('error');
      }
    });
    e.preventDefault();
  });
  // 팝업 포스트 닫기
  $(document).on('click', '#popup, #popup .mfp-close', function(e) {
    if ($(e.target).is('#popup') || $(e.target).is('#popup .mfp-close')) {
      $('html').removeClass('hasPopup');
      $('#popup').remove();
    }
  });

  // Copy
  $(document).on('focus', ".mfp-copy input[type=text]", function() { 
    $(this).select(); 
  });
  var clipboard = new Clipboard('.mfp-copy .button');
  clipboard.on('success', function(e) {
    alert('복사되었습니다');
    e.clearSelection();
  });
  clipboard.on('error', function(e) {
    alert('복사 기능이 지원되지 않습니다\n텍스트를 선택 후 직접 복사해주세요');
  });