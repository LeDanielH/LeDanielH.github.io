$(function() {
    smoothScroll(500);
    workSlider();
    workLoad();
    
    mentionsStuff();
    
    $("h1").fitText(1, { minFontSize: '48px', maxFontSize: '70px' });
    
});

function smoothScroll(duration) {
    $('a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));
        if(target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

function workSlider() {
    $('.project-unit').click(function() {
      $('.work-slider').addClass("slided");
      $('.work-container').show();
    });
    $('.work-return').click(function() {
      $('.work-slider').removeClass("slided");
      $('.work-container').hide(600);
    });
}

function workLoad() {
    $.ajaxSetup({ cache: false });
    $('.project-unit').click(function() {
        var $this = $(this);
            var newTitle = $this.find('strong').text();
            var newFolder = $this.data('folder');
            var spinner = '<div class="loader">Loading...</div>';
            var newHTML = 'work/' + newFolder + '.html';
        $('.project-load').html(spinner).load(newHTML);
        $('.project-title').text(newTitle);
    });
}

/*function mentionsStuff() {
    var mentions = $('.mentions-logos').children();
    
    setMentionsActive(mentions.first().index());
    
    $('.mentions-logo').click(function() {
        var clickedMention = mentions.index($(this));
        setMentionsActive(clickedMention);
        
    });
    
    $('.mentions-next').click(function() {
        var mentionsActive = getMentionsActive();
        setMentionsActive(mentionsActive + 1);
    });
    
    $('.mentions-previous').click(function() {
        var mentionsActive = getMentionsActive();
        setMentionsActive(mentionsActive - 1);
    });   
    
    function getMentionsActive() {
        var mentionsActive = $('.mentions-belt').find('.mentions-active');
        var mentionsActiveIndex = $('mentions-belt').children().index(mentionsActive);
        
        return mentionsActiveIndex;
    }
    
    function setMentionsActive(index) {
        var numberOfMentions = mentions.length - 1;
        
    }
    
}*/
function mentionsStuff() {
    $('.mentions-unit').first().addClass('mentions-active');
    $('.mentions-logo').first().addClass('mentions-active');
    $('.mentions-mobile-nav span').first().addClass('mentions-active');
    
    $('.mentions-logo, .mentions-mobile-nav span').click(function() {
        var $this = $(this),
            $siblings = $this.parent().children(),
            position = $siblings.index($this);
        
        $('.mentions-unit').removeClass('mentions-active').eq(position).addClass('mentions-active');
        $siblings.removeClass('mentions-active');
        $this.addClass('mentions-active');
    });
    
    $('.mentions-next, .mentions-previous').click(function() {
        var $this = $(this),
            curMentionsActive = $('.mentions-belt').find('.mentions-active'),
            position = $('.mentions-belt').children().index(curMentionsActive),
            mentionsNum = $('.mentions-unit').length;
        
        if($this.hasClass('mentions-next')) {
            if(position < mentionsNum -1){  
                $('.mentions-active').removeClass('mentions-active').next().addClass('mentions-active');
            } else {
                $('.mentions-unit').removeClass('mentions-active').first().addClass('mentions-active');
                $('.mentions-logo').removeClass('mentions-active').first().addClass('mentions-active');
            }
            
        } else {
            
            if (position === 0) {
                $('.mentions-unit').removeClass('mentions-active').last().addClass('mentions-active');
                $('.mentions-logo').removeClass('mentions-active').last().addClass('mentions-active');
            } else {
                $('.mentions-active').removeClass('mentions-active').prev().addClass('mentions-active');
            } 
        }
    });
}


(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );