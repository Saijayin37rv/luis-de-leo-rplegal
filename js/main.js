/**
 * Representante Legal - Luis De Leon | Página Web
 * Script principal: menú móvil, validación de formulario, enlace a WhatsApp y consentimiento de cookies.
 */
(function () {
  "use strict";

  const WHATSAPP_NUMBER = "528281201370";
  const COOKIE_CONSENT_KEY = "luisdeleon_cookie_consent";

  // ----- Consentimiento de cookies -----
  var cookieBanner = document.getElementById("cookie-consent");
  var cookieAccept = document.getElementById("cookie-accept");
  if (cookieBanner && cookieAccept) {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_KEY)) {
        cookieBanner.hidden = true;
      }
      cookieAccept.addEventListener("click", function () {
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        } catch (e) {}
        cookieBanner.hidden = true;
      });
    } catch (e) {}
  }

  // ----- Menú móvil -----
  var btnMenu = document.querySelector(".btn-menu");
  var mobileMenu = document.getElementById("mobile-menu");
  if (btnMenu && mobileMenu) {
    btnMenu.addEventListener("click", function () {
      var isOpen = btnMenu.getAttribute("aria-expanded") === "true";
      btnMenu.setAttribute("aria-expanded", !isOpen);
      mobileMenu.hidden = isOpen;
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        btnMenu.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  // ----- Validación del formulario -----
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showError(id, message) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  }

  function hideError(id) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = "";
      el.hidden = true;
    }
  }

  function hideAllFormErrors() {
    ["name-error", "email-error", "phone-error", "message-error", "form-root-error"].forEach(hideError);
  }

  function validateForm(data) {
    var valid = true;
    hideAllFormErrors();

    if (!data.name || data.name.trim().length < 2) {
      showError("name-error", "Nombre requerido (mín. 2 caracteres)");
      valid = false;
    }
    if (!data.email) {
      showError("email-error", "Email requerido");
      valid = false;
    } else if (!validateEmail(data.email)) {
      showError("email-error", "Email no válido");
      valid = false;
    }
    if (data.phone && data.phone.trim().length > 0 && data.phone.replace(/\D/g, "").length < 9) {
      showError("phone-error", "Teléfono debe tener al menos 9 dígitos");
      valid = false;
    }
    if (!data.message || data.message.trim().length < 10) {
      showError("message-error", "Mensaje requerido (mín. 10 caracteres)");
      valid = false;
    }
    return valid;
  }

  // ----- Envío a WhatsApp -----
  var form = document.getElementById("contact-form");
  var formSuccess = document.getElementById("form-success");
  var submitBtn = document.getElementById("submit-btn");

  if (form && formSuccess && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
      };

      if (!validateForm(data)) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";

      try {
        var lines = [
          "*Consulta desde Representante Legal - Luis De Leon*",
          "",
          "Nombre: " + data.name,
          "Email: " + data.email,
        ];
        if (data.phone) lines.push("Teléfono: " + data.phone);
        lines.push("", "Mensaje:", data.message);
        var text = lines.join("\n");
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
        window.open(url, "_blank", "noopener,noreferrer");
        formSuccess.hidden = false;
        form.classList.add("hidden");
        form.reset();
        hideAllFormErrors();
      } catch (err) {
        showError("form-root-error", "Error al abrir WhatsApp. Inténtelo de nuevo.");
      }

      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensaje";
    });
  }
})();
