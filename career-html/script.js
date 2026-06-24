const setMenuState = (button, menu, isOpen) => {
  menu.classList.toggle("open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
};

document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
  const menu = document.querySelector("[data-nav-menu]");
  if (!menu) return;

  button.addEventListener("click", () => {
    setMenuState(button, menu, !menu.classList.contains("open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(button, menu, false));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
    const menu = document.querySelector("[data-nav-menu]");
    if (menu?.classList.contains("open")) setMenuState(button, menu, false);
  });
});

document.querySelectorAll("[data-faq-item]").forEach((item) => {
  const button = item.querySelector("[data-faq-question]");
  if (!button) return;
  button.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

const filterForm = document.querySelector("[data-job-filter]");
if (filterForm) {
  const cards = Array.from(document.querySelectorAll("[data-job-card]"));
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(filterForm);
    const query = String(data.get("query") || "").toLowerCase();
    const department = String(data.get("department") || "all");
    const location = String(data.get("location") || "all");

    cards.forEach((card) => {
      const haystack = card.textContent.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const matchesDepartment = department === "all" || card.dataset.department === department;
      const matchesLocation = location === "all" || card.dataset.location === location;
      card.hidden = !(matchesQuery && matchesDepartment && matchesLocation);
    });
  });
}

const departmentButtons = Array.from(document.querySelectorAll("[data-department-filter]"));
if (departmentButtons.length) {
  const cards = Array.from(document.querySelectorAll("[data-job-card]"));
  const empty = document.querySelector("[data-job-empty]");

  departmentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const department = button.dataset.departmentFilter || "all";
      departmentButtons.forEach((item) => item.classList.toggle("active", item === button));

      let visibleCount = 0;
      cards.forEach((card) => {
        const matches = department === "all" || card.dataset.department === department;
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (empty) empty.hidden = visibleCount !== 0;
    });
  });
}

document.querySelectorAll("[data-file-input]").forEach((input) => {
  input.addEventListener("change", () => {
    const target = document.querySelector(`[data-file-name="${input.id}"]`);
    if (!target) return;
    target.textContent = input.files.length ? input.files[0].name : "No file selected";
  });
});

document.querySelectorAll("[data-application-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector("button[type='submit']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      status?.classList.add("is-error");
      if (status) {
        status.hidden = false;
        status.textContent = "Please complete all required fields and upload an accepted resume file before submitting.";
      }
      form.reportValidity();
      return;
    }

    status?.classList.remove("is-error");
    if (status) {
      status.hidden = false;
      status.textContent = "Thank you. Your application details are ready for PROTON HR review.";
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Submitted";
      window.setTimeout(() => {
        submit.disabled = false;
        submit.textContent = "Submit Application";
      }, 1800);
    }
  });
});

document.querySelectorAll(".employee-story").forEach((section) => {
  const track = section.querySelector("[data-employee-track]");
  const previous = section.querySelector("[data-employee-prev]");
  const next = section.querySelector("[data-employee-next]");
  if (!track || !previous || !next) return;

  const step = () => {
    const card = track.querySelector(".news-card");
    if (!card) return 320;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "24");
    return card.getBoundingClientRect().width + gap;
  };

  previous.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
});
