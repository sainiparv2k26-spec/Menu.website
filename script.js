document.addEventListener("DOMContentLoaded", function () {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  const heroPreview = $("#heroMenuPreview");
  const editorPreview = $("#editorMenuPreview");
  const sectionsEditor = $("#sectionsEditor");
  const editorMessage = $("#editorMessage");
  const canvasMeta = $("#canvasMeta");

  const editorCafeName = $("#editorCafeName");
  const editorSubtitle = $("#editorSubtitle");
  const editorBadge = $("#editorBadge");
  const editorAccent = $("#editorAccent");
  const editorPaper = $("#editorPaper");
  const editorFontScale = $("#editorFontScale");
  const editorSpacing = $("#editorSpacing");
  const editorWidth = $("#editorWidth");
  const themeButtons = $$(".theme-btn");

  const addSectionBtn = $("#addSectionBtn");
  const loadDemoBtn = $("#loadDemoBtn");
  const printBtn = $("#printBtn");
  const resetBtn = $("#resetBtn");
  const fillContactBtn = $("#fillContactBtn");
  const duplicateSampleBtn = $("#duplicateSampleBtn");

  const contactForm = $("#contactForm");
  const formMessage = $("#formMessage");
  const nameInput = $("#name");
  const cafeInput = $("#cafe");
  const emailInput = $("#email");
  const planInput = $("#plan");
  const messageInput = $("#message");

  const pricingButtons = $$(".pricing-select");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    $$(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });
    });
  }

  const themes = {
    minimal: {
      background: "linear-gradient(180deg, #fffdf9 0%, #f8f2ea 100%)",
      text: "#1f1a17",
      subtext: "#8a674c",
      heading: "#5a3f2c",
      divider: "rgba(90, 63, 44, 0.15)",
      border: "rgba(90, 63, 44, 0.10)",
      badgeBg: "#5a3f2c",
      badgeText: "#ffffff"
    },
    artisan: {
      background: "linear-gradient(180deg, #f5ede2 0%, #dfc3a8 100%)",
      text: "#2e1f16",
      subtext: "#6a4b39",
      heading: "#6a4b39",
      divider: "rgba(106, 75, 57, 0.20)",
      border: "rgba(106, 75, 57, 0.18)",
      badgeBg: "#6a4b39",
      badgeText: "#ffffff"
    },
    bold: {
      background: "linear-gradient(180deg, #2d2824 0%, #5e4735 100%)",
      text: "#ffffff",
      subtext: "#f0d2b2",
      heading: "#f7d8ba",
      divider: "rgba(255,255,255,0.18)",
      border: "rgba(255,255,255,0.08)",
      badgeBg: "#f0d2b2",
      badgeText: "#2d2824"
    },
    editorial: {
      background: "linear-gradient(180deg, #faf8f5 0%, #efe8df 100%)",
      text: "#171513",
      subtext: "#7a6757",
      heading: "#171513",
      divider: "rgba(23, 21, 19, 0.12)",
      border: "rgba(23, 21, 19, 0.10)",
      badgeBg: "#171513",
      badgeText: "#ffffff"
    }
  };

  const defaultState = {
    cafeName: "RIVER & BEAN",
    subtitle: "Seasonal Café Menu",
    badge: "Print Ready PDF",
    theme: "minimal",
    accent: "#5a3f2c",
    fontScale: 1,
    spacing: 1,
    width: 420,
    paper: "a4",
    sections: [
      {
        title: "Coffee",
        items: [
          { name: "Flat White", price: "$4.80" },
          { name: "Vanilla Latte", price: "$5.50" },
          { name: "Cold Brew", price: "$4.90" }
        ]
      },
      {
        title: "Pastries",
        items: [
          { name: "Butter Croissant", price: "$3.90" },
          { name: "Almond Danish", price: "$4.20" },
          { name: "Lemon Loaf", price: "$4.00" }
        ]
      }
    ]
  };

  let state = JSON.parse(JSON.stringify(defaultState));

  function setMessage(text) {
    if (editorMessage) {
      editorMessage.textContent = text;
    }
  }

  function formatMoney(value) {
    const raw = String(value).trim();
    if (!raw) return "";
    if (raw.startsWith("$")) return raw;

    const number = Number(raw);
    if (!Number.isNaN(number)) {
      return `$${number.toFixed(2)}`;
    }

    return `$${raw}`;
  }

  function getPaperMeta() {
    if (state.paper === "letter") return "Letter";
    if (state.paper === "square") return "Square";
    return "A4";
  }

  function cloneState() {
    return JSON.parse(JSON.stringify(state));
  }

  function renderPreview(targetPreview) {
    if (!targetPreview) return;

    const theme = themes[state.theme] || themes.minimal;

    let top = $(".menu-preview-top", targetPreview);
    if (!top) {
      top = document.createElement("div");
      top.className = "menu-preview-top";
      targetPreview.prepend(top);
    }

    let title = $("p", top);
    let subtitle = $("span", top);

    if (!title) {
      title = document.createElement("p");
      top.appendChild(title);
    }

    if (!subtitle) {
      subtitle = document.createElement("span");
      top.appendChild(subtitle);
    }

    title.textContent = state.cafeName.toUpperCase();
    subtitle.textContent = state.subtitle;

    $$(".menu-preview-section", targetPreview).forEach((section) => section.remove());

    let badge = $(".menu-badge", targetPreview);
    if (!badge) {
      badge = document.createElement("div");
      badge.className = "menu-badge";
      targetPreview.appendChild(badge);
    }

    state.sections.forEach((sectionData) => {
      const section = document.createElement("div");
      section.className = "menu-preview-section";

      const heading = document.createElement("h3");
      heading.textContent = sectionData.title || "Section";
      section.appendChild(heading);

      sectionData.items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "menu-item";

        const name = document.createElement("span");
        name.textContent = item.name || "Item";

        const price = document.createElement("strong");
        price.textContent = formatMoney(item.price || "");

        row.appendChild(name);
        row.appendChild(price);
        section.appendChild(row);
      });

      targetPreview.insertBefore(section, badge);
    });

    badge.textContent = state.badge;

    targetPreview.style.width = `min(100%, ${state.width}px)`;
    targetPreview.style.background = theme.background;
    targetPreview.style.color = theme.text;
    targetPreview.style.border = `1px solid ${theme.border}`;
    targetPreview.style.padding = `${28 * state.spacing}px`;
    targetPreview.style.fontSize = `${state.fontScale}rem`;

    title.style.color = theme.text;
    subtitle.style.color = theme.subtext;

    $$(".menu-preview-section", targetPreview).forEach((section) => {
      section.style.marginTop = `${26 * state.spacing}px`;

      const heading = $("h3", section);
      if (heading) {
        heading.style.color = state.theme === "minimal" ? state.accent : theme.heading;
      }

      $$(".menu-item", section).forEach((itemRow) => {
        itemRow.style.borderBottom = `1px dashed ${theme.divider}`;
        const itemName = $("span", itemRow);
        const itemPrice = $("strong", itemRow);
        if (itemName) itemName.style.color = theme.text;
        if (itemPrice) itemPrice.style.color = theme.text;
      });
    });

    badge.style.background = state.theme === "minimal" ? state.accent : theme.badgeBg;
    badge.style.color = theme.badgeText;

    if (canvasMeta && targetPreview === editorPreview) {
      canvasMeta.textContent = `${getPaperMeta()} · ${state.theme.charAt(0).toUpperCase() + state.theme.slice(1)}`;
    }
  }

  function renderAllPreviews() {
    renderPreview(heroPreview);
    renderPreview(editorPreview);
    updateThemeButtons();
  }

  function updateThemeButtons() {
    themeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === state.theme);
    });
  }

  function syncControls() {
    if (editorCafeName) editorCafeName.value = state.cafeName;
    if (editorSubtitle) editorSubtitle.value = state.subtitle;
    if (editorBadge) editorBadge.value = state.badge;
    if (editorAccent) editorAccent.value = state.accent;
    if (editorPaper) editorPaper.value = state.paper;
    if (editorFontScale) editorFontScale.value = String(state.fontScale);
    if (editorSpacing) editorSpacing.value = String(state.spacing);
    if (editorWidth) editorWidth.value = String(state.width);
  }

  function buildSectionsEditor() {
    if (!sectionsEditor) return;

    sectionsEditor.innerHTML = "";

    state.sections.forEach((section, sectionIndex) => {
      const card = document.createElement("div");
      card.className = "section-card";

      const header = document.createElement("div");
      header.className = "section-card-header";

      const title = document.createElement("strong");
      title.textContent = `Section ${sectionIndex + 1}`;

      const removeSectionBtn = document.createElement("button");
      removeSectionBtn.type = "button";
      removeSectionBtn.className = "small-btn";
      removeSectionBtn.textContent = "Delete";
      removeSectionBtn.addEventListener("click", function () {
        if (state.sections.length === 1) {
          state.sections = [
            {
              title: "Menu",
              items: [{ name: "Sample Item", price: "$0.00" }]
            }
          ];
        } else {
          state.sections.splice(sectionIndex, 1);
        }

        buildSectionsEditor();
        renderAllPreviews();
        setMessage("Section removed.");
      });

      header.appendChild(title);
      header.appendChild(removeSectionBtn);
      card.appendChild(header);

      const sectionTitleGroup = document.createElement("div");
      sectionTitleGroup.className = "form-group";

      const sectionLabel = document.createElement("label");
      sectionLabel.textContent = "Section title";

      const sectionInput = document.createElement("input");
      sectionInput.type = "text";
      sectionInput.value = section.title;
      sectionInput.addEventListener("input", function () {
        state.sections[sectionIndex].title = this.value;
        renderAllPreviews();
      });

      sectionTitleGroup.appendChild(sectionLabel);
      sectionTitleGroup.appendChild(sectionInput);
      card.appendChild(sectionTitleGroup);

      section.items.forEach((item, itemIndex) => {
        const row = document.createElement("div");
        row.className = "item-row";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = item.name;
        nameInput.placeholder = "Item name";
        nameInput.addEventListener("input", function () {
          state.sections[sectionIndex].items[itemIndex].name = this.value;
          renderAllPreviews();
        });

        const priceInput = document.createElement("input");
        priceInput.type = "text";
        priceInput.value = item.price;
        priceInput.placeholder = "$0.00";
        priceInput.addEventListener("input", function () {
          state.sections[sectionIndex].items[itemIndex].price = this.value;
          renderAllPreviews();
        });

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", function () {
          state.sections[sectionIndex].items.splice(itemIndex, 1);

          if (state.sections[sectionIndex].items.length === 0) {
            state.sections[sectionIndex].items.push({
              name: "New Item",
              price: "$0.00"
            });
          }

          buildSectionsEditor();
          renderAllPreviews();
          setMessage("Item removed.");
        });

        row.appendChild(nameInput);
        row.appendChild(priceInput);
        row.appendChild(removeBtn);
        card.appendChild(row);
      });

      const actions = document.createElement("div");
      actions.className = "section-actions";

      const addItemBtn = document.createElement("button");
      addItemBtn.type = "button";
      addItemBtn.textContent = "+ Add item";
      addItemBtn.addEventListener("click", function () {
        state.sections[sectionIndex].items.push({
          name: "New Item",
          price: "$0.00"
        });
        buildSectionsEditor();
        renderAllPreviews();
        setMessage("New item added.");
      });

      const duplicateSectionBtn = document.createElement("button");
      duplicateSectionBtn.type = "button";
      duplicateSectionBtn.textContent = "Duplicate section";
      duplicateSectionBtn.addEventListener("click", function () {
        const newSection = JSON.parse(JSON.stringify(state.sections[sectionIndex]));
        state.sections.splice(sectionIndex + 1, 0, newSection);
        buildSectionsEditor();
        renderAllPreviews();
        setMessage("Section duplicated.");
      });

      actions.appendChild(addItemBtn);
      actions.appendChild(duplicateSectionBtn);
      card.appendChild(actions);

      sectionsEditor.appendChild(card);
    });
  }

  function loadPremiumDemo() {
    state = {
      cafeName: "STONE & STEAM",
      subtitle: "Signature Drinks & Bakery",
      badge: "Ready for Print",
      theme: "editorial",
      accent: "#1f1a17",
      fontScale: 1.04,
      spacing: 1.03,
      width: 430,
      paper: "a4",
      sections: [
        {
          title: "Espresso Bar",
          items: [
            { name: "Cortado", price: "$4.60" },
            { name: "Vanilla Oat Latte", price: "$5.90" },
            { name: "Cold Brew", price: "$4.90" }
          ]
        },
        {
          title: "Bakery",
          items: [
            { name: "Butter Croissant", price: "$3.80" },
            { name: "Cardamom Bun", price: "$4.50" },
            { name: "Lemon Loaf", price: "$4.20" }
          ]
        },
        {
          title: "Seasonal",
          items: [
            { name: "Rose Pistachio Latte", price: "$6.20" },
            { name: "Orange Mocha", price: "$6.40" }
          ]
        }
      ]
    };

    syncControls();
    buildSectionsEditor();
    renderAllPreviews();
    setMessage("Premium demo loaded.");
  }

  if (editorCafeName) {
    editorCafeName.addEventListener("input", function () {
      state.cafeName = this.value || "My Café";
      renderAllPreviews();
    });
  }

  if (editorSubtitle) {
    editorSubtitle.addEventListener("input", function () {
      state.subtitle = this.value || "Seasonal Café Menu";
      renderAllPreviews();
    });
  }

  if (editorBadge) {
    editorBadge.addEventListener("input", function () {
      state.badge = this.value || "Print Ready PDF";
      renderAllPreviews();
    });
  }

  if (editorAccent) {
    editorAccent.addEventListener("input", function () {
      state.accent = this.value;
      renderAllPreviews();
    });
  }

  if (editorPaper) {
    editorPaper.addEventListener("change", function () {
      state.paper = this.value;

      if (this.value === "letter") state.width = 440;
      if (this.value === "a4") state.width = 420;
      if (this.value === "square") state.width = 390;

      syncControls();
      renderAllPreviews();
      setMessage("Paper size updated.");
    });
  }

  if (editorFontScale) {
    editorFontScale.addEventListener("input", function () {
      state.fontScale = Number(this.value);
      renderAllPreviews();
    });
  }

  if (editorSpacing) {
    editorSpacing.addEventListener("input", function () {
      state.spacing = Number(this.value);
      renderAllPreviews();
    });
  }

  if (editorWidth) {
    editorWidth.addEventListener("input", function () {
      state.width = Number(this.value);
      renderAllPreviews();
    });
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      state.theme = this.dataset.theme;
      renderAllPreviews();
      updateThemeButtons();
      setMessage(`Theme changed to ${state.theme}.`);
    });
  });

  if (addSectionBtn) {
    addSectionBtn.addEventListener("click", function () {
      state.sections.push({
        title: "New Section",
        items: [
          { name: "New Item", price: "$0.00" }
        ]
      });
      buildSectionsEditor();
      renderAllPreviews();
      setMessage("New section added.");
    });
  }

  if (loadDemoBtn) {
    loadDemoBtn.addEventListener("click", function () {
      loadPremiumDemo();
    });
  }

  if (duplicateSampleBtn) {
    duplicateSampleBtn.addEventListener("click", function () {
      if (!state.sections.length) return;

      state.sections.forEach((section) => {
        const copiedItems = section.items.map((item) => ({
          name: `${item.name} Special`,
          price: item.price
        }));
        section.items = section.items.concat(copiedItems);
      });

      buildSectionsEditor();
      renderAllPreviews();
      setMessage("Sample items duplicated.");
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", function () {
      setMessage("Opening print view. Use Save as PDF from your browser print options.");
      window.print();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      state = JSON.parse(JSON.stringify(defaultState));
      syncControls();
      buildSectionsEditor();
      renderAllPreviews();
      setMessage("Sample menu restored.");
    });
  }

  if (fillContactBtn) {
    fillContactBtn.addEventListener("click", function () {
      if (cafeInput) cafeInput.value = state.cafeName;
      if (planInput) planInput.value = "Signature";

      if (messageInput) {
        const summary = state.sections
          .map((section) => {
            const items = section.items.map((item) => `${item.name} ${item.price}`).join(", ");
            return `${section.title}: ${items}`;
          })
          .join("\n");

        messageInput.value =
          `Please create a print-ready menu for ${state.cafeName}.\n` +
          `Theme: ${state.theme}\n` +
          `Subtitle: ${state.subtitle}\n` +
          `${summary}`;
      }

      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      setMessage("Contact form filled from the editor.");
    });
  }

  pricingButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".pricing-card");
      const title = $("h3", card);
      const plan = title ? title.textContent.trim() : "Signature";

      if (planInput) planInput.value = plan;

      if (plan === "Starter") state.theme = "minimal";
      if (plan === "Signature") state.theme = "artisan";
      if (plan === "Seasonal") state.theme = "editorial";

      renderAllPreviews();
      updateThemeButtons();
      setMessage(`${plan} plan selected.`);
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const ownerName = nameInput ? nameInput.value.trim() : "Owner";
      const cafeName = cafeInput ? cafeInput.value.trim() : state.cafeName;
      const plan = planInput ? planInput.value.trim() : "Signature";

      if (cafeName) {
        state.cafeName = cafeName;
        if (editorCafeName) editorCafeName.value = cafeName;
      }

      if (plan === "Starter") state.theme = "minimal";
      if (plan === "Signature") state.theme = "artisan";
      if (plan === "Seasonal") state.theme = "editorial";

      renderAllPreviews();
      updateThemeButtons();

      if (formMessage) {
        formMessage.textContent =
          `Thanks ${ownerName}. Your menu preview has been updated for ${state.cafeName}.`;
      }

      console.log("Contact form submitted:", {
        ownerName,
        email: emailInput ? emailInput.value.trim() : "",
        cafeName,
        plan,
        message: messageInput ? messageInput.value.trim() : ""
      });
    });
  }

  syncControls();
  buildSectionsEditor();
  renderAllPreviews();
});