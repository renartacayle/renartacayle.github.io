# 💻 Renarta's Interactive CRT Terminal Portfolio

[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?logo=githubpages&logoColor=white)](https://renartacayle.github.io)
![Custom Domain](https://img.shields.io/badge/Custom_Domain-riuph.me-89B4FA?logo=cloudflare&logoColor=white)
![Vanilla HTML5/CSS3/ES6](https://img.shields.io/badge/Stack-Vanilla_Web_Audio_API-E34F26?logo=html5&logoColor=white)
![Theme: Catppuccin Mocha](https://img.shields.io/badge/Theme-Catppuccin%20Mocha-CBA6F7)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An interactive, responsive, and retro-themed CRT command-line portfolio website for **Renarta** (`renartacayle`), deployed live at **[https://riuph.me](https://riuph.me)** (and **[https://renartacayle.github.io](https://renartacayle.github.io)**).

---

## 🎯 What is this for?

Most developer portfolios are static, generic templates with standard cards and purple gradients. This project approaches developer presentation from a systems and hacker perspective:

1. **Interactive Experience**: Visitors navigate your bio, skills, and projects by typing real terminal commands (`help`, `about`, `skills`, `projects`, `dotfiles`, `neofetch`).
2. **Synthesized Mechanical Keyboard Audio**: Features authentic Cherry MX switch click feedback generated on-the-fly using the browser's native **Web Audio API** (zero heavy audio files or external CDNs).
3. **Retro CRT Scanlines & Shaders**: Optional scanline overlays, flickering scan lines, and ambient vignette for an authentic 80s/90s CRT workstation look.
4. **Dynamic Theme Switcher**: Toggle effortlessly between **Catppuccin Mocha**, **Tokyo Night**, **Cyberpunk Matrix**, and **Amber CRT**.
5. **Mobile Friendly**: Includes interactive quick-tap command buttons at the bottom so mobile visitors can navigate smoothly without typing on a virtual keyboard.

---

## ⌨️ Available Terminal Commands

| Command | Description |
| :--- | :--- |
| `help` | Display list of available commands |
| `about` | Personal background, location, and engineering philosophy |
| `skills` | Technical competencies (Languages, Systems, Tooling) |
| `projects` | Interactive showcase of open-source repositories |
| `dotfiles` | Deep-dive into the modular Linux workstation configuration |
| `neofetch` | System and developer environment specification card |
| `theme [name]` | Cycle or switch themes (`catppuccin`, `matrix`, `tokyo`, `amber`) |
| `sound` | Toggle mechanical keyboard click sound effects |
| `crt` | Toggle retro CRT scanline & glow overlay |
| `contact` | Social profiles, GitHub, and email contact |
| `clear` | Clear the terminal screen buffer |

---

## 🚀 Local Preview

Because this project is built with lightweight, zero-dependency vanilla web standards, you can preview it immediately using any local HTTP server:

```bash
# Using Python
python3 -m http.server 8080

# Then open in browser:
# http://localhost:8080
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
