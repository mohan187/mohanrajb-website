(function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeKnob = document.getElementById("themeKnob");
  const themeLabel = document.getElementById("themeLabel");
  const profile = {
    linkedinUrl: "http://linkedin.com/in/mohan-raj-devops-engineer",
    githubUrl: "https://github.com/mohan187",
    email: "mohanrajbalan19@gmail.com",
    resumeDriveUrl: "",
    localResumeUrl: "/assets/mohanraj-balan-condensed-cv.html"
  };

  const sunIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.9 4.9l1.4 1.4"></path><path d="M17.7 17.7l1.4 1.4"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.9 19.1l1.4-1.4"></path><path d="M17.7 6.3l1.4-1.4"></path></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 1 0 9.8 9.8z"></path></svg>';

  function applyTheme(theme) {
    const dark = theme === "dark";
    body.classList.toggle("dark-mode", dark);
    if (themeKnob) {
      themeKnob.innerHTML = dark ? moonIcon : sunIcon;
    }
    if (themeLabel) {
      themeLabel.textContent = dark ? "DARK" : "LIGHT";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  const resumeUrl = profile.resumeDriveUrl || profile.localResumeUrl;
  const links = {
    linkedin: profile.linkedinUrl,
    github: profile.githubUrl,
    email: `mailto:${profile.email}`,
    resume: resumeUrl
  };

  document.querySelectorAll("[data-profile-link]").forEach(function (anchor) {
    const key = anchor.getAttribute("data-profile-link");
    const href = links[key];

    if (!href) {
      return;
    }

    anchor.setAttribute("href", href);

    if (key === "linkedin" || key === "github") {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noreferrer");
    }

    if (key === "resume") {
      if (!profile.resumeDriveUrl) {
        anchor.setAttribute("download", "Mohanraj-Balan-Condensed-CV.html");
      } else {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noreferrer");
      }
    }

  });

  document.querySelectorAll("[data-profile-email]").forEach(function (node) {
    node.textContent = profile.email;
  });

  document.querySelectorAll('form[action^="mailto:"]').forEach(function (form) {
    form.setAttribute("action", `mailto:${profile.email}`);
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  function startTypewriter(el, roles) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      let delay = deleting ? 50 : 90;

      if (!deleting) {
        charIndex += 1;
        if (charIndex >= current.length) {
          charIndex = current.length;
          deleting = true;
          delay = 1050;
        }
      } else {
        charIndex -= 1;
        if (charIndex <= 0) {
          charIndex = 0;
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 240;
        }
      }

      el.textContent = current.slice(0, charIndex);
      window.setTimeout(tick, delay);
    }

    tick();
  }

  const typedTargets = document.querySelectorAll(".typed-role");
  typedTargets.forEach(function (target) {
    const roles = (target.dataset.roles || "DevOps Engineer|CloudOps Engineer")
      .split("|")
      .map(function (v) {
        return v.trim();
      })
      .filter(Boolean);

    if (roles.length > 0) {
      startTypewriter(target, roles);
    }
  });
})();
