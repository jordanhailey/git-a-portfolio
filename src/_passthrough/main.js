const homepage = () => {
  console.log("HOMEPAGE");
  if (sessionStorage.getItem("contact-form-submitted")) { // TODO: change to localStorage
    let daysSince = Math.floor((Date.now() - Number(sessionStorage.getItem("contact-form-submitted")))/8.64e7);
    if (daysSince < 0 || daysSince > 3) localStorage.removeItem("contact-form-submitted")
    else {
      document.querySelector("#contact-me").style = "display:none;";
      document.querySelector("#contact-me-submitted").style = "";
    }
  }
}
function setCaptcha(form){
  let randNum;
  const captcha = form.querySelector("input[name='quickcaptcha']");
  if (randNum == undefined) {
    randNum = Math.floor(1234 * Math.random());
    captcha.required = true;
    captcha.parentNode.style = "";
    form.querySelector("#quick-captcha").innerText = randNum;
    captcha.placeholder = `Enter the number: ${randNum}`;
  }
  return randNum;
}
function attachSubmissionHandler(form){
  let randNum;
  window.onload = () =>{
    setTimeout(()=>{
      if (randNum == undefined) randNum = setCaptcha(form);
    },10000)
  }
  form.addEventListener("submit",(e) => {
    e.preventDefault()
    let formData = new FormData(form);
    if (randNum==undefined) {
      randNum = setCaptcha(form);
      return
    }
    if (Number(formData.get("quickcaptcha")) !== randNum) {
      alert(`unable to process form entry, please close this popup and enter the number ${randNum} in the Captcha field`)
      return;
    }
    formData.append("date",Date.now())
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        console.log('Form successfully submitted',{entries:Array.from(formData.entries()).map(v=>v)});
        sessionStorage.setItem('contact-form-submitted',Date.now()); // TODO migrate to localStorage when form is tested
        form.style=`--mBottom:${-1 * form.offsetHeight}px;transform-origin:top;animation:fadeOutWrapper 1s ease-in-out forwards`;
        setTimeout(()=>{
          console.log(location)
          location = location.href+"success?"+new URLSearchParams(formData).toString()
        },1000)
      })
      .catch((error) =>{
        alert(error);
        location = location.href+"error";
      });
  })
}


const successPage = () => {
  const formData = new URLSearchParams(location.search.substr(1));
  const [name,email,tel,message] = [formData.get("name"),formData.get("email"),formData.get("tel"),formData.get("message")]
  document.querySelector("#name").innerText = name;
  document.querySelector("#email").innerText = email;
  document.querySelector("#tel").innerText = tel;
  document.querySelector("#message").innerText = message;
  if (name && email) document.querySelector("#date").innerText = new Date();

  let countdown = Number(document.querySelector("#countdown").innerText);
  // history.replaceState(null,"",location.origin+"/contact/");
  let interval = setInterval(()=>{
    countdown--;
    document.querySelector("#countdown").innerText = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      location = location.origin;
    }
  },1000)
}

const oops = () => {
  let countdown = Number(document.querySelector("#countdown").innerText);
  let interval = setInterval(()=>{
    countdown--;
    document.querySelector("#countdown").innerText = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      history.replaceState(null,"",location.origin);
      location = location.origin;
    }
  },1000)
}


const page = location.pathname.replace("index.html","");
switch (page) {
  case "/":
    homepage()
    break;
  case "/contact/":
    attachSubmissionHandler(document.querySelector("form"));
    break;
  case "/contact/success/":
    successPage();
    break;
  case "/contact/error/":
    history.replaceState(null,"",location.origin+"/contact/");
    break;
  case "/404/":
    oops();
    break;
  default:
    break;
}

const navToggle = document.querySelector("header .nav-toggle");
const nav = document.querySelector('main nav[aria-label="mobile navigation"]');
const pageWrapper = document.querySelector('.page-wrapper');

navToggle.addEventListener('click',function(){
  let active = pageWrapper.classList.contains('mobile-nav-visible');
  this.setAttribute("aria-expanded",!active);
  pageWrapper.classList.remove('mobile-nav-visible');
  if (!active) {pageWrapper.classList.add('mobile-nav-visible');}
})
