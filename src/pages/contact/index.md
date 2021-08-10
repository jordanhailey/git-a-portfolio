# Let's work together

<form netlify id="contact_form_{% if permalink != '/' %}{{permalink | slug}}{% else %}index{% endif %}" class="form flex flex-dir-col" name="contact_form_{% if permalink != '/' %}{{permalink | slug}}{% else %}index{% endif %}">
  <label class="form__row input__label">
    <div class="input__label__text">Your Name (required)</div>
    <input class="input" type="text" name="name" placeholder="e.g. Ariel H." required />
  </label>
  <label class="form__row input__label">
    <div class="input__label__text">Your Email (required)</div>
    <input class="input" type="email" name="email" placeholder="e.g. ariel@email.com" required />
  </label>
  <label class="form__row input__label form__hp">
    <div class="input__label__text">Your Telephone Number (required)</div>
    <input class="input" type="tel" name="tel" placeholder="e.g. +1-555-555-5555" required/>
  </label>
  <label class="form__row input__label">
    <div class="input__label__text">A Brief Message to Explain the Opportunity (required)</div>
    <textarea class="input" name="message" placeholder="e.g. We would like to discuss an opportunity to help us develop a new UI for our app..." required></textarea>
  </label>
  <label style="display: none;" class="form__row input__label">
    <div class="input__label__text">Random Number Captcha (required)</div>
    <div class="input__label__sub__text font__sml">Please type in the following number: <span id="quick-captcha"></span></div>
    <input class="input" type="number" name="quickcaptcha" placeholder="Please enter the number: 789"></textarea>
  </label>
  <div class="form__submit">
    <input class="input btn__submit" type="submit"/>
  </div>
</form>
