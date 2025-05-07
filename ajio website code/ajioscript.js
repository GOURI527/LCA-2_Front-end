document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.querySelector('.sign-in-btn');
    const closeBtn = document.querySelector('.close-btn');
    const loginContainer = document.querySelector('.login-container');
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    const cameraBtn = document.querySelector('.camera-btn');

    signInBtn.addEventListener('click', () => {
        loginContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';

        phoneScreen.style.display = 'block';
        otpScreen.style.display = 'none';
        accountScreen.style.display = 'none';
        passwordScreen.style.display = 'none';
        phoneInput.value = '+91';
        backBtn.style.visibility = 'hidden';
    });

   
    closeBtn.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    
    loginContainer.addEventListener('click', (e) => {
        if (e.target === loginContainer) {
            loginContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

  
    const phoneScreen = document.getElementById('phone-screen');
    const otpScreen = document.getElementById('otp-screen');
    const accountScreen = document.getElementById('account-screen');
    const passwordScreen = document.getElementById('password-screen');
    const phoneInput = document.getElementById('phone-input');
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const backBtn = document.querySelector('.back-btn');
    const otpInputs = document.querySelectorAll('.otp-input');
    const accountList = document.getElementById('account-list');
    const passwordInput = document.getElementById('password-input');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const loginBtn = document.getElementById('login-btn');

    backBtn.style.visibility = 'hidden';

   
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (!value.startsWith('91')) {
                value = '91' + value;
            }
            value = '+' + value;
        } else {
            value = '+91';
        }
        e.target.value = value;
    });

    sendOtpBtn.addEventListener('click', () => {
        const phoneNumber = phoneInput.value;
        if (phoneNumber.length === 13) { 
            phoneScreen.style.display = 'none';
            otpScreen.style.display = 'block';
            backBtn.style.visibility = 'visible';
            otpInputs[0].focus();
        } else {
            alert('Please enter a valid 10-digit mobile number');
        }
    });

    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

 
   
    function showPopupNotification() {
        const popup = document.getElementById('otp-popup');
        popup.style.display = 'block';
        
        
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }

    verifyOtpBtn.addEventListener('click', () => {
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
            
            const mockOtp = '123456';
            if (otp === mockOtp) {
                
                showPopupNotification();
                
               
                setTimeout(() => {
                    otpScreen.style.display = 'none';
                    const otpSuccessScreen = document.getElementById('otp-success-screen');
                    otpSuccessScreen.style.display = 'block';
                    
                   
                    const mockAccounts = [
                        'birajdar.gouri@gmail.com',
                        'birajdar.gouri95@gmail.com',
                        'birajdar.gouri@mitwpu.edu.in'
                    ];
                    
                    accountList.innerHTML = '';
                    mockAccounts.forEach(email => {
                        const div = document.createElement('div');
                        div.className = 'account-option';
                        
                        const radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.name = 'account';
                        radio.value = email;
                        radio.id = `account-${email}`;
                        
                        const label = document.createElement('label');
                        label.htmlFor = `account-${email}`;
                        label.textContent = email;
                        
                        div.appendChild(radio);
                        div.appendChild(label);
                        
                        accountList.appendChild(div);
                    });

                    
                    const continueAfterOtpBtn = document.getElementById('continue-after-otp-btn');
                    continueAfterOtpBtn.addEventListener('click', () => {
                        otpSuccessScreen.style.display = 'none';
                        accountScreen.style.display = 'block';
                    });
                }, 1000);
            } else {
                alert('Invalid OTP. For testing, use: 123456');
            }
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    });

   
    backBtn.addEventListener('click', () => {
        if (passwordScreen.style.display === 'block') {
            passwordScreen.style.display = 'none';
            accountScreen.style.display = 'block';
            passwordInput.value = '';
        } else if (accountScreen.style.display === 'block') {
            accountScreen.style.display = 'none';
            otpScreen.style.display = 'block';
        } else if (document.getElementById('otp-success-screen').style.display === 'block') {
            document.getElementById('otp-success-screen').style.display = 'none';
            otpScreen.style.display = 'block';
        } else if (otpScreen.style.display === 'block') {
            otpScreen.style.display = 'none';
            phoneScreen.style.display = 'block';
            backBtn.style.visibility = 'hidden';
           
            otpInputs.forEach(input => input.value = '');
        }
    });



  
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const provider = e.currentTarget.textContent.trim();
           
            alert(`${provider} login clicked`);
        });
    });

   
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const imgSrc = type === 'password' ? 
            'https://assets.ajio.com/static/img/hide-password.svg' : 
            'https://assets.ajio.com/static/img/show-password.svg';
        togglePasswordBtn.innerHTML = `<img src="${imgSrc}" alt="${type === 'password' ? 'Show' : 'Hide'} password">`;
    });


    accountList.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const previousSelected = accountList.querySelector('.selected');
            if (previousSelected) {
                previousSelected.classList.remove('selected');
            }
            e.target.parentElement.classList.add('selected');

            if (accountList.children.length > 0) {
                accountScreen.style.display = 'none';
                passwordScreen.style.display = 'block';
                passwordInput.focus();
            }
        }
    });

    loginBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        if (password.length >= 6) {
            
            const selectedAccount = accountList.querySelector('input[type="radio"]:checked');
            if (selectedAccount) {
                alert(`Login successful with account: ${selectedAccount.value}`);
              
                loginContainer.style.display = 'none';
                document.body.style.overflow = 'auto';
               
                signInBtn.textContent = 'Welcome ' + selectedAccount.value.split('@')[0];
            } else {
                alert('Please select an account');
            }
        } else {
            alert('Please enter a valid password (minimum 6 characters)');
        }
    });
});
