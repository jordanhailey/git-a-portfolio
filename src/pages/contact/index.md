# Let's work together

<form onsubmit="(e)=>handleSubmit(e)" id="contact_form_{% if permalink != '/' %}{{permalink | slug}}{% else %}index{% endif %}" class="form flex flex-dir-col" name="contact_form_{% if permalink != '/' %}{{permalink | slug}}{% else %}index{% endif %}">
  <label class="form__row input__label">
    <div class="input__label__text">Name (required)</div>
    <input class="input" type="text" name="name" placeholder="Your Name (e.g. Bo Jackson)" required />
  </label>
  <label class="form__row input__label" aria-label="Email">
    <div class="input__label__text">Email (required)</div>
    <input class="input" type="email" name="email" placeholder="Your Email (e.g. name@email.com)" required />
  </label>
  <label class="form__row input__label form__hp" tabindex="-1" aria-hidden="true">
    <div class="input__label__text">DO NOT CHANGE THIS VALUE</div>
    <input class="input" type="tel" name="tel" placeholder="e.g. +1-555-555-5555" tabindex="-1" value="+1-555-555-5555" required/>
  </label>
  <label class="form__row input__label">
    <div class="input__label__text">Opportunity (required)</div>
    <textarea class="input" name="message" placeholder="e.g. I would like to speak with you about a freelancing opportunity with my team..." required></textarea>
  </label>
  <label style="display: none;" class="form__row input__label">
    <div class="input__label__text">Quick Captcha (required)</div>
    <div class="input__label__sub__text font__sml">Please type in the following number: <div id="quick-captcha"></div></div>
    <input class="input" type="number" name="quickcaptcha" placeholder="Please enter the number: 789"></textarea>
  </label>
  <div class="form__submit">
    <input class="input btn__submit" type="submit"/>
  </div>
</form>
<script>
  function attachSubmissionHandler(form){
    // if (sessionStorage.getItem('contact-form-submitted') == "true") return section.style.display = "none";
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
      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => {
          console.log('Form successfully submitted',{entries:Array.from(formData.entries()).map(v=>v)});
          sessionStorage.setItem('contact-form-submitted',Date.now())
          form.style=`--mBottom:${-1 * form.offsetHeight}px;transform-origin:top;animation:fadeOutWrapper 1s ease-in-out forwards`;
          document.querySelector("#form-submitted").style = "";
          setTimeout(()=>{
            console.log(window.location)
            window.location = window.location.href+"success"
          },10000)
        })
        .catch((error) =>
          alert(error))
    })
  }
  attachSubmissionHandler(document.querySelector("#contact_form_{% if permalink != '/' %}{{permalink | slug}}{% else %}index{% endif %}"));
</script>
