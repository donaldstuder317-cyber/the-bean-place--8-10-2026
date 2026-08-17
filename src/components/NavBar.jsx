// ============================================================
// NAVBAR.JSX — Sticky Navigation Bar (Day 4)
// ============================================================
// The NavBar stays at the top of the page as the user scrolls.
// It includes a logo, navigation links, a CTA button, and a
// mobile hamburger menu with animation.
//
// WHAT YOU WILL LEARN:
// - useState for toggling the mobile menu (true/false)
// - useState for tracking scroll position
// - useEffect for adding/removing event listeners
// - Conditional CSS classes based on state
// - Framer Motion's AnimatePresence for enter/exit animations
// - Accessibility: aria-label and aria-expanded attributes
//
// CONCEPTS COVERED:
// - React Hooks: useState, useEffect
// - Side effects and cleanup (return () => ...)
// - Ternary operator for conditional rendering
// - Template literals for dynamic className strings
// - Helper functions (closeMenu)
//
// ============================================================

// STEP 1: Imports
// From "react": import { useState, useEffect }
// From "framer-motion": import { motion, AnimatePresence }
// Import the logo: import logo from "../assets/Beans_logo.png";
// Import the Button UI component from "./ui/Button"

/* --- YOUR IMPORTS GO HERE --- */
import { useState, useEffect } from "react";
// useState -> remembers a value between renders; changing it re-draws the compent
//useEffect -> runs codee AFTER the components appear on the screen
import { motion, AnimatePresence } from "framer-motion";
//Animation tools from Framer Motion:
// motion -> lets us animate normal html tags (e.g. <motion.header, motion.span, motion.div, etc. )
// motion will be underlined with a red squiggly, just ignore it because eslint pertains to JS and doesn't realize that we are using jsx specific items
import logo from "../assets/Beans_logo.png";
import Button from "./ui/Button";

// STEP 2: Create and export the NavBar component
// export default function NavBar() { ... }
//
// STEP 3: State variables (inside the component, before return)
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//
//   DISCUSSION: What does useState(false) mean?
//   - false is the initial value
//   - menuOpen is the current value (true or false)
//   - setMenuOpen is the function to change it
//
// STEP 4: Helper function
//   const closeMenu = () => setMenuOpen(false);
//
// STEP 5: useEffect for scroll detection
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//
//   DISCUSSION: Why do we return a cleanup function?
//   Answer: To remove the event listener when the component unmounts,
//   preventing memory leaks.
//
// STEP 6: Build the JSX (inside return)
//
// Use <motion.header> as the root element:
//   - className: "navbar" + conditionally add "navbar-scrolled" when scrolled is true
//   - Add initial/animate/transition props for entrance animation
//
// Inside the header, create a flex container div:
//   A) BRAND: <a href="#home"> with the logo <img>
//
//   B) DESKTOP NAV: <nav> with className="nav-links hidden items-center gap-10 md:flex"
//      Links: Home (#home), Shop Coffee (#shop), Our Story (#about), Contact (#contact)
//
//   C) DESKTOP CTA: <Button> with "Order Now" text (hidden on mobile: hidden md:inline-flex)
//
//   D) MOBILE HAMBURGER: A <button> visible only on mobile (md:hidden)
//      - Three <span> elements that form the hamburger icon
//      - When menuOpen is true, they transform into an X using CSS transforms
//      - onClick toggles menuOpen
//
// After the flex container, add the MOBILE MENU:
//   Wrap in <AnimatePresence> for smooth enter/exit
//   Conditionally render (menuOpen &&) a <motion.div>
//   Inside: nav links + Button, each calling closeMenu onClick

/* --- YOUR COMPONENT CODE GOES HERE --- */
// The navigation bar is pinned to the top of the page
export default function NavBar() {
    // Is the mobile drop-down menu open? Starts closed (false)
    // menuOpen = the current value; setMenuOpen = the function that changes it

    const [menuOpen, setMenuOpen] = useState(false);

    //Has the user scrolled down at all? Used to add a shadow/backgroud
    // to the bar once it's no longer at the very top of the page
    const [scrolled, setScrolled] = useState(false);

    // A tiny helper so the mobile links can close the manu when tapped
    const closeMenu = () => setMenuOpen(false);

    // Watch the page scroll position
    useEffect(() => {
        // Runs on every scroll; true once we're more than 20px down the page
        const handleScroll = () => setScrolled(window.scrollY > 20);

        // { passive: true } promises we won't block scrolling, which keeps the page smooth.
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup the listener when the component unmounts
        return () => window.removeEventListener("scroll", handleScroll);

        // The empty [] means "set this up once," not on every re-render
    }, []);

    // Everything returned here is what actually shows on the screen (the jsx).
    // NOTE: inside the JSX, comments MUST be written as {/* */}
    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 navbar ${scrolled ? "navbar-scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {/*   Template literal (backticks) build the class string. The ternary adds "navbar-scrolled only once the user has scrolled down" */}

            {/*  mx-auto centers the bar; max-w-7xl caps how wide it gets on big monitors; justify-between pushes the logo, links and button apart
                md: prefixes only  apply on medium screens and up (tablet/desktop) */}
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
                {/* Brand  */}
                {/* href="#home" jumps to the element with id="home" */}
                <a href="#home" className="brand">
                    <img src={logo} alt="Beans Place Logo" className="logo h-12 w-auto md:h-14" />
                </a>

                {/*  Desktop Nav */}
                {/*  "
                      hidden... md:flex" = hidden on phones, shown as a row on desktop */}
                <nav className="nav-links hidden items-center gap-10 md:flex">
                    <a href="#home">Home</a>
                    <a href="#shop">Shop Coffee</a>
                    <a href="#about">Our Story</a>
                    <a href="#contact">Contact</a>
                </nav>

                {/*  Desktop CTA  */}
                <Button variant="accent" size="sm" className="hidden md:inline-flex">
                    Order Now
                </Button>

                {/*  Mobile Hamburger  */}
                {/*  "md:hidden" is the opposite of the above - this button only exists on phones. aria-* attributes tell screen readers what the button does and whether the menu is currently open */}
                <Button
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    // Flip the enu open/closed on each tap
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden">
                    {/*  Three bars that morph into an X when the menu is open */}
                    {/* Top bar: slides down 21 units and rotates 45 degrees */}
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
                    />
                    {/*  Middle bar: simply fades out so the X has only two strokes */}
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
                    />

                    {/* Bottom bar: slidesvup and rotates the other way, crossing the top one  */}
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                    />
                </Button>
            </div>

            {/*  Mobile Menu*/}
            {/* AnimatePresence is what allows the closing animation to play. Without it, the menu would vanish instantly when menuOpen becomes false  */}
            <AnimatePresence>
                {/*  "menuOpen && (...)" renders the menu ONLY when menuOpen is true" */}
                {menuOpen && (
                    <motion.div
                        // overflow-hidden hides the links while the panel is still sliding open, so nothing spills out mid-animation
                        className="overflow-hidden md:hidden"
                        //Animate the panel's height from 0 to its natural size
                        // "exit< is what plays on the way out
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}>
                        {/*  flex-col stacks the mobile links vertically  */}
                        <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">
                            {/*  Every link also calls closeMenu, so tapping one both jumps to the section AND close the panel  */}
                            <a href="#home" onClick={closeMenu} className="text-base font-semibold">
                                Home
                            </a>
                            <a href="#shop" onClick={closeMenu} className="text-base font-semibold">
                                Shop Coffee
                            </a>
                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="text-base font-semibold">
                                Our Story
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="text-base font-semibold">
                                Contact
                            </a>

                            {/*  w-full makes the button stretch the full menu width */}
                            <Button
                                variant="accent"
                                size="sm"
                                onClick={closeMenu}
                                className="w-full">
                                Order Now
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
