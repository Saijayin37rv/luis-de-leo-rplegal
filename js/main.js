/**
 * Representante Legal - Luis De Leon | Página Web
 * Script principal: menú móvil, validación de formulario, enlace a WhatsApp y consentimiento de cookies.
 */

// ========== REDES SOCIALES – Cambia aquí tus URLs ==========
// Deja en blanco ("") la red que no quieras mostrar.
var SOCIAL_LINKS = {
  whatsapp: "528281201370",           // Número con código de país, sin + (ej: 5215512345678)
  instagram: "https://www.instagram.com/invites/contact/?igsh=ef1a1y132qx8&utm_content=lrq3esr",
  facebook: "https://www.facebook.com/share/1HdVrAKD8V/?mibextid=wwXIfr",
  tiktok: "https://tiktok.com/@",      // Ej: https://tiktok.com/@tu_usuario (deja "" si no usas)
};
// ===========================================================

(function () {
  "use strict";

  const WHATSAPP_NUMBER = SOCIAL_LINKS.whatsapp || "528281201370";
  const COOKIE_CONSENT_KEY = "luisdeleon_cookie_consent";

  // ----- Consentimiento de cookies -----
  function hideCookieBanner() {
    var banner = document.getElementById("cookie-consent");
    if (banner) {
      banner.setAttribute("hidden", "");
      banner.classList.add("cookie-consent--accepted");
      banner.style.display = "none";
    }
  }

  var cookieBanner = document.getElementById("cookie-consent");
  var cookieAccept = document.getElementById("cookie-accept");
  if (cookieBanner && cookieAccept) {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_KEY)) {
        hideCookieBanner();
      }
      cookieAccept.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        } catch (err) {}
        hideCookieBanner();
      });
    } catch (err) {}
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
          "*Consulta desde Luis De Leon | LUMEX*",
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

  // ----- Redes sociales en footer y botón flotante WhatsApp -----
  function getWhatsAppUrl() {
    var num = (SOCIAL_LINKS.whatsapp || "").replace(/\D/g, "");
    return num ? "https://wa.me/" + num : "#";
  }

  function renderFooterSocial() {
    var container = document.getElementById("footer-social");
    if (!container) return;

    var links = [];
    if (SOCIAL_LINKS.whatsapp) {
      links.push({ url: getWhatsAppUrl(), label: "WhatsApp", icon: "whatsapp" });
    }
    if (SOCIAL_LINKS.instagram) {
      links.push({ url: SOCIAL_LINKS.instagram, label: "Instagram", icon: "instagram" });
    }
    if (SOCIAL_LINKS.facebook) {
      links.push({ url: SOCIAL_LINKS.facebook, label: "Facebook", icon: "facebook" });
    }
    if (SOCIAL_LINKS.tiktok) {
      links.push({ url: SOCIAL_LINKS.tiktok, label: "TikTok", icon: "tiktok" });
    }

    var icons = {
      whatsapp: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
      instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
      facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
      tiktok: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>'
    };

    container.innerHTML = "";
    links.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "footer-social-link";
      a.setAttribute("aria-label", item.label);
      a.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + (icons[item.icon] || "") + "</svg>";
      container.appendChild(a);
    });
  }

  function initSocialLinks() {
    renderFooterSocial();
    var floatLink = document.getElementById("whatsapp-float-link");
    if (floatLink && SOCIAL_LINKS.whatsapp) {
      floatLink.href = getWhatsAppUrl();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSocialLinks);
  } else {
    initSocialLinks();
  }
})();
