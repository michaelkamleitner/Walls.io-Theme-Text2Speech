
var max_w = null;
var max_h = null;
var playing = false;
var stack = [];

$( document ).ready(function() {
  var player = document.getElementById("player");
  $('#player').on('ended', function() {
    console.log('FINISHED');
    next();
  });
  $('#player').on('error', function() {
    console.log('ERROR');
    next();
  });
  $('#player').on('abort', function() {
    console.log('ABORT');
    next();
  });
  $('#player').on('stalled', function() {
    console.log('STALLED');
    next();
  });

  var count = 0;
  $('#post').height(($( window ).height()-80)+'px');
  max_h = $( window ).height()-80;
  max_w = $( window ).width()-80;
  var stream = new WallStreamCore({
    accessToken: "8007b2792ec4dbafa37f1fb30121fc61deacf028", // required
    initialLimit: 1,
    interval: 2000,
    onPost: function(post) {

      console.log(post);
      if (!playing) {
        play(post);
      } else {
        stack.push(post);
      }
      count++;
    }
  });

});

function next() {
  playing = false;
  var next = null;
  if (next = stack.pop()) {
    play(next);
  }
}

function play(post) {
  var comment = post.comment;
  //comment  = comment.replace(/(([A-Za-z]{3,9})://)?([-;:&=\+\$,\w]+@{1})?(([-A-Za-z0-9]+\.)+[A-Za-z]{2,3})(:\d+)?((/[-\+~%/\.\w]+)?/?([&?][-\+=&;%@\.\w]+)?(#[\w]+)?)?/g,'');
  comment  = comment.replace(/#/g, '');
  $('#post').html('<span><b>'+post.external_name+':</b> '+comment+'</span>');
  $('#post').textfill({maxFontPixels: 2000, explicitWidth: max_w, explicitHeight: max_h});
  //encodeURIComponen
  comment = comment.replace(/ /g,'+');
  url = 'http://translate.google.com/translate_tts?tl=en&q='+(comment);
  console.log(url);
  player.src = url;
  player.play();
  playing = true;
  console.log('PLAY');
}

$( window ).resize(function() {

  max_h = $( window ).height()-80;
  max_w = $( window ).width()-80;
  $('#post').height(max_h+'px');
  $('#post').textfill({maxFontPixels: 2000, explicitWidth: max_w, explicitHeight: max_h});
});
//
