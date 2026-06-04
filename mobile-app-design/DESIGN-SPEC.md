# 404 Jobs — Mobile App Design Spec (React Native)

A build reference for the mobile version of the **404 Jobs** portal, derived directly from the existing web codebase (Next.js + Tailwind v4 + shadcn/ui). Pair this with [`prototype.html`](./prototype.html) — open it in a browser to see every screen, or print it to PDF.

---

## 1. Design tokens

Mirrored from `src/app/globals.css` and the violet brand used across the web app. Drop these into a `theme.ts`.

```ts
// theme.ts
export const colors = {
  // Brand
  primary:        '#7c3aed', // violet-600  — buttons, active states, brand mark
  primaryDark:    '#6d28d9', // violet-700  — pressed
  primarySoft:    '#ede9fe', // violet-100  — soft fills, icon chips
  primarySoftBg:  '#f5f3ff', // violet-50   — badge / tag backgrounds
  primaryBorder:  '#ddd6fe', // violet-200  — outlined buttons, badge borders
  primaryMuted:   '#a78bfa', // violet-400  — meta icons
  indigo:         '#4f46e5', // indigo-600  — gradient end, secondary avatars

  // Neutrals
  foreground:     '#171717',
  muted:          '#737373',
  border:         '#f1f1f1', // card borders (border-gray-100)
  border2:        '#e5e5e5', // inputs / dividers
  surface:        '#ffffff',
  page:           '#f4f4f6', // app background behind cards
  inputBg:        '#f5f5f5',

  // Status (badges / pills) — { bg, text, border }
  pending:    { bg:'#fffbeb', text:'#b45309', border:'#fde68a' }, // amber
  viewed:     { bg:'#eff6ff', text:'#1d4ed8', border:'#bfdbfe' }, // blue
  shortlisted:{ bg:'#f0fdf4', text:'#15803d', border:'#bbf7d0' }, // green
  accepted:   { bg:'#ecfdf5', text:'#047857', border:'#a7f3d0' }, // emerald
  rejected:   { bg:'#fff1f2', text:'#be123c', border:'#fecdd3' }, // rose
  withdrawn:  { bg:'#f5f5f5', text:'#525252', border:'#e5e5e5' }, // gray
};

export const radius = { sm: 8, md: 10, lg: 14, pill: 999 };

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const shadow = {
  card:    { shadowColor:'#000', shadowOpacity:0.05, shadowRadius:2,  shadowOffset:{width:0,height:1}, elevation:1 },
  cardHover:{ shadowColor:'#7c3aed', shadowOpacity:0.10, shadowRadius:14, shadowOffset:{width:0,height:4}, elevation:4 },
};

export const typography = {
  // System font (Geist on web). Use Inter or the platform default in RN.
  h1:    { fontSize: 27, fontWeight: '800', letterSpacing: -0.5 },
  title: { fontSize: 18, fontWeight: '700' },
  body:  { fontSize: 13, fontWeight: '400', color: colors.foreground },
  meta:  { fontSize: 12, fontWeight: '400', color: colors.muted },
  label: { fontSize: 12, fontWeight: '600' },
  badge: { fontSize: 11, fontWeight: '600' },
};
```

The brand gradient (hero header, detail header, CTA) is `#7c3aed → #4f46e5` (use `expo-linear-gradient`), angled ~160°.

---

## 2. Recommended stack

| Concern            | Choice                                                            |
|--------------------|-------------------------------------------------------------------|
| Framework          | **Expo** (managed) + React Native                                 |
| Navigation         | `expo-router` or `@react-navigation` (native-stack + bottom-tabs) |
| Icons              | `lucide-react-native` (same icon set as web)                      |
| Data fetching      | `@tanstack/react-query` (already used on web — share query keys)  |
| Forms + validation | `react-hook-form` + `zod` (same as web — reuse schemas)           |
| HTTP               | `axios` (reuse the web service layer / interceptors)             |
| Gradients          | `expo-linear-gradient`                                            |
| Toasts             | `sonner-native` or `react-native-toast-message`                   |
| Bottom sheets      | `@gorhom/bottom-sheet` (Apply flow)                               |
| Storage / auth     | `expo-secure-store` for the auth token (web uses localStorage)    |
| Rich text          | render the Tiptap HTML with `react-native-render-html`            |

> **Reuse opportunity:** the web app's `zod` schemas, `react-query` hooks (`useJob`, `useAuth`, `useDashboard`…), `axios` service layer, and `helpers.ts` formatters (`formatToPesos`, `timeAgo`, `formatDistanceToNow`) are all platform-agnostic. Move them into a shared package or copy them as-is.

---

## 3. Navigation structure

```
RootStack
├── (auth)
│   ├── Welcome          // value prop + Get started / Log in
│   ├── Login
│   └── Register         // role select (job_seeker | employer) → details
│
├── JobSeekerTabs        // bottom tab bar
│   ├── Jobs             // Browse: search + filter pills + feed
│   │   ├── JobDetails   // gradient header, sticky Apply CTA
│   │   └── ApplySheet   // @gorhom/bottom-sheet — pick resume + cover note
│   ├── Applications     // status filter pills
│   │   └── ApplicationDetail  // status timeline
│   ├── SavedJobs
│   └── Profile          // account + settings menu + logout
│
└── EmployerTabs         // bottom tab bar
    ├── Dashboard        // 2×2 stat cards + recent activity log
    ├── JobListings      // segmented (Active/Closed/Drafts) + FAB → CreateJob
    │   ├── CreateJob    // form + rich-text description editor
    │   └── Applicants   // per-job candidate list, status filter
    │       └── ViewApplication  // candidate + Reject / Shortlist actions
    └── Profile          // company profile + settings
```

Role-based routing matches the web `login` flow: `job_seeker` → JobSeekerTabs, `employer` → EmployerTabs.

**Job Seeker tabs:** Jobs · Applied · Saved · Profile
**Employer tabs:** Dashboard · Jobs · Applicants · Profile

---

## 4. Screen inventory (maps to web routes)

| Mobile screen        | Web source                                                        |
|----------------------|-------------------------------------------------------------------|
| Welcome              | `src/app/page.tsx` (landing)                                      |
| Login                | `src/app/(auth)/login/page.tsx`                                   |
| Register             | `src/app/(auth)/register/page.tsx`                                |
| Browse Jobs          | `job-seeker/job-listing` + `JobSeekerJobCard.tsx`                 |
| Job Details          | `job-seeker/job-listing/[id]` + `ViewJobPostedPage.tsx`           |
| Apply (sheet)        | `JobApplicationDialog.tsx` + `ResumeCard.tsx`                     |
| My Applications      | `job-seeker/applications` + `ApplicationCard.tsx` / `StatusBadge` |
| Application Detail   | `job-seeker/applications/[id]` + `ViewJobApplicationPage.tsx`     |
| Saved Jobs           | `job-seeker/saved-jobs` + `SavedJobCard.tsx`                      |
| Profile (seeker)     | `job-seeker/profile` + `CreateProfile.tsx`                        |
| Employer Dashboard   | `employer/dashboard` + `EmployerDashboardCard.tsx` / `ActivityLogCard` |
| My Job Listings      | `employer/job-listing` + `EmployerJobListingHeader`              |
| Create / Edit Job    | `employer/create-job` + `CreateJobForm.tsx` / `JobDescriptionEditor` |
| Applicants           | `employer/applications` + `DataTable` (→ card list on mobile)     |
| View Application     | `employer/applications/[id]` + `ViewApplicationPage.tsx`          |
| Company Profile      | `employer/profile` + `UpdateEmployerProfile.tsx`                  |

> **Web → mobile adaptation:** the employer Applicants screen uses a `DataTable` on web. Tables don't work on phones — render it as the stacked **applicant card list** shown in the prototype. Likewise, top navbars become **bottom tab bars**, and modals/dialogs become **bottom sheets**.

---

## 5. Core components

These map 1:1 to the web shadcn components. Build each once in `components/`.

- **Button** — variants: `primary` (violet-600 fill), `outline` (violet-200 border / violet-700 text), `ghost`; sizes `sm` / `default`; `full` width. Radius 10.
- **Badge / StatusBadge** — pill (radius 999), 11px 600 weight, status color map from tokens. Icon + label. Drives application/applicant status everywhere.
- **JobCard** — logo tile (44px, violet-50) + title/company + meta row (pin / peso / clock, violet-400 icons) + tag badges + View/Apply footer divided by a top border. Bookmark toggle top-right.
- **ApplicationCard** — same shell as JobCard; status badge top-right; "View application" footer.
- **Card** — white, `border: 1px #f1f1f1`, radius 14, `shadow.card`, padding 14.
- **Input / Field** — label (12px 600) + bordered input (radius 10, border #e5e5e5). PasswordInput has an eye toggle.
- **SearchBar** — gray-100 fill, search icon (violet-500), rounded 12.
- **FilterPills** — horizontal scroll; active = violet-600 fill / white text.
- **SegmentedControl** — gray-100 track, active segment white with shadow (Active/Closed/Drafts).
- **StatCard** — label + big value (24px 800) + violet-500 icon tile. 2-column grid on dashboard.
- **ActivityRow** — icon tile + title + description + timestamp; separated by hairlines.
- **BottomTabBar** — 4 tabs, active = violet-600 (icon + label), 21px icons.
- **AppBar** — title (+ optional subtitle), back button, trailing icon actions (bell with red dot, settings).
- **BottomSheet** — drag handle + content (Apply flow, filters).
- **Avatar** — circular initials fallback (violet-100 / violet-600), or company logo.

---

## 6. Key interaction notes

- **Apply flow** is a bottom sheet, not a full screen: pick an existing resume (radio) or upload a new one, optional cover note, submit. Mirrors `JobApplicationDialog`.
- **Job Details** has a colored gradient header and a **sticky bottom CTA** (Bookmark + Apply). Once applied, the Apply button reads "Applied" and is disabled (web: `isApplied`).
- **Status colors are canonical** — keep the exact map (pending=amber, viewed=blue, shortlisted=green, accepted=emerald, rejected=rose, withdrawn=gray) so web and mobile stay consistent.
- **Pull-to-refresh + infinite scroll** replace the web `PaginationComponent` on list screens.
- **Empty states** — reuse the `NoDataFound` / `EmployerJobListingEmpty` patterns (icon + message + CTA).
- **Loading** — skeleton cards (web has `*Skeleton.tsx` for every list); replicate with shimmer placeholders.
- **Currency** is PHP — use the `formatToPesos` helper and the ₱ symbol.

---

## 7. How to use these files

1. Open **`prototype.html`** in any browser to review all 16 screens visually.
2. **Export to PDF:** `Ctrl/Cmd + P` → *Save as PDF* → share with designers/stakeholders.
3. **Into Figma:** screenshot individual phone frames (each is 300×640) and drop them as reference frames, or rebuild components using the tokens in §1.
4. Use this spec as the implementation checklist when scaffolding the Expo app.
