PÁGINA WEB - Representante Legal Luis De Leon
=============================================

Contenido de la carpeta:
  - index.html           → Página principal
  - aviso-privacidad.html → Aviso de privacidad (enlace en footer)
  - css/style.css        → Estilos (diseño elegante y formal, responsive)
  - js/main.js           → Menú móvil, validación formulario, WhatsApp, consentimiento cookies
  - robots.txt           → Instrucciones para buscadores (indexación)
  - sitemap.xml          → Mapa del sitio para SEO
  - .htaccess            → Cabeceras de seguridad (Apache)
  - security.txt         → Contacto de seguridad (estándar securitytxt.org)

SEO e indexación:
  - Meta description, keywords, canonical, Open Graph, Twitter Card
  - JSON-LD (LegalService) para rich results en buscadores
  - robots.txt: Allow / y enlace al Sitemap
  - sitemap.xml: índice de URLs (actualiza lastmod al cambiar contenido)

Seguridad:
  - .htaccess: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
  - Meta de seguridad en index.html (nosniff, referrer)
  - Banner de cookies con enlace al aviso de privacidad

Antes de publicar:
  1. Reemplaza "https://tudominio.com" por tu URL real en:
     - index.html (canonical, og:url, og:image, JSON-LD url)
     - aviso-privacidad.html (canonical)
     - robots.txt (Sitemap)
     - sitemap.xml (loc de cada url)
     - security.txt (Contact, Canonical)
  2. Si tienes una imagen para redes sociales, súbela como og-image.jpg y mantén la meta og:image.

Cómo usar:
  1. Sube TODA la carpeta a tu hosting (FTP, cPanel, Netlify, GitHub Pages, etc.).
  2. La URL principal debe apuntar a index.html (habitual por defecto).
  3. No hace falta Node.js: solo hosting estático. En Apache, .htaccess aplicará las cabeceras de seguridad.

Para probar en local:
  - Abre index.html con doble clic, o
  - Usa "Abrir con Live Server" en VS Code, o
  - npx serve .

WhatsApp: botón flotante y formulario → +52 8281201370.
Para cambiar el número: edita WHATSAPP_NUMBER en js/main.js (sin + ni espacios).
