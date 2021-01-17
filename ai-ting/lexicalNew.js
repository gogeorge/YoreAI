// swapping the “le” at the ends of words like “able”, “fable”, “table”, etc with “el”
var commonMistakes = {
    "abel": "able",
    "fabel": "fable",
    "tabel": "table"
}
    
var connectives = ['therefore', 'and', 'also', 'furthermore', 'moreover', 'because']
    connectiveCounter = 0
    consonants = 'bcdfghjklmnpqrstvwxz'
    suggestions = document.getElementsByClassName('navitem')
    text = document.getElementById('w3review')
    textHistory = []
    keypressHistory = []
    keypressCounter = 0
    aiDetectedMistakes = {}
    backspaceBool = false
    pressedSpace = false
    userCorrection = false
    misspelledWord = ''
    correctWord = ''
    backspaceCounter = 1

text.value = ' '

// on every keypress 
text.addEventListener('keyup', (e) => {
    // the split creates an array every time there is a space bar
    var textArray = text.value.split(' ') 
        index = text.value.split('')
        i = 1
        word = ''
    textHistory.push(text.value)
    keypressCounter++

    // every time the keypress is a blankspace    
    if (index[index.length-1] == ' ') {
        // backwards iteration loop to get the last written word
        while (index[index.length-i-1] != ' ' && index.length > 0) {
            word += index[index.length-i-1]
            if (index[index.length-i-1] == ' ') break
            if (i == 100) break    
            i++
        }
        // reverse the reversed word
        word = word.split('').reverse().join('')
        // get the corrected word from localstorage
        var ls_word = localStorage.getItem(word.trim())
        // if there is a new suggestion from learning
        if (localStorage.getItem(word.trim()) != null) {
            fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
              .then(response => response.json())
              .then(data => {
                suggestions[0].innerHTML = ls_word
                suggestions[1].innerHTML = data.matches[0].replacements[0].value
                suggestions[2].innerHTML = data.matches[0].replacements[1].value
            })
        } 
        // or normal api suggestions
        else {         
            fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
              .then(response => response.json())
              .then(data => {
               // console.log(data.matches[0].replacements[0].value)
                suggestions[0].innerHTML = data.matches[0].replacements[0].value
                suggestions[1].innerHTML = data.matches[0].replacements[1].value
                suggestions[2].innerHTML = data.matches[0].replacements[2].value
            })
        }

        // inspect element to see how it works
        for (i = 0; i < textArray.length; i++) {
            // you dont have to know what line 104 does...
            if (i + 1 == textArray.length) textArray[i] = textArray[i].slice(0, -1)
            if (commonMistakes[textArray[i]] != null) {
              // replace the misspelled word (e.g abel with able)
              textArray[i] = commonMistakes[textArray[i]]
            }
        }

        function CheckForConnectives() {
            var currentText = text.value.split('.')
            for (i = 0; i < currentText.length; i++) {
                currentText[i] = currentText[i].trim().toLowerCase()
            }

            for (i = 0; i < connectives.length; i++) {
                for (j = 0; j < currentText.length; j++) {
                    if (currentText[j].includes(connectives[i])) {
                        var words = currentText[j].split(' ')
                        for (k = 0; k < words.length; k++) {
                            if (words[k] == connectives[i]) {
                                connectiveCounter++
                                console.log(connectiveCounter)
                            }
                        }
                        if (connectiveCounter > 2 && currentText[j].length <= 75) {
                            document.getElementById('connectives').innerHTML = "<i class='fas fa-exclamation-circle'></i> &nbsp;"
                                + "You might have too many connectives!"
                        }
                        else if (connectiveCounter > 2 && currentText[j].length > 75) {
                            // show which connective to split on
                            document.getElementById('sentences').innerHTML = "<i class='fas fa-exclamation-circle'></i> &nbsp;" +
                                "Sentece is too long! You might want to split it in multiple sentences!"
                        }
                    }
                }
            }
        }

        MultipleSpacingCheck()
        /////////////////////// check for double spacing /////////////////////////
        function MultipleSpacingCheck() {
            for(i=1;i<index.length;i++){
                if(index[i] == ' '){
                    if (index[i-1] == ' '){
                        index.pop()
                        textArray.pop()
                    }
                }
            }
        }

        /////////////////////// Capitalize first letter /////////////////////////
        function Capitalize() {
            for (i = 0; i < textArray.length; i++) {
                if (i == 0) {
                    textArray[i] = textArray[i].substring(0, 1).toUpperCase() + textArray[i].substring(1)
                }
                if (textArray[i].includes('.')) {
                    let index = textArray[i].indexOf('.')
                    // the index of the full stop is at the end of the word
                    if (textArray[i].length == index + 1 && textArray[i + 1]) {
                        textArray[i + 1] = textArray[i + 1].substring(0, 1).toUpperCase() + textArray[i + 1].substring(1)
                    }
                }
            }
        }
        // cap the first letter of the whole text
        let dropdownWord = textArray[textArray.length - 1]
            joinedText = textArray.join(' ')
        text.value = joinedText.substring(0, 1).toUpperCase() + joinedText.substring(1)
    }

    word = word.split('').reverse().join('')
    //check if it's english
    fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
    .then(response => response.json()).then(data => {
        console.log(data.language.detectedLanguage.code)
        var hasmatch = false
        if (data.language.detectedLanguage.code == "en-US") {
            hasmatch = true
            
        }
        //turn off autocorrect if it's not english
        else {
            // document.getElementById('connectives').innerHTML = "<i class='fas fa-exclamation-circle'></i> &nbsp; Please type in English!"
        }
        
    })

    keypressHistory.push(e.key)
    // if the user pressed backspace 
    if (e.key == 'Backspace') {
        if (keypressHistory[keypressHistory.length - 2] == 'Backspace') backspaceCounter++
        backspaceBool = true
    }

    if (e.key != 'Backspace' && keypressHistory[keypressHistory.length - 2] == 'Backspace') {
        // -1 for .length and -1 because the counter is zero-indexed (i think)
        misspelledWord = textHistory[textHistory.length - backspaceCounter - 2].trim()
        backspaceBool = false
        // the user from now on is probably correcting their word
        userCorrection = true
    }

    // spacebar pressed
    if (e.keyCode == 32 && userCorrection) {
        let checkWord = textHistory[textHistory.length - 1].trim()
        // check if the word they wrote (after pressing backspace) is actually correct
        fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + checkWord + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
          .then(response => response.json())
          .then(data => {
            // if there are no suggestions from the api then the word is correct
            if (data.matches.length == 0) {
                correctWord = checkWord
                userCorrection = false
                localStorage.setItem(misspelledWord, correctWord)
            }
        })
    }

    // ctrl shift 1 (first suggestion)
    if (e.ctrlKey && e.shiftKey && e.key == '!') {
        textArray[textArray.length - 2] = suggestions[0].innerHTML
        text.value = textArray.join(' ')      
    }
    // ctrl shift 2 (second suggestion)
    if (e.ctrlKey && e.shiftKey && e.key == '@') {
        textArray[textArray.length - 2] = suggestions[1].innerHTML
        text.value = textArray.join(' ')      
    }
    // ctrl shift 3 (third suggestion)
    if (e.ctrlKey && e.shiftKey && e.key == '#') {
        textArray[textArray.length - 2] = suggestions[2].innerHTML
        text.value = textArray.join(' ')      
    }

    // suggestion buttons
    document.getElementById('suggestion1').onclick = function (e) {
        textArray[textArray.length - 2] = suggestions[0].innerHTML
        text.value = textArray.join(' ')
    }

    document.getElementById('suggestion2').onclick = function (e) {
        textArray[textArray.length - 2] = suggestions[1].innerHTML
        text.value = textArray.join(' ')  
    }

    document.getElementById('suggestion3').onclick = function (e) {
        textArray[textArray.length - 2] = suggestions[2].innerHTML
        text.value = textArray.join(' ')  
    }

})