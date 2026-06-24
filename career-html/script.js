document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const menu = document.querySelector("[data-nav-menu]");
    if (!menu) return;
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
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

document.querySelectorAll("[data-file-input]").forEach((input) => {
  input.addEventListener("change", () => {
    const target = document.querySelector(`[data-file-name="${input.id}"]`);
    if (!target) return;
    target.textContent = input.files.length ? input.files[0].name : "No file selected";
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
