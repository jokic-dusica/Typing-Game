(function(){
    let startButton = $('.start-button');
    let mainInput = $('.main-input');
    let allLines = $('.line');
    let allText = [];
    let score = 0;
    let displayResult = $('.result');


    startButton.on('click', startGame);

    function startGame() {
        $(this).hide();
        mainInput.focus();
        let speed = 1;
        let textLength = 3;
        let typingWords = words.filter(word => word.length === textLength);
        let level = 6;

        let speedUp = setInterval(function(){
            textLength++;
            typingWords = words.filter(word => word.length === textLength);
        },1000)

        mainInput.on('keyup',checkInputTyping);        
        function checkInputTyping(){
            let inputVal = $(this).val();
            let self = $(this);
            if(allText.includes(inputVal)){
                let index = allText.indexOf(inputVal);
                allText.splice(index,1);
                $('span').filter(function (){
                    return $(this).text() == inputVal;
                }).css('background','blue').fadeOut(100,function() {
                    $(this).remove();
                });
                self.val("");
                score++;
                displayResult.html(score);
            }
        }

        function insertWord() {
            for(var i = 0; i < allLines.length; i++) {
                let rand = Math.floor(Math.random() * 20);
                if(rand <= level) {
                    let text = chooseText();
                    allText.push(text);
                    $(allLines[i]).append(`<span>${text}</span>`)
                }
            }
            setTimeout(insertWord,7000);
        }
        insertWord();

        function chooseText() {
            let rand = Math.floor(Math.random() * typingWords.length);
            let savedText = typingWords[rand];
            typingWords.splice(rand, 1);

            return savedText;
        }

        let moveAll = setInterval(function() {
            let allSpans = $('span');
            allSpans.css({
                left : '+='+speed
            })
            $.each(allSpans,(index,el)=> {
                let position = $(el).position().left;
                if(position > 850) {
                    clearAllIntervals();
                }
                else if(position > 700 && position < 710) {
                    $(el).addClass('dangerous');
                }
            })
        },10)

        function clearAllIntervals() {
            clearInterval(moveAll);
        }

    }
}) ()