function attachSubmissionHandler(form){
  let randNum;
  form.addEventListener("submit",(e) => {
    e.preventDefault()
    let formData = new FormData(form);
    const captcha = form.querySelector("input[name='quickcaptcha']");
    if (!/555-555-5555/.test(formData.get("tel")) || randNum) {
      if (randNum == undefined) {
        form.classList.add("rejected");
        randNum = Math.floor(1234 * Math.random());
        captcha.required = true;
        captcha.min = randNum;
        captcha.max = randNum;
        captcha.parentNode.style = "";
        form.querySelector("#quick-captcha").innerText = randNum;
        captcha.placeholder = `Please enter the number: ${randNum}`;
        return;
      } else if (Number(formData.get("quickcaptcha")) !== randNum) {return}
    }
    formData.delete("tel");
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
          console.log(window.location)
          window.location = window.location.href+"success?"+new URLSearchParams(formData).toString()
        },1000)
      })
      .catch((error) =>{
        alert(error);
        window.location = window.location.href+"error";
      });
  })
}
attachSubmissionHandler(document.querySelector("form"));
