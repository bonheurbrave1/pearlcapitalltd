/* Place in: js/script.js
   Interactions: mobile nav, reveal animations, counters, testimonial rotation,
   FAQ toggle, newsletter form & simple accessibility enhancements.
*/

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- MOBILE NAV ---------- */
    const hamburgers = document.querySelectorAll('.hamburger');
    hamburgers.forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.closest('.main-nav').querySelector('.nav-list');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('show');
      });
    });
  
    // close mobile nav on link click
    document.querySelectorAll('.nav-list a').forEach(a => {
      a.addEventListener('click', () => {
        const nav = document.querySelector('.nav-list');
        if (nav.classList.contains('show')) nav.classList.remove('show');
        document.querySelectorAll('.hamburger').forEach(h => h.setAttribute('aria-expanded','false'));
      });
    });
  
    /* ---------- SCROLL REVEAL ---------- */
    const animElements = document.querySelectorAll('[data-anim]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    animElements.forEach(el => observer.observe(el));
  
    /* ---------- COUNTERS ---------- */
    const counters = document.querySelectorAll('.count');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        const duration = 1500;
        const stepTime = Math.max(20, Math.floor(duration / Math.max(target, 1)));
        let current = 0;
        const increment = Math.max(1, Math.floor(target / (duration / stepTime)));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, stepTime);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach(c => counterObserver.observe(c));
  
    /* ---------- TESTIMONIAL SLIDER ---------- */
    document.querySelectorAll('.testimonial-slider').forEach(container => {
      const items = Array.from(container.querySelectorAll('.testimonial'));
      if (items.length <= 1) return;
      let idx = 0;
      items.forEach((it, i) => { it.style.display = i === 0 ? 'block' : 'none'; });
      setInterval(() => {
        items[idx].style.display = 'none';
        idx = (idx + 1) % items.length;
        items[idx].style.display = 'block';
      }, 4500);
    });
  
    /* ---------- FAQ TOGGLE ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', () => {
        const open = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', String(!open));
        if (!open) {
          a.style.maxHeight = a.scrollHeight + 'px';
          q.querySelector('i') && (q.querySelector('i').style.transform = 'rotate(180deg)');
        } else {
          a.style.maxHeight = null;
          q.querySelector('i') && (q.querySelector('i').style.transform = 'rotate(0deg)');
        }
      });
    });
  
    /* ---------- NEWSLETTER FORM (simulated) ---------- */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        const msg = document.getElementById('newsletterMessage');
        const email = emailInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!valid) {
          msg.textContent = 'Please enter a valid email address.';
          msg.style.color = 'crimson';
          return;
        }
        msg.style.color = 'var(--primary)';
        msg.textContent = 'Subscribing...';
        setTimeout(() => {
          msg.textContent = 'Thank you — you are subscribed!';
          emailInput.value = '';
        }, 900);
      });
    }
  
    /* ---------- A11Y: keyboard close nav (escape) ---------- */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-list').forEach(nav => nav.classList.remove('show'));
        document.querySelectorAll('.hamburger').forEach(h => h.setAttribute('aria-expanded','false'));
      }
    });
  
    /* ---------- Smooth anchor scrolling for same-page anchors (if any) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // allow normal behavior if external link or only '#'
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const targetId = href.slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  });
  

  // ===== NAVBAR TOGGLE =====
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ===== COUNTERS ANIMATION =====
const counters = document.querySelectorAll('.counter span');
if (counters.length > 0) {
  counters.forEach(counter => {
    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200; // speed
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const sections = document.querySelectorAll('.section, .hero');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.classList.add('visible');
    }
  });
});

// ===== TESTIMONIAL SLIDER (Optional for homepage) =====
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;
function rotateTestimonials() {
  testimonials.forEach((t, i) => {
    t.style.display = (i === currentTestimonial) ? 'block' : 'none';
  });
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}
if (testimonials.length > 0) {
  rotateTestimonials();
  setInterval(rotateTestimonials, 5000);
}


// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
hamburger?.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  navList.style.display = expanded ? 'none' : 'flex';
});

// FAQ toggle
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
  });
});


// Simple fade-in on scroll
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.about-section, .hero');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.2 });
  
    elements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  });
  