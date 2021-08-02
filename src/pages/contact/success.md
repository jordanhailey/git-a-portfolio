# Form submission successful
<div class="has-aside-left" class="scroll-x">
  <aside class="flex all-cntr">
    <p class=""><a href="/">Redirecting to the homepage</a> in <span id="countdown">10</span> seconds.</p>
  </aside>
  <div>
    <p class="font-xxl">Here is your message</p>
      <p class="font-med"><strong>From:</strong></p>
    <pre>
      <code class="font-sml" id="name"></code> <<code class="font-sml" id="email"></code>>
    </pre>
      <p class="font-med"><strong>Sent:</strong></p>
    <pre>
      <code class="font-sml" id="date"></code>
    </pre>
      <p class="font-med"><strong>Message:</strong></p>
    <pre>
      <code class="font-sml" id="message"></code>
    </pre>
  </div>
</div>

<script>
  const formData = new URLSearchParams(window.location.search.substr(1));
  const [name,email,message,date] = [formData.get("name"),formData.get("email"),formData.get("message"),formData.get("date")]
  document.querySelector("#name").innerText = name;
  document.querySelector("#email").innerText = email;
  document.querySelector("#message").innerText = message;
  document.querySelector("#date").innerText = new Date();

  let countdown = Number(document.querySelector("#countdown").innerText);
  history.replaceState(null,"",window.location.origin+"/contact/");
  let interval = setInterval(()=>{
    countdown--;
    document.querySelector("#countdown").innerText = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      window.location = window.location.origin;
    }
  },1000)
</script>
