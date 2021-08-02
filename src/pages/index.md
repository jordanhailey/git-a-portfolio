---
title: Jordan Hailey's Portfolio
description: A portfolio homepage!
---
# Hey there, I'm Jordan 👋🏽

<span class="font-xlg">I'm a Front End Developer.</span>

I'm seeking opportunities, and if your team could use help with any of following stack, I'd love to discuss working with you.

## What I like to build with
- JavaScript (including TypeScript)
- HTML
- CSS
- Frameworks like Svelte, 11ty\*, Express, React, Next, and Vue
- Node and Deno backends
> \* I built this portfolio site from scratch with 11ty, feel free to [take a look at the source code](https://github.com/jordanhailey/jordanhailey).

## Let's work together
<div id="contact-me">
<p>Interested in working together? <a href="/contact">Reach out to me via my contact form</a>.</p>
<p>I'm looking forward to working with you and giving back to the OSS community!</p>
</div>
<div id="contact-me-submitted" style="display:none">
  <p>
    Thanks for reaching out to me via <a href="/contact">my contact form</a>.
  <em>If you've been waiting for a response for more than two days</em>, please feel free to reach out to me on
  <a href="https://www.linkedin.com/in/jordanhailey/" target="_blank" rel="noopenner noreferrer">LinkedIn</a> or <a href="https://twitter.com/Halfro_American" target="_blank" rel="noopenner noreferrer">Twitter</a>.
  </p>
</div>
<script>
if (localStorage.getItem("contact-form-submitted")) {
  let daysSince = Math.floor((Date.now() - Number(localStorage.getItem("contact-form-submitted")))/8.64e7);
  if (daysSince < 0 || daysSince > 3) localStorage.removeItem("contact-form-submitted")
  else {
    document.querySelector("#contact-me").style = "display:none;";
    document.querySelector("#contact-me-submitted").style = "";
  }
}
</script>
