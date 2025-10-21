# Product Requirement Document: "The Evermore" Wedding Website (MVP)

|                       |                  |
| --------------------- | ---------------- |
| **Document Version:** | 0.9 (MVP)        |
| **Date:**             | October 21, 2025 |
| **Status:**           | Draft            |
| **Owner:**            | Product Manager  |

## 1. Introduction

### 1.1 Problem Statement

Couples need a simple, beautiful, and efficient way to share wedding details and collect RSVPs. Current solutions are often too complex, expensive, or lack essential customization and tracking features.

### 1.2 Product Vision (MVP)

To deliver the fastest, simplest way for a couple to create a beautiful, single-page wedding website with RSVP management.

### 1.3 MVP Philosophy

This document is strictly scoped for an MVP. We will achieve this by focusing on two core interfaces:

1.  **The Admin Page:** A single, private, all-in-one dashboard where the couple logs in to build their site, customize its content, and view their RSVP list.
2.  **The Guest Home Page:** A single, public, mobile-first, scrollable web page that displays all the information and includes the RSVP form.

All features not essential to this two-page structure (e.g., multi-template selection, multi-event dashboards, subscription tiers) are out of scope for this version.

## 2. User Personas

### 2.1 The Couple (Admin-Page User)

- **Needs:** To log in to one place, fill in their event details, upload photos, and see who has RSVP'd.
- **Pain Point:** "I don't want to learn a complex builder or manage multiple pages. Just give me one place to do everything."

### 2.2 The Guest (Home-Page User)

- **Needs:** To open a link (likely on mobile) and immediately see all key info (where, when) and be able to RSVP in under 60 seconds.
- **Pain Point:** "I don't want to click through multiple tabs to find the address or the RSVP button."

## 3. Functional Requirements

### Epic 1: The Admin Page (The "Builder")

This is the single, secure, all-in-one page the couple logs into. This interface will contain two main views, accessible by tabs: **"Builder"** and **"RSVP List"**.

#### 1.A: "Builder" View (Content & Customization)

| ID   | Requirement               | User Story                                                                                                                                 | Priority    |
| :--- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| 1.1  | **Simple Login**          | As a Couple, I want to log in with an email and password to access my Admin Page.                                                          | Must-Have   |
| 1.2  | **Global Style Editor**   | As a Couple, I want to set a global color palette (e.g., 2-3 colors) and 2 fonts (heading, body) that apply to my entire site.             | Must-Have   |
| 1.3  | **Section-Based Editor**  | The Admin Page builder shall consist of a series of forms, each corresponding to a section on the Guest Home Page.                         | Must-Have   |
| 1.4  | **Hero Section**          | As a Couple, I want a form to input our names, the wedding date, and upload one main background photo.                                     | Must-Have   |
| 1.5  | **Event Details Section** | As a Couple, I want a form to add one or more event blocks (e.g., "Ceremony," "Reception") with a title, date, time, and location address. | Must-Have   |
| 1.6  | **Google Maps Embed**     | When I enter an address for an event, the system shall automatically generate a Google Map link/embed for the Guest Home Page.             | Must-Have   |
| 1.7  | **Our Story Section**     | As a Couple, I want a text box to write our story and upload one or two accompanying photos.                                               | Must-Have   |
| 1.8  | **Photo Gallery Section** | As a Couple, I want a simple uploader to add up to 10 photos to a gallery.                                                                 | Should-Have |
| 1.9  | **Gift Registry Section** | As a Couple, I want a text box where I can add links to my registries or provide bank transfer details.                                    | Must-Have   |
| 1.10 | **Section Toggling**      | As a Couple, I want to use simple on/off toggles to hide any section I don't need (e.g., "Hide Photo Gallery").                            | Must-Have   |
| 1.11 | **Publishing & URL**      | As a Couple, I want a "Publish" button. When published, I get a unique, shareable URL (e.g., `theevermore.com/jane-and-john`).             | Must-Have   |
| 1.12 | **Password Protection**   | As a Couple, I want an _optional_ text field to set a simple password for my Guest Home Page.                                              | Must-Have   |

#### 1.B: "RSVP List" View (Guest Management)

| ID   | Requirement        | User Story                                                                                                         | Priority  |
| :--- | :----------------- | :----------------------------------------------------------------------------------------------------------------- | :-------- |
| 1.13 | **RSVP Dashboard** | As a Couple, I want to click the "RSVP List" tab to see all submissions from my Guest Home Page in a simple table. | Must-Have |
| 1.14 | **RSVP Analytics** | At the top of the RSVP list, I want to see a quick summary: "Total Attending," "Total Declined."                   | Must-Have |
| 1.15 | **Export to CSV**  | As a Couple, I want a single button to export my full RSVP list to a CSV file.                                     | Must-Have |

---

### Epic 2: The Guest Home Page (The Published Website)

This is the single, public, scrollable page that guests view. Its content is 100% controlled by the Admin Page.

| ID  | Requirement             | User Story                                                                                                                                      | Priority  |
| :-- | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| 2.1 | **Password Prompt**     | As a **Guest**, if a site is password-protected, the first thing I see is a prompt to enter the password.                                       | Must-Have |
| 2.2 | **Single-Page Layout**  | As a **Guest**, I want to scroll down a single page to see all wedding information. There shall be no navigation tabs.                          | Must-Have |
| 2.3 | **Rendered Sections**   | The Guest Home Page must render all content (Hero, Events, Story, Gallery, etc.) that the couple "toggled on" and filled out in the Admin Page. | Must-Have |
| 2.4 | **RSVP Form**           | As a **Guest**, I want a simple form on the page to submit my full name, attendance status (Yes/No), and dietary restrictions.                  | Must-Have |
| 2.5 | **RSVP Submission**     | When I submit the RSVP, the data must be sent and stored, becoming visible in the couple's "RSVP List" view on the Admin Page.                  | Must-Have |
| 2.6 | **RSVP Confirmation**   | As a **Guest**, I want to see a clear "Thank You!" message after I submit my RSVP.                                                              | Must-Have |
| 2.7 | **Mobile-First Design** | As a **Guest** (on my phone), the website must be perfectly formatted, with readable text and properly scaled images.                           | Must-Have |

## 4. Non-Functional Requirements (NFRs)

| Category           | Requirement                                                                                                                   |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Responsiveness** | **(Critical)** The **Guest Home Page** must be mobile-first. The **Admin Page** must be desktop-first but usable on a tablet. |
| **Performance**    | The Guest Home Page must load in under 3 seconds. All images uploaded by the couple must be automatically compressed.         |
| **Security**       | The Admin Page must be accessible only via login. All sites must be served over HTTPS.                                        |
| **Simplicity**     | A couple must be able to go from login to a published site in under 30 minutes (assuming they have photos/text ready).        |

## 5. Out of Scope (Post-MVP)

- **Multi-Template System:** The MVP will use a _single, high-quality template_ that is customized via the Global Style Editor (colors, fonts) and section toggling.
- **Multi-Event Dashboard:** The MVP is one-to-one: one login, one wedding site.
- **Guestbook / Public Comments:** No public-facing guest interaction other than the RSVP form.
- **Manual RSVP Entry:** The couple cannot manually add guests via the dashboard in this version (they can use the CSV export).
- **Full Account Management:** No "Change Email" or "Change Password" features. Password reset is the only exception.
- **Subscription & Billing:** This MVP will be offered as a single (e.g., free or one-time-fee) tier.
