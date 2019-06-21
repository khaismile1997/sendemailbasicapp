// Variables

const   sendBtn = document.getElementById('sendBtn'),
        email = document.getElementById('email'),
        subject = document.getElementById('subject'),
        message = document.getElementById('message'),
        resetBtn = document.getElementById('resetBtn'),
        sendEmailForm = document.getElementById('email-form');

// Event Listeners
eventListeners();

function eventListeners(){
    // khởi tạo
    document.addEventListener('DOMContentLoaded', appInit);
    // Validate the forms
    email.addEventListener('blur', validateField); // click vào field sau đó click ra chỗ khác
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);
    // send email & reset form
    sendEmailForm.addEventListener('submit', sendEmail);
    resetBtn.addEventListener('click', resetForm);
}
// Functions
// App initialization
function appInit(){
    // disable nút send khi load
    sendBtn.disabled = true;
}
function validateField(){
    //console.log('form validated');
    let error;
    // validate length
    validateLength(this);
    // validate email
    if(this.type === 'email'){
        validateEmail(this);
    }
    // tạo biến trả về lỗi
    errors = document.querySelectorAll('.error');
    // check lỗi khi người dùng nhập vào
    checkValue();
}
// check
function checkValue(){
    if(email.value !== '' && subject.value !== '' && message.value !== ''){
        //console.log(errors.length);
        if(errors.length === 0){
            // nút send sẽ enable
            sendBtn.disabled = false;
        }
    }
}
// validate length
function validateLength(field){
    if(field.value.length > 0){
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}
// validate email
function validateEmail(field){
    // check value của email field có chứa @ hay k
    if(field.value.indexOf('@') !== -1){
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}
// reset form
function resetForm(e){
    e.preventDefault();

    sendEmailForm.reset();

    sendBtn.disabled = true;
}
// send email
function sendEmail(e){
    e.preventDefault();
    // show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';
    // Hide spinner & show send email img
    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block';
    setTimeout(function(){
        // hide spinner
        spinner.style.display = 'none';
        // show send img
        document.querySelector('#loaders').appendChild(sendEmailImg);
        // hide send img after 5s
        setTimeout(function(){
            sendEmailForm.reset();
            sendEmailImg.remove();
        },5000)
    },3000);
}
