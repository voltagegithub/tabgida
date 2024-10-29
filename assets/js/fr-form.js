var districts = null;
const districtElement = document.querySelector("#district");

function makeDistrictSelectBox(cityDistricts){
    const options = districtElement.querySelectorAll(":not(option[value=''])");
    options.forEach(item=>item.remove());

    cityDistricts.forEach(item=>{
        const option=document.createElement('option');
        option.value=item.name;
        option.text =item.name;

        districtElement.appendChild(option);
    });

    

}

const cityElement = document.querySelector("#city");
cityElement.addEventListener("change",async function(e){
    const id = e.target.options[e.target.selectedIndex].dataset.id;
    
    
    if(!districts){
        const results = await axios.get('../data/franchising/districts/');
        districts = results.data;
    }

    makeDistrictSelectBox(districts.filter(item=>item.provinceId==id));
    
    
})


    const phoneElement = document.querySelector("#gsm");
    const amountElement = document.querySelector("#investmentAmount");
    const maskOptions = {
        mask: '0(000) 000 00 00'
    };
    const mask = IMask(phoneElement, maskOptions);  


IMask(amountElement,{
    mask: Number,  // enable number mask

    // other options are optional with defaults below
    scale: 0,  // digits after point, 0 for integers
    thousandsSeparator: ',',  // any single char
    padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,  // appends or removes zeros at ends
    radix: ',',  // fractional delimiter
    mapToRadix: ['.'],  // symbols to process as radix

    // additional number interval options (e.g.)
    min: 0,
    max: 9999999999,
    autofix: true,
})

document.querySelector("#edit-form-lnk").addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector(".form-wrapper").style.display='block';
    document.querySelector("#information-wrapper").style.display='none';
});


let applicationForm = document.getElementById('fr-form');
const submitBtnWrapper = document.querySelector("#send");

applicationForm.addEventListener('submit',(e)=>{
    const formData = new FormData(applicationForm);
    const formUrl = applicationForm.getAttribute('action');
    submitBtnWrapper.style.visibility = 'hidden';

   
   document.querySelectorAll(".form-error").forEach(el => el.remove());

    axios.post(formUrl,formData).then((res)=>{
        let content = document.querySelectorAll(".personel-info-container, .form-wrapper-brands, .investment-amount-container");
        content.forEach(el=>el.remove());
        document.querySelector("#fr-form").style.display='none';
        document.querySelector("#form-success-message").classList.add('show');
        document.querySelector("#form-success-text").innerText = res.data.msg;
        window.scrollTo({
                behavior:'smooth',
                top:document.querySelector(".form-wrapper-alt-header").parentNode.parentNode.offsetTop - 150
            });


    }).catch((err)=>{
        submitBtnWrapper.style.visibility = 'visible';

        grecaptcha.reset();
        if(err.response.data.information){
            document.querySelector(".form-wrapper").style.display='none';
            document.querySelector("#information-text").innerHTML=err.response.data.information;
            document.querySelector("#information-wrapper").style.display='block';

            window.scrollTo({
                behavior:'smooth',
                top:document.querySelector('#information-wrapper').parentNode.parentNode.offsetTop - 150
            });

            
        }else{
            let errors = err.response.data.errors;
        
            let errorKeys = [];
            for([key,error] of Object.entries(errors)){
                errorKeys.push(key);
                let input = applicationForm.querySelector('input[name="'+key+'"]');
                if(!input){
                    input = document.getElementById(key);
                }

                


                let parent = input ? input.parentNode : document.querySelector('.send-button button[type="submit"]').parentNode.parentNode;
                if(input.type=='checkbox'){
                    parent = input.parentNode.parentNode.parentNode;   
                }
                let errorElement = document.createElement('div');
                errorElement.classList.add('form-error');
                if(input){
                    errorElement.innerText = error;
                    parent.appendChild(errorElement);
                }

            }

            document.querySelector('.fr-form-outter').scrollTo({
                behavior:'smooth',
                top:[...document.querySelectorAll('.form-error')][0].parentNode.parentNode.offsetTop - 150
            });

            [...document.querySelectorAll('.form-error')][0].classList.add('blink-form-error');
        }
        
        

        
        
    })
    
    e.preventDefault();
})