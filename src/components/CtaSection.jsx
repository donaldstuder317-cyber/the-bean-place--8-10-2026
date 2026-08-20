// ============================================================
// CTASECTION.JSX — Call-to-Action Section (Day 10)
// ============================================================
// A compelling section that encourages visitors to place an
// order. Includes a headline, perks grid with icons, action
// buttons, and animated statistics counters.
//
// WHAT YOU WILL LEARN:
// - Defining data arrays for UI elements (perks)
// - Rendering icon + label pairs from an array
// - Using the AnimatedCounter component
// - Combining multiple UI components (Badge, Button, Separator)
// - StaggerContainer for sequenced entrance animations
//
// CONCEPTS COVERED:
// - Array of objects with emoji icons
// - .map() for rendering repeated UI patterns
// - Component composition (nesting components)
// - ScrollReveal animation wrapper
//
// ============================================================

// STEP 1: Imports
// Import UI components: Button, Badge, Separator,
//   ScrollReveal (+ StaggerContainer, StaggerItem),
//   AnimatedCounter

/* --- YOUR IMPORTS GO HERE --- */
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Separator from "./ui/Separator";
// ScrollReveal: Animates on scroll. Stagger*: animates a group one after another
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import AnimatedCounter from "./ui/AnimatedCounter";

// STEP 2: Define the perks array (outside the component)
// const perks = [
//   { icon: "leaf emoji", label: "Ethically Sourced" },
//   { icon: "fire emoji", label: "Freshly Roasted" },
//   { icon: "truck emoji", label: "Free Shipping $50+" },
//   { icon: "recycle emoji", label: "Eco-Friendly Bags" }
// ];

/* --- YOUR PERKS DATA GOES HERE --- */

// STEP 3: Create and export CtaSection
// export default function CtaSection() { ... }
//
// JSX Structure:
//   <div className="cta-section">
//
//     Header:
//       - Badge: "Fresh Roasts Daily"
//       - <h2>: "Brewed With Passion," / "Delivered Fresh"
//       - Separator
//       - Subtitle paragraph
//
//     Perks grid:
//       <StaggerContainer className="cta-perks">
//         {perks.map((perk) => (
//           <StaggerItem key={perk.label} className="cta-perk-item">
//             <span className="cta-perk-icon">{perk.icon}</span>
//             <span className="cta-perk-label">{perk.label}</span>
//           </StaggerItem>
//         ))}
//       </StaggerContainer>
//
//     Buttons:
//       - "Order Now" (accent) + "View Full Menu" (ghost)
//
//     Stats bar (3 animated counters):
//       <div className="cta-stats">
//         <div className="cta-stat">
//           <AnimatedCounter target={15} suffix="+" />
//           <span>Origins</span>
//         </div>
//         (divider)
//         <div className="cta-stat">
//           <AnimatedCounter target={2400} suffix="+" />
//           <span>Happy Customers</span>
//         </div>
//         (divider)
//         <div className="cta-stat">
//           <AnimatedCounter target={48} suffix="hr" />
//           <span>Fresh Delivery</span>
//         </div>
//       </div>
//   </div>

/* --- YOUR COMPONENT CODE GOES HERE --- */
const perks = [
    { icon: "🌱", label: "Ethically Sourced" },
    { icon: "🔥", label: "Freshly Roasted" },
    { icon: "🚚", label: "Free Shipping $50+" },
    { icon: "♻️", label: "Eco-Friendly Bags" }
];

export default function CtaSection() {
    return (
        <div className="cta=section">
            <ScrollReveal animation="fadeUp" delay={0}>
                <Badge variant="accent" className="mb-6">
                    Fresh Roasts Daily
                </Badge>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.1}>
                <h2>
                    Brewed with Passion,
                    <br />
                    Delivered Fresh
                </h2>
            </ScrollReveal>

            {/* Decorative Divider: mx-auto centers it, max-w-48 caps its width */}
            <ScrollReveal animation="fadeIn" delay={0.2}>
                <Separator className="mx-auto mb-5 max-w-48" />
            </ScrollReveal>
        </div>
    );
}
