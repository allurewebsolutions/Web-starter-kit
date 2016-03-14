(function($, document, window) {

    'use strict';

    var $contentSection = $('section.content'),
        $tabbedNav = $('.tabbed-nav'),
        $contentContainer = $('.tab-content-container');

    // tab functionality
    $tabbedNav.on('click', '.tab', function(e) { // upon clicking a tab

        // fix the height of the main content area
        $contentSection.height( $contentSection.height() );

        // scroll to news content
        $('html, body').animate({
            scrollTop: $contentContainer.offset().top
        }, 800);


        var tabId = $(this).attr('data-tab'); // save data-tab attribute to variable tab_id

        $tabbedNav.children('.tab').removeClass('current'); // remove current class from all tabs

        // fadeout current tab content and then remove "current" class
        $contentContainer.children().filter('.current').addClass('is-animating').fadeOut(600, function() {
            $(this).removeClass('current is-animating').css('display', '');
        });

        $(this).addClass('current'); // add current class to currently clicked tab

        // fadein new tab content corresponding to clicked tab and then add "current" class to it
        $('#' + tabId).addClass('is-animating').fadeIn(600, function() {
            $(this).addClass('current').removeClass('is-animating').css('display', '');

            // set the height of main content to auto
            $contentSection.css('height', '');
        });
    });


    // link to tab functionality (Not for MVP)
   // if (window.location.hash) { // if page url has a hash: #something
   //      $tabbedNav.find('.tab')
   //          .removeClass('current') // remove current class from all tabs
   //          .filter('[data-tab=' + window.location.hash.slice(1) + ']').addClass('current');  // add current class to tab matching hash

   //      $tabContent
   //          .removeClass('current') // remove current class from all tab contents
   //          .filter(window.location.hash).addClass('current'); // add current class to tab content match hash

   //     var pos = $(window).scrollTop(); // optional: save top of window position to variable pos
   //     $(window).scrollTop(pos); // optional: keep page loaded at the top
   // }



    // load the news feed and add content to the page
    $.getJSON('https://finmates.staging.createl.la/api/news', function(json) {
        var navHtml = '',
            contentHtml = '',
            date = '',
            title = '',
            content = '',
            picture = '';

        // loop for news item list
        for (var i = json.data.length - 1; i >= 0; i--) {
            date = json.data[i].time_for_humans;
            title = json.data[i].title;
            content = json.data[i].content;
            picture = json.data[i].picture;

            navHtml += '<div class="tab box box-solid" data-tab="tab-' + (i + 1) + '">';
            navHtml += '<div class="box-header">';
            navHtml += '<h3 class="box-title">' + title + '</h3>';
            navHtml += '<p class="meta">';
            navHtml += '<span class="date-posted">Posted ' + date + '</span>';
            navHtml += '</p>';
            navHtml += '</div>';
            navHtml += '</div>';

            contentHtml += '<div id="tab-' + (i + 1) + '" class="tab-content box box-primary">';
            contentHtml += '<div class="box-header with-border">';
            contentHtml += '<h2>' + title + '</h2>';
            contentHtml += '<p class="meta">';
            contentHtml += '<span class="date-posted">Posted ' + date + '</span>';
            contentHtml += '</p>';
            contentHtml += '</div>';
            contentHtml += '<div class="box-body">';
            contentHtml += '<div class="news-poster">'
            contentHtml += '<img src="' + picture + '" alt="'+ title +'" />';
            contentHtml += '</div>';
            contentHtml += '<p>' + content + '</p>';
            contentHtml += '</div>';
            contentHtml += '</div>';
        }

        $tabbedNav.html(navHtml);
        $contentContainer.html(contentHtml);

        // trigger the showing of the first tab content
        $tabbedNav.children('.tab').eq(0).trigger('click');

    });

}(jQuery, document, window));