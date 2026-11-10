/* Stillwater Apothecary · landingspagina
   - toont het eigen formulier zolang er geen MailerLite-embed staat
   - valideert naam, e-mail en opt-in
   - toont een bevestiging na inschrijving
   - onthoudt welke smaak de bezoeker koos (voor de e-mailflow)
*/
(function () {
  "use strict";

  /* Optioneel: vul hier de 'action'-URL uit je MailerLite-embedcode in
     (iets als https://assets.mailerlite.com/jsonp/123456/forms/987654/subscribe).
     Dan stuurt het eigen formulier de inschrijving echt door naar MailerLite.
     Leeg laten = demo: de bevestiging verschijnt, maar er wordt niets verstuurd. */
  var MAILERLITE_ACTION = "";

  /* ---- Subtiele animaties: elementen verschijnen rustig bij het scrollen ---- */
  var revealSelectors = [
    ".intro__quote", ".verhaal__beeld", ".verhaal__text", ".sectiekop",
    ".kaart", ".stappen li", ".inschrijven__text", ".formkaart", ".slot .wrap > *"
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(","));
  revealEls.forEach(function (el) {
    el.classList.add("reveal");
    var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.matches(revealSelectors.join(","));
    }) : [];
    var idx = siblings.indexOf(el);
    if (idx > 0) el.setAttribute("data-vertraging", String(Math.min(idx, 2)));
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-zichtbaar");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-zichtbaar"); });
  }

  /* ---- Beelden die nog ontbreken: nette plaatshouder ---- */
  document.querySelectorAll("img").forEach(function (img) {
    function markeer() {
      img.classList.add("ontbreekt");
      var fig = img.closest("figure");
      if (fig && !fig.querySelector(".beeld-label")) {
        var lbl = document.createElement("span");
        lbl.className = "beeld-label";
        lbl.textContent = img.getAttribute("src");
        fig.appendChild(lbl);
      }
    }
    if (img.complete && img.naturalWidth === 0) markeer();
    img.addEventListener("error", markeer);
  });

  /* ---- MailerLite-embed aanwezig? Dan eigen formulier verbergen ---- */
  var embed = document.getElementById("mailerlite-embed");
  var form = document.getElementById("inschrijfformulier");
  var bevestiging = document.getElementById("bevestiging");
  var heeftEmbed = embed && embed.querySelector("form, div[class*='ml-'], script");
  if (heeftEmbed) {
    form.hidden = true;
    return;
  }

  /* ---- Gedrag: smaakkeuze en bron (utm_source) ---- */
  document.querySelectorAll("[data-voorkeur]").forEach(function (knop) {
    knop.addEventListener("click", function () {
      var waarde = knop.getAttribute("data-voorkeur");
      var radio = form.querySelector('input[name="fields[voorkeur]"][value="' + waarde + '"]');
      if (radio) radio.checked = true;
    });
  });

  var params = new URLSearchParams(window.location.search);
  var bron = params.get("utm_source");
  if (bron) document.getElementById("bron").value = "landingspagina-" + bron;

  /* ---- Validatie ---- */
  var velden = {
    naam: { el: document.getElementById("naam"), fout: document.getElementById("naam-fout"),
            ok: function (v) { return v.trim().length > 0; } },
    email: { el: document.getElementById("email"), fout: document.getElementById("email-fout"),
             ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
    optin: { el: document.getElementById("optin"), fout: document.getElementById("optin-fout"),
             ok: function () { return document.getElementById("optin").checked; } }
  };

  function controleer(sleutel) {
    var v = velden[sleutel];
    var geldig = v.ok(v.el.value);
    v.fout.hidden = geldig;
    v.el.setAttribute("aria-invalid", geldig ? "false" : "true");
    if (!geldig) v.el.setAttribute("aria-describedby", v.fout.id);
    else v.el.removeAttribute("aria-describedby");
    return geldig;
  }

  Object.keys(velden).forEach(function (k) {
    velden[k].el.addEventListener(k === "optin" ? "change" : "blur", function () { controleer(k); });
  });

  /* ---- Versturen ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var eersteFout = null;
    Object.keys(velden).forEach(function (k) {
      if (!controleer(k) && !eersteFout) eersteFout = velden[k].el;
    });
    if (eersteFout) { eersteFout.focus(); return; }

    var knop = form.querySelector('button[type="submit"]');
    knop.disabled = true;
    knop.textContent = "Even geduld";

    var klaar = function () { toonBevestiging(velden.naam.el.value.trim()); };

    if (MAILERLITE_ACTION) {
      var data = new FormData(form);
      data.append("ml-submit", "1");
      data.append("anticsrf", "true");
      fetch(MAILERLITE_ACTION, { method: "POST", body: data, mode: "no-cors" })
        .then(klaar)
        .catch(klaar);
    } else {
      setTimeout(klaar, 500);
    }
  });

  function toonBevestiging(naam) {
    document.getElementById("bevestiging-naam").textContent = naam ? ", " + naam : "";
    form.hidden = true;
    bevestiging.hidden = false;
    bevestiging.focus();
    bevestiging.scrollIntoView({ behavior: "smooth", block: "center" });
  }
})();
