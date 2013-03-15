function ProgressBar (min, curr, barContainer, tooltip, max) {
    this.min = min;
    this.curr = curr;
    this.barContainer = barContainer;
    this.tooltip = tooltip;
    this.max = max;

    this.showBar = function () {
        var  barEl = $('#' + this.barContainer),
               tooltipEl = $('#' + this.tooltip),
               minNum = this.min === undefined ? undefined : document.getElementById(this.min).value,
               currNum = this.curr === undefined ? undefined : document.getElementById(this.curr).value,
               maxNum = this.max === undefined ? undefined : document.getElementById(this.max).value,
               startCount = 0,
               //Fixing multiple digit arrow offset
               //Multiple digits make the tooltip wider so the arrow ends up in the wrong place
               //Converting the current number to a string
               tooltipNumMultiplier = currNum + "",

               //This multiplies the width of a number by the length of the numbers in string form
               //i.e. 22 is 2 digits, as a string '22' .length would = 2
               //if the width of 1 digit is 6 px, 22's width would be 12px
               tooltipSingleDigitWidth = tooltipEl.children('.tooltip-inner').width(),
               tooltipNumWidth = (tooltipSingleDigitWidth * tooltipNumMultiplier.length) - tooltipSingleDigitWidth;


        //Checking if this bar does not have a maximum number
        if ( maxNum === undefined || maxNum) {

            //Calculating percentage
            //current number / minimum number
            var percentage = parseInt(currNum) > parseInt(minNum) ? 1 : parseInt(currNum) / parseInt(minNum),

            //Calculating the left position of the tooltip
            //barEl.width() = the width of the bar container (the thing with class="progress")
            //barEl.position().left = the left offset of the bar container (margin, parents padding, etc)
            //tooltipEl.outerWidth() = the entire width of the tooltip including margin and padding
            //tooltipNumWidth is the width of a the digits in the tooltip
            //For this example
            //barEl.width() = bar
            //barEl.position().left = offset
            //tooltipEl.outerWidth() = tooltip
            //tooltipNumWidth = digit

            //If the tooltip is more than 1 digit
            //(bar * percentage) + (offset - (((tooltip + digit) - ) / 2))

            //(bar * percentage)
            //Multiply the width of the bar container by percentage
            //that gives us the width in pixels of the progress bar

            //(tooltip + digit) / 2)
            //the total width of the tooltip plus the extra width from multiple digits
            //the reason this extra width has to be added now is becase the width of the tooltip is
            //measured on page load, at that point in time there is a 0 in the tooltip
            //so the extra width that is added from having multiple digits needs to be added later for this
            //calculation to be correct
            //since the tooltip's arrow is in the middle of the tooltip this width is divided by 2 to find
            //the center

            //(offset - ((tooltip + digit) / 2))
            //take the offset of the bar relative to it's parent
            //this tells us how many pixels are between the left side of the bar and the edge of
            //the parent container
            //subtracting the center point of the tooltip (where the arrow is) gives us the offset
            //of the bar relative to the tooltips arrow

            //(bar * percentage) + (offset - (((tooltip + digit) - ) / 2))
            //finally we add the width of the progress bar to the offset of the bar relative to the tooltips
            //arrow, which gives us number of pixels between the right most part of the progress bar
            //and the center of the tooltip (the arrow)
            //Setting that number as the left position of the tooltip should align it with the progress bar


           //if the tooltip is only 1 digit
           //(bar * percentage) + (offset - (tooltip / 2));
                  leftPos = tooltipNumMultiplier.length > 1 ? (barEl.width() * percentage) + (barEl.position().left - ((tooltipEl.outerWidth() + tooltipNumWidth) / 2)) : (barEl.width() * percentage) + (barEl.position().left - (tooltipEl.outerWidth() / 2));


            //Setting the bars width in percentage form
            barEl.children('.bar').css('width', percentage * 100 + '%');

            //Setting the tooltip to 0
            tooltipEl.children('.tooltip-inner').html(startCount);


           if ( percentage === 1 ) {
                leftPos -= 4;
            }
            $('#' + this.tooltip).animate({
                left : leftPos + 'px'
            },
            {
                duration : 700,
                easing : 'linear'
            });

            var count = parseInt(currNum) + 1;

            function timer() {
              count = count - 1;
              if ( count <= 0 ) {
                 clearInterval(counter);
                 //counter ended, do something here
                 return;
              }
              currNum > 500 ? startCount += 10 : startCount += 1;
              tooltipEl.children('.tooltip-inner').html(startCount);
            };

            var counter = setInterval(timer, (700 / currNum));

            if ( minNum !== '0' ) {
                var minIndicator = document.createElement('div');
                minIndicator.className = 'indicator';
                minIndicator.id = this.barContainer + 'MinIndicator';
                minIndicator.innerHTML = 'Min (' + minNum + ')';
                barEl.parent().append(minIndicator);
                minIndicator.style.left = barEl.width() + (barEl.position().left - (minIndicator.offsetWidth / 2)) + 'px';
            }

        } else {

            var percentage = parseInt(currNum) > parseInt(maxNum) ? 1 : parseInt(currNum) / parseInt(maxNum),
                 minPercentage = parseInt(minNum) / parseInt(maxNum),
                 progressBG = document.createElement('div');

            progressBG.className = 'bar bar-success';
            barEl.append(progressBG);
            barEl.children('.bar:first-child').css('width', percentage * 100 + '%');
            barEl.children('.bar-success').css('width', (minPercentage - percentage) * 100 + '%');
            tooltipEl.children('.tooltip-inner').html(startCount);
            // tooltipEl.style.left = (barEl.offsetWidth * percentage) + (barEl.offsetLeft - (tooltipEl.offsetWidth / 2)) + 'px';

            var leftPos = tooltipNumMultiplier.length > 1 ? (barEl.width() * percentage) + (barEl.position().left - ((tooltipEl.outerWidth() + tooltipNumWidth) / 2)) : (barEl.width() * percentage) + (barEl.position().left - (tooltipEl.outerWidth() / 2));
             if ( percentage === 1 ) {
                leftPos -= 4;
            }
            $('#' + this.tooltip).animate({
                left : leftPos + 'px'
            },
            {
                duration : 700,
                easing : 'linear'
            });

            var count = parseInt(currNum) + 1;

            function timer() {
              count = count - 1;
              if ( count <= 0 ) {
                 clearInterval(counter);
                 //counter ended, do something here
                 return;
              }
              currNum > 500 ? startCount += 10 : startCount += 1;
              tooltipEl.children('.tooltip-inner').html(startCount);
            };

            var counter = setInterval(timer, (700 / currNum));


            if ( minNum !== '0' ) {
                var minIndicator = document.createElement('div');
                minIndicator.className = 'indicator';
                minIndicator.id = this.barContainer + 'MinIndicator';
                minIndicator.innerHTML = 'Min (' + minNum + ')';
                barEl.parent().append(minIndicator);
                minIndicator.style.left = (barEl.width() * minPercentage) + (barEl.position().left - (minIndicator.offsetWidth / 2))+ 'px';
            }

            if ( maxNum !== '0' ) {
                var maxIndicator = document.createElement('div');
                maxIndicator.className = 'indicator';
                maxIndicator.id = this.barContainer +'MaxIndicator';
                maxIndicator.innerHTML = 'Max (' + maxNum + ')';
                barEl.parent().append(maxIndicator);
                maxIndicator.style.left = barEl.width() + (barEl.position().left - (maxIndicator.offsetWidth / 2)) + 'px';
            }

        }

    };
};

$(document).ready(function() {
    var coach = new ProgressBar ('coachMin', 'coachCurr', 'sessions', 'sessionsNum', 'coachMax');
    var consultations = new ProgressBar ('consultMin', 'consultCurr', 'consultations', 'consultationsNum');
    coach.showBar();
    consultations.showBar();

    $('.go').click(function() {
        var curr = $('.coachCurr').val(),
              min = $('.coachMin').val(),
              max = $('.coachMax').val(),
              coachCurr = $('#coachCurr'),
              coachMin = $('#coachMin'),
              coachMax = $('#coachMax'),
              indicators = $('.coaching .indicator');

        $(indicators).remove();
        $(coachCurr).val(curr);
        $(coachMin).val(min);
        $(coachMax).val(max);
        coach.showBar();
    });

});


