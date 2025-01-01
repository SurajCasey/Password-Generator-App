//js selectors
const sliderValue = document.querySelector('.slider-value');
const slider = document.getElementById("customRange");
const passwordWritten = document.querySelector('.password-written');

// slider value is equal to password written
passwordWritten.addEventListener('input', ()=>{
    slider.value = passwordWritten.value.length;
    sliderValue.textContent = slider.value;
})

// adding slider value according to slider range
slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value;
});

// showing copied when copy icon is pressed
const copyLogo = document.querySelector('.copy-logo');
const copiedMessage = document.querySelector('.copied');

copyLogo.addEventListener('click', ()=> {
    //select the text in the textfield
    passwordWritten.select();
    passwordWritten.setSelectionRange(0,99999);
    //copy the text to clipboard
    navigator.clipboard.writeText(passwordWritten.value).then(()=>{
        copiedMessage.style.display = "block";
    }
    )
    setTimeout(()=>{
        copiedMessage.style.display= "none";
    }, 2000);
    
});

// strength indicator
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const strengthIndicator = document.querySelector('.strength-indicator');
const boxes = document.querySelectorAll('.box');

// creating function to calculate strength
function updateStrength(){
    const selectedOptions = [uppercase,lowercase, numbers, symbols].filter(input => input.checked).length;
   //rest the boxes to transparent
   boxes.forEach(box=>{
    box.style.backgroundColor="transparent";
   })
   
    if (selectedOptions === 1){
        strengthIndicator.style.display = "block";
        strengthIndicator.textContent = 'TOO WEAK!';
        boxes[0].style.backgroundColor = 'hsl(0, 91%, 63%)';     
    } else if (selectedOptions === 2){
        strengthIndicator.style.display = "block";
        strengthIndicator.textContent = 'WEAK';
        boxes[0].style.backgroundColor = 'hsl(13, 95%, 66%)';
        boxes[1].style.backgroundColor = 'hsl(13, 95%, 66%)';  
    } else if (selectedOptions === 3){
        strengthIndicator.style.display = "block";
        strengthIndicator.textContent = 'MEDIUM';
        boxes[0].style.backgroundColor = 'hsl(42, 91%, 68%)'; 
        boxes[1].style.backgroundColor = 'hsl(42, 91%, 68%)';
        boxes[2].style.backgroundColor = 'hsl(42, 91%, 68%)';
    }else if (selectedOptions === 4){
        strengthIndicator.style.display = "block";
        strengthIndicator.textContent = 'STRONG';
        boxes.forEach((box,index) => {
            box.style.backgroundColor = 'hsl(127, 100%, 82%'; 
        });
    }
    else{
        strengthIndicator.style.display = "none";
        boxes.forEach((box,index) => {
            box.style.backgroundColor = 'transparent'; 
        });
    }
}

[uppercase, lowercase, numbers, symbols].forEach(option =>{
    option.addEventListener('change', updateStrength);
});

updateStrength();


//creating charsets for password generation
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWZYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?~'
};

//generate button
const generateButton = document.querySelector('.btn');

//function for password generation
function generatePassword(){
    let availableChars = '';

    if(uppercase.checked) availableChars += charSets.uppercase;
    if(lowercase.checked) availableChars += charSets.lowercase;
    if(numbers.checked) availableChars += charSets.numbers;
    if(symbols.checked) availableChars += charSets.symbols;

    if(!availableChars){
        alert('Please select at least one character');
        return;
    }

    const length = parseInt(slider.value, 10);
    let password = '';
    for (let i=0; i<=length; i++){
        const randomIndex = Math.floor(Math.random()*availableChars.length);
        password += availableChars[randomIndex];
    }
    passwordWritten.value = password;
    updateStrength();
}
generateButton.addEventListener('click', generatePassword);