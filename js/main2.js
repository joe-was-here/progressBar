function ProgressBar (min, curr, barContainer, tooltip, max) {
    this.min = min;
    this.curr = curr;
    this.barContainer = barContainer;
    this.tooltip = tooltip;
    this.max = max;

    this.showBar = function () {
      //Setting up variables
        var  barEl = $('#' + this.barContainer),
               tooltipEl = $('#' + this.tooltip),

               //Getting hidden input values
               //Checking if they are defined
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
               tooltipNumWidth = tooltipEl.children('.tooltip-inner').width() * tooltipNumMultiplier.length;

        if ( maxNum === undefined ) {
            var percentage = parseInt(currNum) > parseInt(minNum) ? 1 : parseInt(currNum) / parseInt(minNum);

            barEl.children('.bar').css('width', percentage * 100 + '%');
            tooltipEl.children('.tooltip-inner').html(startCount);
            // tooltipEl.style.left = (barEl.offsetWidth * percentage) + (barEl.offsetLeft -(tooltipEl.offsetWidth / 2)) + 'px';

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
              var h1 = $('h1');
              if ( count <= 0 ) {
                 clearInterval(counter);
                 //counter ended, do something here
                 return;
              }
              startCount += 1;
              startCount > 9000 ? $(h1).show() : startCount
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
                 minPercentage = parseInt(minNum) / parseInt(maxNum);
            barEl.children('.bar').css('width', percentage * 100 + '%');
            tooltipEl.children('.tooltip-inner').html(startCount);
            // tooltipEl.style.left = (barEl.offsetWidth * percentage) + (barEl.offsetLeft - (tooltipEl.offsetWidth / 2)) + 'px';

            var leftPos = tooltipNumMultiplier.length > 1 ? (barEl.width() * percentage) + (barEl.position().left - (((tooltipEl.outerWidth() + tooltipNumWidth) - 6) / 2)) : (barEl.width() * percentage) + (barEl.position().left - (tooltipEl.outerWidth() / 2));
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
              var h1 = $('h1');
              var height = window.innerHeight;
              var width = window.innerWidth;
              var colors = ['00EE00', 'E90E51', 'CD6839', 'CDD704', 'DA70D6', 'EE9A00'];
              var vegeta = $('.vegeta');
              if ( count <= 0 ) {
                 clearInterval(counter);
                 //counter ended, do something here
                 return;
              }
              startCount += 1;
              if ( startCount === 9000 ) {
                document.getElementsByTagName('audio')[0].play();
              }
              if ( startCount > 9001 && startCount % 2 ) {
                $(h1).show(0);
                $('body').css('background-color', '#' + colors[Math.floor(Math.random() * 5)]);
                $(vegeta).css({
                  top : Math.floor(Math.random() * height) + 'px',
                  left : Math.floor(Math.random() * width) + 'px',
                  width : Math.floor((Math.random() * (width - 300)) + 300) + 'px',
                  display : 'block'
                });
              } else {
                $(h1).hide(0);
              }
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
    var tester = new ProgressBar('testerMin', 'testerCurr', 'tester', 'testerNum', 'testerMax');
    tester.showBar();
    var testerTwo = new ProgressBar('tester2Min', 'tester2Curr', 'tester2', 'tester2Num', 'tester2Max');
    testerTwo.showBar();

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

        //Make elements spin
        Element.prototype.spinMe = function() {
            //Initial degree
            var spin = 0;
            var that = this;
            var colors = ['green', 'red', 'blue', 'yellow', 'orange', 'pink', 'purple'];
            //Clockwise or counter
            var spinDir = Math.ceil(Math.random() * 2);
            //variable speeds 1degree/25-50ms
            var spinSpeed = Math.ceil(Math.random() * 10) + 1;
            //Spin counter
            var counter = setInterval(function() {
                //Stop number growth to avoid slowdown
                //Probably doesn't matter, this shit has to be leaking memory
                Math.abs(spin) === 360 ? spin = 0 : spin;
                //Switch to a random color every 20 degrees
                if ( that.children[0] ) {
                    that.children[0].style.color = 'inherit';
                }
                Math.abs(spin) % 20 === 0 ? that.style.color = colors[Math.floor(Math.random() * 7)] : spin;
                //Spin that shit
                spinDir === 1 ? spin++ : spin--;
                that.style.webkitTransform = 'rotate(' + spin + 'deg)';
            }, spinSpeed);
        };

    document.getElementsByTagName('h1')[0].spinMe();
    document.getElementsByClassName('vegeta')[0].spinMe();
});