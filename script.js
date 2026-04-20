document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------
  // Mobile Navigation
  // -----------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // -----------------------------
  // Elements from current page
  // -----------------------------
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  const cafeNameInput = document.getElementById("cafe");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const planInput = document.getElementById("plan");
  const messageInput = document.getElementById("message");

  const preview = document.querySelector(".menu-preview");
  const previewTitle = document.querySelector(".menu-preview-top p");
  const previewSubtitle = document.querySelector(".menu-preview-top span");
  const previewSections = document.querySelectorAll(".menu-preview-section");
  const previewBadge = document.querySelector(".menu-badge");

  const heroButtons = document.querySelector(".hero-buttons");
  const pricingButtons = document.querySelectorAll(".pricing-card .btn");
  const styleCards = document.querySelectorAll(".style-card");

  // -----------------------------
  // Default preview data
  // -----------------------------
  const defaultMenu = {
    cafeName: "RIVER & BEAN",
    subtitle: "Seasonal Café Menu",
    badge: "Print Ready PDF",
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

  let currentStyle = "minimal";

  // -----------------------------
  // Helpers
  // -----------------------------
  function formatPrice(value) {
    const cleaned = String(value).replace("$", "").trim();
    if (cleaned === "") return "";
    const number = Number(cleaned);
    if (Number.isNaN(number)) return "$" + cleaned;
    return "$" + number.toFixed(2);
  }

  function parseItems(inputText) {
    // Example input:
    // Latte-5.50, Cappuccino-4.80, Mocha-6
    if (!inputText || !inputText.trim()) return [];

    return inputText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const parts = item.split("-");
        const name = (parts[0] || "").trim();
        const price = formatPrice(parts[1] || "");
        return { name, price };
      })
      .filter((item) => item.name);
  }

  function applyStyle(styleName) {
    currentStyle = styleName;

    if (!preview) return;

    // Remove any old style classes
    preview.classList.remove("preview-minimal", "preview-artisan", "preview-bold");

    // Add selected style class
    if (styleName === "minimal") {
      preview.classList.add("preview-minimal");
      preview.style.background = "linear-gradient(180deg, #fffdf9 0%, #f8f2ea 100%)";
      preview.style.color = "#1f1a17";
      preview.style.border = "1px solid rgba(90, 63, 44, 0.10)";
    } else if (styleName === "artisan") {
      preview.classList.add("preview-artisan");
      preview.style.background = "linear-gradient(180deg, #f5ede2 0%, #dfc3a8 100%)";
      preview.style.color = "#2e1f16";
      preview.style.border = "1px solid rgba(106, 75, 57, 0.18)";
    } else if (styleName === "bold") {
      preview.classList.add("preview-bold");
      preview.style.background = "linear-gradient(180deg, #2d2824 0%, #5e4735 100%)";
      preview.style.color = "#ffffff";
      preview.style.border = "1px solid rgba(255, 255, 255, 0.08)";
    }

    // Update section titles and badge colors for contrast
    const sectionTitles = document.querySelectorAll(".menu-preview-section h3");
    const menuItems = document.querySelectorAll(".menu-item");
    const menuItemSpans = document.querySelectorAll(".menu-item span");
    const menuItemPrices = document.querySelectorAll(".menu-item strong");

    sectionTitles.forEach((title) => {
      if (styleName === "bold") {
        title.style.color = "#f7d8ba";
      } else if (styleName === "artisan") {
        title.style.color = "#6a4b39";
      } else {
        title.style.color = "#5a3f2c";
      }
    });

    menuItems.forEach((item) => {
      item.style.borderBottom =
        styleName === "bold"
          ? "1px dashed rgba(255,255,255,0.18)"
          : "1px dashed rgba(90, 63, 44, 0.15)";
    });

    menuItemSpans.forEach((item) => {
      item.style.color = styleName === "bold" ? "#f3ece6" : "";
    });

    menuItemPrices.forEach((item) => {
      item.style.color = styleName === "bold" ? "#ffffff" : "";
    });

    if (previewBadge) {
      if (styleName === "bold") {
        previewBadge.style.background = "#f0d2b2";
        previewBadge.style.color = "#2d2824";
      } else if (styleName === "artisan") {
        previewBadge.style.background = "#6a4b39";
        previewBadge.style.color = "#ffffff";
      } else {
        previewBadge.style.background = "#5a3f2c";
        previewBadge.style.color = "#ffffff";
      }
    }

    if (previewTitle) {
      previewTitle.style.color = styleName === "bold" ? "#ffffff" : "";
    }

    if (previewSubtitle) {
      previewSubtitle.style.color = styleName === "bold" ? "#f0d2b2" : "";
    }
  }

  function renderMenu(menuData) {
    if (!preview || !previewTitle || !previewSubtitle) return;

    previewTitle.textContent = (menuData.cafeName || defaultMenu.cafeName).toUpperCase();
    previewSubtitle.textContent = menuData.subtitle || defaultMenu.subtitle;

    if (previewBadge) {
      previewBadge.textContent = menuData.badge || "Print Ready PDF";
    }

    const sections = menuData.sections && menuData.sections.length
      ? menuData.sections
      : defaultMenu.sections;

    // Make sure there are enough section containers
    const previewContainer = preview;
    let currentSectionElements = previewContainer.querySelectorAll(".menu-preview-section");

    // Remove old sections
    currentSectionElements.forEach((section) => section.remove());

    // Rebuild sections
    sections.forEach((sectionData) => {
      const section = document.createElement("div");
      section.className = "menu-preview-section";

      const heading = document.createElement("h3");
      heading.textContent = sectionData.title || "Menu Section";
      section.appendChild(heading);

      const items = sectionData.items && sectionData.items.length
        ? sectionData.items
        : [{ name: "Sample Item", price: "$0.00" }];

      items.forEach((itemData) => {
        const itemRow = document.createElement("div");
        itemRow.className = "menu-item";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = itemData.name || "Item";

        const priceStrong = document.createElement("strong");
        priceStrong.textContent = itemData.price || "$0.00";

        itemRow.appendChild(nameSpan);
        itemRow.appendChild(priceStrong);
        section.appendChild(itemRow);
      });

      // Insert sections before badge if badge exists
      if (previewBadge) {
        previewContainer.insertBefore(section, previewBadge);
      } else {
        previewContainer.appendChild(section);
      }
    });

    applyStyle(currentStyle);
  }

  function resetMenu() {
    renderMenu(defaultMenu);
    applyStyle("minimal");
    highlightSelectedStyle("minimal");

    if (formMessage) {
      formMessage.textContent = "Preview reset to default sample menu.";
    }
  }

  function highlightSelectedStyle(styleName) {
    styleCards.forEach((card) => {
      card.style.outline = "none";
      card.style.transform = "translateY(0)";
      card.style.transition = "0.25s ease";
    });

    const map = {
      minimal: 0,
      artisan: 1,
      bold: 2
    };

    const selectedCard = styleCards[map[styleName]];
    if (selectedCard) {
      selectedCard.style.outline = "3px solid rgba(90, 63, 44, 0.25)";
      selectedCard.style.transform = "translateY(-4px)";
    }
  }

  function startGeneratorFlow() {
    const cafeName = prompt("Enter your café name:", cafeNameInput?.value || "My Café");
    if (cafeName === null) return;

    const subtitle = prompt(
      "Enter a short menu subtitle:",
      "Seasonal Café Menu"
    );
    if (subtitle === null) return;

    const sectionOneTitle = prompt("First menu section name:", "Coffee");
    if (sectionOneTitle === null) return;

    const sectionOneItems = prompt(
      "Enter items for the first section.\nUse this format:\nLatte-5.50, Cappuccino-4.80, Mocha-6.00",
      "Flat White-4.80, Vanilla Latte-5.50, Cold Brew-4.90"
    );
    if (sectionOneItems === null) return;

    const sectionTwoTitle = prompt("Second menu section name:", "Pastries");
    if (sectionTwoTitle === null) return;

    const sectionTwoItems = prompt(
      "Enter items for the second section.\nUse this format:\nCroissant-3.90, Muffin-4.20, Lemon Loaf-4.00",
      "Butter Croissant-3.90, Almond Danish-4.20, Lemon Loaf-4.00"
    );
    if (sectionTwoItems === null) return;

    const styleChoice = prompt(
      "Choose a style: minimal, artisan, or bold",
      currentStyle
    );
    if (styleChoice === null) return;

    const menuData = {
      cafeName: cafeName.trim() || "My Café",
      subtitle: subtitle.trim() || "Seasonal Café Menu",
      badge: "Ready to Print",
      sections: [
        {
          title: sectionOneTitle.trim() || "Coffee",
          items: parseItems(sectionOneItems)
        },
        {
          title: sectionTwoTitle.trim() || "Pastries",
          items: parseItems(sectionTwoItems)
        }
      ]
    };

    renderMenu(menuData);

    const cleanedStyle = styleChoice.trim().toLowerCase();
    if (cleanedStyle === "artisan") {
      applyStyle("artisan");
      highlightSelectedStyle("artisan");
    } else if (cleanedStyle === "bold") {
      applyStyle("bold");
      highlightSelectedStyle("bold");
    } else {
      applyStyle("minimal");
      highlightSelectedStyle("minimal");
    }

    // Fill form automatically too
    if (cafeNameInput) cafeNameInput.value = menuData.cafeName;
    if (messageInput) {
      messageInput.value =
        `Please create a print-ready menu for ${menuData.cafeName}.\n` +
        `Style: ${cleanedStyle}\n` +
        `${menuData.sections[0].title}: ${sectionOneItems}\n` +
        `${menuData.sections[1].title}: ${sectionTwoItems}`;
    }

    if (formMessage) {
      formMessage.textContent =
        "Your live preview has been generated. You can now print or save it as PDF.";
    }

    // Scroll to hero preview nicely
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function printMenu() {
    if (formMessage) {
      formMessage.textContent =
        "Print window opening. On iPad, choose Print and then Save as PDF if available.";
    }
    window.print();
  }

  // -----------------------------
  // Add generator buttons dynamically
  // -----------------------------
  function createGeneratorButtons() {
    if (!heroButtons) return;

    const generateBtn = document.createElement("button");
    generateBtn.textContent = "Generate Demo Menu";
    generateBtn.className = "btn";
    generateBtn.type = "button";

    const printBtn = document.createElement("button");
    printBtn.textContent = "Print / Save PDF";
    printBtn.className = "btn btn-secondary";
    printBtn.type = "button";

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Preview";
    resetBtn.className = "btn btn-secondary";
    resetBtn.type = "button";

    heroButtons.appendChild(generateBtn);
    heroButtons.appendChild(printBtn);
    heroButtons.appendChild(resetBtn);

    generateBtn.addEventListener("click", startGeneratorFlow);
    printBtn.addEventListener("click", printMenu);
    resetBtn.addEventListener("click", resetMenu);
  }

  // -----------------------------
  // Pricing buttons fill plan in form
  // -----------------------------
  pricingButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".pricing-card");
      const planTitle = card ? card.querySelector("h3")?.textContent : "";

      if (planInput && planTitle) {
        planInput.value = planTitle;
      }

      if (formMessage) {
        formMessage.textContent = `${planTitle} plan selected. Fill out the form below or generate a demo menu.`;
      }
    });
  });

  // -----------------------------
  // Style cards clickable
  // -----------------------------
  styleCards.forEach((card, index) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function () {
      if (index === 0) {
        applyStyle("minimal");
        highlightSelectedStyle("minimal");
      } else if (index === 1) {
        applyStyle("artisan");
        highlightSelectedStyle("artisan");
      } else {
        applyStyle("bold");
        highlightSelectedStyle("bold");
      }

      if (formMessage) {
        formMessage.textContent = "Style selected. Now click “Generate Demo Menu” to build your menu preview.";
      }
    });
  });

  // -----------------------------
  // Make contact form useful
  // Instead of only showing a thank-you,
  // it also updates the preview.
  // -----------------------------
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const cafeName = cafeNameInput?.value?.trim() || "My Café";
      const plan = planInput?.value?.trim() || "Starter";
      const ownerName = nameInput?.value?.trim() || "Owner";
      const notes = messageInput?.value?.trim() || "";

      const generatedMenu = {
        cafeName: cafeName,
        subtitle: plan + " Menu Draft",
        badge: "Draft Ready",
        sections: [
          {
            title: "Signature Drinks",
            items: [
              { name: "House Latte", price: "$5.20" },
              { name: "Caramel Cappuccino", price: "$5.60" },
              { name: "Iced Mocha", price: "$5.90" }
            ]
          },
          {
            title: "Bakery",
            items: [
              { name: "Butter Croissant", price: "$3.90" },
              { name: "Blueberry Muffin", price: "$4.10" },
              { name: "Banana Bread", price: "$4.30" }
            ]
          }
        ]
      };

      renderMenu(generatedMenu);

      if (formMessage) {
        formMessage.textContent =
          `Thanks ${ownerName}. Your sample menu preview has been updated for ${cafeName}. Use “Print / Save PDF” to export it.`;
      }

      console.log("Form details:", {
        ownerName,
        email: emailInput?.value,
        cafeName,
        plan,
        notes
      });
    });
  }

  // -----------------------------
  // Add print styles dynamically
  // -----------------------------
  function injectPrintStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }

        .menu-preview,
        .menu-preview * {
          visibility: visible;
        }

        .menu-preview {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          max-width: 100%;
          border-radius: 0;
          box-shadow: none;
          padding: 30px;
          margin: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // -----------------------------
  // Init
  // -----------------------------
  createGeneratorButtons();
  injectPrintStyles();
  renderMenu(defaultMenu);
  applyStyle("minimal");
  highlightSelectedStyle("minimal");
});