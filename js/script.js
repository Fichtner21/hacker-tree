/**
 * This is the text from the code file
 */
var fileText;

/**
 * This is the current position in the fileText
 */
var filePositionCounter = 0;

/**
 * Maximum chars that will be printed at one key press
 */
// var stepsizeMax = 6;
var stepsizeMax = 120;

/**
 * How far it will scroll when a key is pressed
 */
var scrollStep = 100000;

/**
 * The element where the code will be put in.
 */
var codeDiv = document.getElementById("code-div");

var cursorSpeed = 750;

var panelFirewall = document.getElementById("panel-firewall");

// var cursor = document.getElementById("cursor");

var counterSlowly = 0;
var textSlowly;

const btnSubmit = document.getElementById('submit');
const myForm = document.getElementById('myForm');
const enterInput = document.getElementById("enter");

function validateOnlyTextField(el){
    const str = el.value;
    // console.log('str', str);
    if(str == 'XMASS.EXE'){
        return true;
    } else {
        return false;
    }
}

document.addEventListener('load', function(){
    enterInput.dispatchEvent(new Event("click"));    
});

document.addEventListener('click', function(){
   enterInput.focus();
});

const regExPattern = new RegExp('XMASS.EXE', 'i');
    
const enterInputValue = enterInput.value;

myForm.addEventListener('submit', function(e){
    e.preventDefault();
    // console.log('val =>', enterInputValue);
   
    if(!regExPattern.test(enterInput.value)){ 
        // e.dispachEvent(new KeyboardEvent('keypress', {'key': 'Enter'})); 
        // e.preventDefault();        
    } else {  
        panelFirewall.classList.remove("float"); 
        panelFirewall.textContent = '';             
        setInterval(() => {  
            panelFirewall.classList.add("grant");
            panelFirewall.textContent = 'Access granted';
            setTimeout(function(){
                panelFirewall.style.display = 'none';
            }, 2000);

            console.log('codeDiv height:', codeDiv.offsetHeight);
            console.log('normal height:', document.getElementById('normal').offsetHeight);
            // if(codeDiv.offsetHeight > document.getElementById('normal').offsetHeight){
            //     // setTimeout(function(){
            //     //     document.getElementById('out').scrollTop += 10;
            //     //     console.log('Teraz!');
            //     // }, 5000);
            //     // console.log('Co się zacznie za 5s');
            //     displaySomeCode();    
            // }
            
            displaySomeCode();    
                            
        }, 400);
        toggleCursor(); 
        enterInput.disabled = true;
       
    }
});

/**
 * This part of the code decides what to happen, when a key is pressed
 */
document.addEventListener('keydown', function(e) {    
    typeSound(); 
    if (e.keyCode >= 48 && e.keyCode <= 90) {
        // When some normal keys are pressed
        // displaySomeCode();
        
    } else if(e.keyCode == 8){
        panelFirewall.style.visibility = "hidden";
    } else if (e.keyCode == 13) {
        // ENTER
        panelFirewall.style.visibility = "visible";
    } else if (e.keyCode == 27) {
        // ESCAPE
        panelFirewall.style.visibility = "hidden";
        document.getElementById('song').pause();
        
    // } else if (e.keyCode == 160) {
    } else if (e.keyCode == 49) {
        // ^
        loadFile(dumpAll, "./text_files/filestructure.txt");
    } else if (e.keyCode == 188) {
        // ,
            
    } else if (e.keyCode == 190) {
        // .

    } else if (e.keyCode == 163) {
        //#
        clearCode();
    } else if (e.keyCode == 9) {
        e.preventDefault();
        dumpTillLineEnd();
    }
});

/**
 * This function will display some 
 */
let a = 0;
const song = document.getElementById('song');
song.volume = 0;

function displaySomeCode() {    
    let b = ++a;   
    
    const value = 0.01;
    
    if(b > 1){
        song.loop = true;
        song.play();        

        setTimeout(function(){
           song.volume = Math.min(0.1, song.volume + value);
        }, 2000); 
    }

    // Calculate a random step size between one and Max Value
    var stepSizeRnd = Math.floor(Math.random() * stepsizeMax) + 1;

    var emptyChars = getNumberOfNextEmptyChars();

    // Append the number of chars to the div
    appendText(fileText.substring(filePositionCounter, filePositionCounter + emptyChars + stepSizeRnd));

    // Set the text counter to the new value
    filePositionCounter = filePositionCounter + emptyChars + stepSizeRnd;

    // console.log('Wykonuje sie displaySomeCode()');
    
    
}

function getNumberOfNextEmptyChars() {

    var numberOfEmptyChars = 0;

    var start = filePositionCounter;
    var offset = start + 1;

    while (fileText.substring(start, offset) == " " || fileText.substring(start, offset) == "\n") {
        // filePositionCounter + numberOfEmptyChars, filePositionCounter + numberOfEmptyChars + 1
        numberOfEmptyChars = numberOfEmptyChars + 1;        
        
        start = filePositionCounter + numberOfEmptyChars;
        offset = start + 1;
    }

    return numberOfEmptyChars;
}

/**
 * Will store the info of the file to the variable.
 * This is used as a callback method.
 * @param {String} text 
 */
function saveFileToVariable(text) {
    fileText = text;
}

let keys = [
	new Audio("./key1.mp3"),
	new Audio("./key2.mp3"),
	new Audio("./key3.mp3"),
	new Audio("./key4.mp3")
];

function typeSound() {
	let i = Math.floor(Math.random() * keys.length);
	keys[i].currentTime = 0;
	keys[i].play();
}

/**
 * This is a callback method.
 * Dumps String instantly on the page
 * @param {String} text Sting that will be dumped instantly on the page 
 */
function dumpAll(text) {
    appendText(text);
    // console.log('dumpAll');
}

function dumpAllSlowly(text) {
    textSlowly = text;  
    // console.log('dumpAllSlowly');  
}

function dumpTillLineEnd() {

    // Find the index of the next line break
    indexOfNextLinebreak = fileText.indexOf('\n', filePositionCounter) + 1;

    // Append everything till the next linebreak
    appendText(fileText.substring(filePositionCounter, indexOfNextLinebreak));

    // Update the file counter
    filePositionCounter = indexOfNextLinebreak;
    // console.log('dumpTillLineEnd');
}

const containerCode = document.querySelector('.container-code');

const out = document.getElementById("out")
let c = 0

// setInterval(function() {
//     // allow 1px inaccuracy by adding 1
//     const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1

//     //const newElement = document.createElement("div")

//     //newElement.textContent = format(c++, 'Bottom position:', out.scrollHeight - out.clientHeight,  'Scroll position:', out.scrollTop)

//     //out.appendChild(newElement)

//     // scroll to bottom if isScrolledToBottom is true
//     if (isScrolledToBottom) {
//       out.scrollTop = out.scrollHeight - out.clientHeight
//     }
// }, 500)

function format () {
  return Array.prototype.slice.call(arguments).join(' ')
}

/**
 * 
 * @param {String} text This is the text that is to be appended to the page 
 */
function appendText(text) {
    codeDiv.innerText = codeDiv.innerText + text;
    // pageScroll();   
    
    $("#normal").animate({ scrollTop: $('#normal')[0].scrollHeight}, 2000);
    $("#out").animate({ scrollTop: $('#out')[0].scrollHeight}, 6000);
//    console.log('pageScroll => doing', document.body.scrollHeight);
//    const docBodyScrollHeight = document.body.scrollHeight;
//    if(docBodyScrollHeight < 1050){
//        pageScroll();
//    } 
    
}



/**
 * Will remove every code that has been displayed
 */
function clearCode() {
    codeDiv.innerText = "";
}

/**
 * Scroll the page down to the lowest possible point
 */
function pageScroll() {
    // $("#normal").animate({ scrollTop: $('#normal')[0].scrollHeight}, 200);
    // $("#out").animate({ scrollTop: $('#out')[0].scrollHeight}, 6000);
    // $("#out").animate({ scrollTop: $('#out')[0].scrollHeight}, 6000);
    // window.scrollBy(0, scrollStep); 
    // setTimeout(function(){
        // document.body.style.overflow = "visible!important";
    // }, 6000);  
}

/* 
 * This function will load a file and take its content to the callback method
 */
function loadFile(callbackMethod, pathToFile) {   

    // console.log(callbackMethod + " " + pathToFile);
    // console.log("Hey");

    var xobj = new XMLHttpRequest();

    xobj.open('GET', pathToFile, true);

    //xobj.setRequestHeader("Cache-Control", "max-age=0");

    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // console.log(xobj.responseText);
            callbackMethod(xobj.responseText);
        }
    };

    xobj.send(null);  
}

/**
 * This recursive function will male the cursor toggle
 */
function toggleCursor() {    
    cursor.style.visibility == "hidden" ? cursor.style.visibility = "visible" : cursor.style.visibility = "hidden";
    
    setTimeout(() => {  toggleCursor(); }, cursorSpeed);
}

/**
 * Load init text into the div
 */
loadFile(dumpAll, "./text_files/init_text2.txt");

/**
 * Load default code file to the variable
 */
// loadFile(saveFileToVariable, "./text_files/code1.txt");
loadFile(saveFileToVariable, "./text_files/christ_.txt");

// Init the toggle cursor function
