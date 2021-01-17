// // swapping the “le” at the ends of words like “able”, “fable”, “table”, etc with “el”
// var commonMistakes = {
//     "abel": "able",
//     "fabel": "fable",
//     "tabel": "table"
//     }
    
// var connectives = ['therefore', 'and', 'also', 'furthermore', 'moreover', 'because']
//     connectiveCounter = 0
//     consonants = 'bcdfghjklmnpqrstvwxz'
//     suggestions = document.getElementsByClassName('navitem')
//     text = document.getElementById('w3review')
//     textHistory = []
//     keypressCounter = 0
//     aiDetectedMistakes = {}
//     backspaceBool = false
//     pressedSpace = false
//     misspelledWord = ''
//     correctWord = ''

// text.value = ' '

// // on every keypress 
// text.addEventListener('keyup', (e) => {
//     // the split creates an array every time there is a space bar
//     var textArray = text.value.split(' ') 
//         index = text.value.split('')
//         i = 1
//         word = ''
//     textHistory.push(text.value)
//     keypressCounter++

//     // every time the keypress is a blankspace    
//     if (index[index.length-1] == ' ') {
//         // backwards iteration loop to get the last written word
//         while (index[index.length-i-1] != ' ' && index.length > 0) {
//             word += index[index.length-i-1]
//             if (index[index.length-i-1] == ' ') break
//             if (i == 100) break    
//             i++
//         }
//         // reverse the reversed word
//         word = word.split('').reverse().join('')
//         // api takes the word and finds suggestions   
//         console.log(localStorage)
//         var ls_word = localStorage.getItem(word.trim())
//         // if there is a new suggestion from learning
//         if (localStorage.getItem(word.trim()) != null) {
//             console.log('localStorage pass')
//             fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
//               .then(response => response.json())
//               .then(data => {
//                 console.log(ls_word)
//                 suggestions[0].innerHTML = ls_word
//                 suggestions[1].innerHTML = data.matches[0].replacements[0].value
//                 suggestions[2].innerHTML = data.matches[0].replacements[1].value
//             })
//         } 
//         // or normal api suggestions
//         else {
//             console.log('fetch pass')
//             fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
//               .then(response => response.json())
//               .then(data => {
//                // console.log(data.matches[0].replacements[0].value)
//                 suggestions[0].innerHTML = data.matches[0].replacements[0].value
//                 suggestions[1].innerHTML = data.matches[0].replacements[1].value
//                 suggestions[2].innerHTML = data.matches[0].replacements[2].value
//             })
//         }

//         // inspect element to see how it works
//         for (i = 0; i < textArray.length; i++) {
//             // you dont have to know what line 104 does...
//             if (i + 1 == textArray.length) textArray[i] = textArray[i].slice(0, -1)
//             if (commonMistakes[textArray[i]] != null) {
//               // replace the misspelled word (e.g abel with able)
//               textArray[i] = commonMistakes[textArray[i]]
//             }
//         }
//         ///////////////////////// check if a pararaph is too long (not that important) /////////////////////////


//         ///////////////////////// past tense verbs fixing (lookt -> looked) /////////////////////////

//         // var exceptionList = ['meant', 'thought', 'built', 'first']     
//         // for (i = 0; i < textArray.length; i++) {
//         //     // looks at last two characters of each word
//         //     let wordEnding = textArray[i].substring(textArray[i].length-2, textArray[i].length)
//         //     if (consonants.includes(wordEnding.charAt(0)) && 
//         //         wordEnding.charAt(1).toLowerCase() == 't' && 
//         //         !exceptionList.includes(textArray[i])) {
//         //         textArray[i] = textArray[i].slice(0, -1) + 'ed'
//         //     }
//         // }

//         function CheckForConnectives() {
//             var currentText = text.value.split('.')
//             for (i = 0; i < currentText.length; i++) {
//                 currentText[i] = currentText[i].trim().toLowerCase()
//             }

//             for (i = 0; i < connectives.length; i++) {
//                 for (j = 0; j < currentText.length; j++) {
//                     if (currentText[j].includes(connectives[i])) {
//                         var words = currentText[j].split(' ')
//                         for (k = 0; k < words.length; k++) {
//                             if (words[k] == connectives[i]) {
//                                 connectiveCounter++
//                                 console.log(connectiveCounter)
//                             }
//                         }
//                         if (connectiveCounter > 2 && currentText[j].length <= 75) {
//                             document.getElementById('connectives').innerHTML = "<i class='fas fa-exclamation-circle'></i> &nbsp;"
//                                 + "You might have too many connectives!"
//                         }
//                         else if (connectiveCounter > 2 && currentText[j].length > 75) {
//                             // show which connective to split on
//                             document.getElementById('sentences').innerHTML = "<i class='fas fa-exclamation-circle'></i> &nbsp;" +
//                                 "Sentece is too long! You might want to split it in multiple sentences!"
//                         }
//                     }
//                 }
//             }
//         }

//         MultipleSpacingCheck()
//         console.log(index)
//         /////////////////////// check for double spacing /////////////////////////
//         function MultipleSpacingCheck() {

//             console.log(textArray)
//         for(i=1;i<index.length;i++){
//             if(index[i] == ' '){
//                 if (index[i-1] == ' '){
//                     console.log("-"+index[i]+"-")
//                     console.log(index[i]==' ')
//                     index.pop()
//                     textArray.pop()
//                 }

//             }

//         }






//             //
//             // console.log(textArray)
//             // console.log('!: '+ !textArray[i])
//             // if (!textArray[i]) {
//             //     if (index[index.length-1] == ' ') {
//             //         console.log('dbl space')
//             //     } else {
//             //         // console.log('MultipleSpacingCheck(): ' + textArray[i])
//             //         // for (j = i; j < textArray.length; j++) {
//             //         //     textArray[j] = textArray[j + 1]
//             //         // }
//             //         // i--
//             //         // textArray.length--
//             //     }    
//             // }
//             // Capitalize()
//             // CheckForConnectives()
//         }


//         /////////////////////// Capitalize first letter /////////////////////////
//         function Capitalize() {
//             for (i = 0; i < textArray.length; i++) {
//                 if (i == 0) {
//                     textArray[i] = textArray[i].substring(0, 1).toUpperCase() + textArray[i].substring(1)
//                 }
//                 if (textArray[i].includes('.')) {
//                     let index = textArray[i].indexOf('.')
//                     // the index of the full stop is at the end of the word
//                     if (textArray[i].length == index + 1 && textArray[i + 1]) {
//                         textArray[i + 1] = textArray[i + 1].substring(0, 1).toUpperCase() + textArray[i + 1].substring(1)
//                     }
//                 }
//             }
//         }
//         // cap the first letter of the whole text
//         let joinedText = textArray.join(' ')
//         text.value = joinedText.substring(0, 1).toUpperCase() + joinedText.substring(1)
//     }

//     word = word.split('').reverse().join('')
//     //check if it's english
//     fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
//     .then(response => response.json()).then(data => {
//         console.log(data.language.detectedLanguage.code)
//         var hasmatch = false
//         if (data.language.detectedLanguage.code == "en-US") {
//             hasmatch = true
            
//         }
//         //turn off autocorrect if it's not english
//         else {
//             // document.getElementById('connectives').innerHTML = "<i class='fas fa-exclamation-circle'></i> &nbsp; Please type in English!"
//         }
        
//     })

//     // if the user pressed backspace 
//     // block arrow keys
//     var splittedTextHistory = []
//     if (e.keyCode == 8) {
//         if(!pressedSpace){
//             misspelledWord = textHistory[textHistory.length - 2]
//             misspelledWord = misspelledWord.substring(1)
//             console.log("First misspelled word is -> "+misspelledWord)
//         } else {
//         splittedTextHistory = textHistory[textHistory.length - 2].split(", ")
//         splittedEvenFurther = splittedTextHistory[splittedTextHistory.length - 1].split(" ")
//         misspelledWord = splittedEvenFurther[splittedEvenFurther.length - 1]
//         console.log("The next misspelled word is -> "+misspelledWord)
//         }
//         backspaceBool = true
//         // aiDetectedMistakes[misspelledWord]
//     }
//     if (e.keyCode == 32 && backspaceBool) {
//         splittedTextHistory = textHistory[textHistory.length - 1].split(", ")
//         console.log(splittedTextHistory)
//         if(!pressedSpace){
//             console.log(textHistory[textHistory.length-1])
//         splittedTextHistory = textHistory[textHistory.length-1].split(" ")
//         correctWord = splittedTextHistory[1]
//         }
//         else {
//         splittedLastPartOfTextHistory = splittedTextHistory[splittedTextHistory.length-1].split(" ")
//         console.log("Text history -> " +textHistory)
//         console.log("Splitted text history -> " +splittedTextHistory)
//         correctWord = splittedLastPartOfTextHistory[splittedLastPartOfTextHistory.length-2]
//         console.log("Correct word -> " +correctWord)
//         }

//         localStorage.setItem(misspelledWord, correctWord)
//         backspaceBool = false
//         pressedSpace = true;

//         // splittedTextHistory = textHistory[textHistory.length - 1].split(", ")

//         // fetch('https://api.languagetoolplus.com/v2/check?data=%7B%22annotation%22%3A%5B%20%20%7B%22text%22%3A%20%22' + word + '%22%7D%20%5D%7D&language=en-US&enabledOnly=false')
//         //   .then(response => response.json())
//         //   .then(data => {
//         //     if (word == splittedLastPartOfTextHistory[splittedLastPartOfTextHistory.length-2]) {
//         //         correctWord = splittedLastPartOfTextHistory[splittedLastPartOfTextHistory.length-2]
//         //         localStorage.setItem(misspelledWord, correctWord)
//         //     } else {
//         //         splittedTextHistory = textHistory[textHistory.length-1].split(" ")
//         //         correctWord = splittedTextHistory[1]
//         //         localStorage.setItem(misspelledWord, correctWord)
//         //     }

//         //     backspaceBool = false
//         //     pressedSpace = true;
//         // })
//     }



// })

// var globalTextArray = text.value.split(' ')

// // suggestion buttons
// document.getElementById('suggestion1').onclick = function (e) {
//     globalTextArray[globalTextArray.length - 2] = suggestions[0].innerHTML
//     text.value = globalTextArray.join(' ')
// }

// document.getElementById('suggestion2').onclick = function (e) {
//     globalTextArray[globalTextArray.length - 2] = suggestions[1].innerHTML
//     let joinedText = globalTextArray.join(' ')
//     text.value = joinedText.substring(0, 1).toUpperCase() + joinedText.substring(1)
// }

// document.getElementById('suggestion3').onclick = function (e) {
//     globalTextArray[globalTextArray.length - 2] = suggestions[2].innerHTML
//     let joinedText = globalTextArray.join(' ')
//     text.value = joinedText.substring(0, 1).toUpperCase() + joinedText.substring(1)
// }


