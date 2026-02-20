# SPEC_v1_UI_STRICT_PREMIUM_MASTER_v1.1.0.md
ChatCommerce Admin Dashboard v1 (Frontend Master Spec)
Stack: React (JavaScript) + Vite + Tailwind CSS v4+ (CSS-first)
Standard tooling (v1): shadcn/ui + Zustand + TanStack Query + Axios + RHF + Zod + Framer Motion + lucide-react
Version: 1.1.0
Status: MASTER SPEC (Merged • Strict • Premium • Deterministic)

---

## 0) Purpose
Build a premium merchant admin dashboard for a chat-first commerce engine:
- Merchants configure store setup (products, delivery zones, payout)
- Merchants monitor operations (orders, receipts)
- Customers buy via Telegram/WhatsApp (not a storefront)

Non-goals (v1):
- No manual mark-paid (PAID only via verified Paystack webhook)
- No editing totals
- No storefront website
- No analytics charts

---

## 1) Policy: Allowed categories vs v1 standardized tooling

### 1.1 Allowed categories (project-level permission)
Allowed categories include:
- State management libraries
- HTTP clients
- Form libraries
- Validation libraries
- UI component systems
- Animation libraries
- Icon libraries
- Server state/query libraries

### 1.2 v1 standardized tooling (implementation-level standard)
For v1, standardize on ONE tool per category:

| Category | v1 Standard |
|---|---|
| State management | Zustand |
| Server state | TanStack Query |
| HTTP client | Axios |
| Forms | React Hook Form |
| Validation | Zod |
| UI system | shadcn/ui |
| Icons | lucide-react |
| Animations | Framer Motion |
Router (required plumbing for v1):

v1 implementation should use only these standards unless there’s an explicit architectural review.

---

## 2) Tailwind CSS v4+ requirement (strict)
- Tailwind must be installed using the official Vite plugin.
- The Tailwind entry CSS must use:
  `@import "tailwindcss";`
- Theme tokens must be defined via `@theme { ... }` (see Brand System).

---

## 3) Brand system (locked)

### 3.1 Brand palette (locked)
- brand-primary: `#0F172A` (Infrastructure Slate)
- brand-accent:  `#047857` (Muted Emerald)

Surfaces:
- app-bg:   `#F8FAFC`
- card-bg:  `#FFFFFF`
- border:   `#E5E7EB`

Text:
- text:       `#111827`
- text-muted: `#6B7280`

Status colors are separate from brand colors.

### 3.2 Tailwind v4 theme variables (required)
Implement in `src/styles/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #0F172A;
  --color-brand-accent:  #047857;

  --color-app-bg:   #F8FAFC;
  --color-card-bg:  #FFFFFF;
  --color-border:   #E5E7EB;

  --color-text:       #111827;
  --color-text-muted: #6B7280;
}

Required utilities used across the app:

bg-brand-primary, text-brand-accent, ring-brand-accent

bg-app-bg, bg-card-bg, border-border

text-text, text-text-muted

3.3 Brand usage rules (strict)

Primary CTA:

bg-brand-primary text-white hover:opacity-95

Focus: focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg

Secondary CTA:

bg-white border border-border text-text hover:bg-neutral-50

Same focus ring rules

Links:

text-brand-accent hover:underline

Same focus ring rules

Sidebar active indicator:

border-l-2 border-brand-accent

background: bg-neutral-50 (subtle; never paint whole sidebar green)

4) Premium design tokens (locked)

Spacing:

Page padding: px-8 py-8

Card padding: p-6

Gaps: gap-6

Radius:

Cards: rounded-xl

Buttons/Inputs: rounded-lg

Badges: rounded-full

Shadows:

Cards: shadow-sm

Hover cards: hover:shadow-md only if interactive

Typography:

Page title: text-2xl font-semibold tracking-tight

Section title: text-lg font-semibold

Body: text-sm

Muted: text-sm text-text-muted

Microinteractions:

Standard transition: transition duration-150 ease-out

Framer Motion is allowed but restrained:

duration ≤ 200ms

no spring bounce

modal fade, toast entrance, subtle page fade, button micro press only

5) Architecture: separation of concerns (strict)

Rules:

Pages orchestrate (compose UI + call hooks)

UI components do NOT call APIs

API modules wrap Axios only (no React imports)

TanStack Query hooks are the only layer that connects UI ↔ API modules

Zustand stores only:

auth token + auth actions

business summary (optional)

UI prefs (sidebar collapsed)

(never store server lists in Zustand)

Data flow:
Component/Page
↓
Feature Hook (TanStack Query)
↓
API Module (Axios)
↓
Backend

6) Folder structure (locked)
src/
  app/
    App.jsx
    routes.jsx
    queryClient.js
    layouts/
      AppShell.jsx
      AuthLayout.jsx
  pages/
    auth/
      Login.jsx
      Register.jsx
    app/
      Dashboard.jsx
      Business.jsx
      Products.jsx
      DeliveryZones.jsx
      Payout.jsx
      Orders.jsx
      OrderDetail.jsx
  features/
    business/queries.js
    products/queries.js
    products/mutations.js
    deliveryZones/queries.js
    deliveryZones/mutations.js
    payout/queries.js
    payout/mutations.js
    orders/queries.js
    orders/mutations.js
    receipts/queries.js
  components/
    ui/ (shadcn + local primitives)
    domain/
      SharePanel.jsx
      MoneyBreakdown.jsx
      OrderItemsTable.jsx
  api/
    client.js
    auth.js
    business.js
    products.js
    deliveryZones.js
    payout.js
    orders.js
    receipts.js
  services/
    money.js
    validators.js
    status.js
    format.js
  store/
    auth.js
  styles/
    index.css
7) Routing (locked)

Public:

/auth/login

/auth/register

Protected:

/app/dashboard

/app/business

/app/products

/app/delivery-zones

/app/payout

/app/orders

/app/orders/:orderId

Auth Guard:

if no token → redirect /auth/login

on 401 → clear auth + queryClient.clear() + redirect /auth/login

8) TanStack Query (locked)
8.1 QueryClient defaults

staleTime default: 30s

detail queries override to 60s where declared

refetchOnWindowFocus: false

refetchOnReconnect: true

retry: 1

8.2 Query keys (MANDATORY)

Lists:

['products']

['deliveryZones']

['orders', { status, search }]

Details:

['business']

['payout']

['order', orderId]

['receipt', orderId]

No string-only keys.

8.3 Invalidation rules

product create/update/disable → invalidate ['products']

zone create/update/disable → invalidate ['deliveryZones']

payout setup → invalidate ['payout']

mark delivered → invalidate ['order', orderId] AND invalidate orders broadly (safe v1)

8.4 Logout behavior (MANDATORY)

On logout:

clear Zustand auth store

queryClient.clear()

9) Axios API client (locked)

Single Axios instance in src/api/client.js

baseURL = import.meta.env.VITE_API_BASE_URL

request interceptor adds Authorization: Bearer <token>

response interceptor:

if 401: clear auth + queryClient.clear() + redirect /auth/login

normalize backend errors to throw { code, message }

No direct axios usage in components/pages.

10) Validation (locked)

Implement in services/validators.js:

store_code:

regex ^[A-Z0-9]{3,20}$

transform: uppercase + strip spaces

error: "Store code must be 3–20 characters (A–Z, 0–9), no spaces."

naira integer inputs:

regex ^[0-9]{1,9}$

int >= 0

error: "Enter a whole naira amount (digits only)."

account_number:

regex ^[0-9]{10}$

error: "Account number must be 10 digits."

password:

min length 8

11) Money rules (strict)

Backend stores kobo; UI displays naira.

Display: format kobo → naira with commas: ₦1,500

Input: admin enters whole naira integers only (no decimals)

services/money.js must implement:

formatNairaFromKobo(koboInt)

ensureNairaIntegerInput(str) -> int or error

12) UI components (minimum required)
12.1 UI primitives

Button (primary/secondary/danger)

Input/Textarea/Select

Card

Table (locked density)

Skeleton

EmptyState

Local Toast (top-right, auto-dismiss 3s)

Badge (status)

Modal/Dialog (prefer shadcn Dialog)

12.2 Icon system (lucide-react) — required mapping

Nav:

Dashboard: LayoutDashboard

Products: Package

Delivery Zones: MapPin

Orders: ClipboardList (or ReceiptText)

Payout: Landmark

Business: Store

Logout: LogOut

Status:

reserved: Clock

payment_pending: AlertTriangle

paid: CheckCircle2

delivered: Truck

expired: XCircle

Actions:

Add: Plus

Edit: Pencil

Disable: Ban

Copy: Copy

Open PDF: FileDown or ExternalLink

Save: Save

Sizes:

inline: 16px (w-4 h-4)

section: 20px (w-5 h-5)

13) Status colors (strict, separate from brand)

Badges:

reserved: bg-blue-100 text-blue-700

payment_pending: bg-amber-100 text-amber-700

paid: bg-green-100 text-green-700

delivered: bg-emerald-100 text-emerald-700

expired: bg-red-100 text-red-700

14) API response minimums (UI contract)

UI must not assume beyond these:

Business:
GET /api/v1/business:

id, name, store_code, currency ("NGN")

Products:
GET /api/v1/products items:

id, name, description?, base_price_kobo, image_url?, is_active
Upload:
POST /api/v1/uploads/product-image:

image_url (starts /media/products/)

Delivery Zones:
GET /api/v1/delivery-zones items:

id, name, fee_kobo, is_active

Payout:
GET /api/v1/payout/status:

status (pending|active|failed)

bank_name?, account_number_last3?, account_name?

Orders list:
GET /api/v1/orders items:

id, status, total_kobo, channel_type, created_at, customer_display

Order detail:
GET /api/v1/orders/{id}:

id, status, created_at, channel_type, customer_display

delivery_address?, delivery_zone_name?

subtotal_kobo, delivery_fee_kobo, total_kobo

items[]: name_snapshot, quantity, unit_price_kobo, line_total_kobo

payment?: status?, paystack_reference?, authorization_url?

Receipt:
GET /api/v1/receipts/{order_id}:

receipt_number, pdf_url (starts /media/receipts/), created_at




## 14.1 API request payload contracts (LOCKED — frontend must follow)

The frontend MUST send kobo integers to the backend for money fields.
Admin UI collects whole naira integers, then converts:
- kobo = naira * 100

### Auth
POST /api/v1/auth/login
Request:
{ "email": string, "password": string }

POST /api/v1/auth/register
Request:
{ "email": string, "password": string, "business_name": string, "store_code": string }

### Business
PATCH /api/v1/business
Request:
{ "name": string }

### Products
POST /api/v1/products
Request:
{
  "name": string,
  "description": string|null,
  "base_price_kobo": integer,
  "image_url": string|null
}

PATCH /api/v1/products/{id}
Request:
{
  "name": string,
  "description": string|null,
  "base_price_kobo": integer,
  "image_url": string|null,
  "is_active": boolean|null
}

DELETE /api/v1/products/{id}
Request: {}

### Delivery Zones
POST /api/v1/delivery-zones
Request:
{ "name": string, "fee_kobo": integer }

PATCH /api/v1/delivery-zones/{id}
Request:
{ "name": string, "fee_kobo": integer, "is_active": boolean|null }

DELETE /api/v1/delivery-zones/{id}
Request: {}

### Payout
POST /api/v1/payout/setup
Request:
{ "bank_name": string, "account_number": string, "account_name": string }

### Orders
GET /api/v1/orders?status=&search=
Query params:
- status: string|null
- search: string|null

POST /api/v1/orders/{id}/mark-delivered
Request: {}

### Receipts
GET /api/v1/receipts/{order_id}
Request: {}

15) Page specs (strict UI states)
15.1 Auth: Login /auth/login

RHF + Zod

submit disabled while loading

inline validation errors

API errors → toast {message}
Success:

save token (Zustand + localStorage)

navigate /app/dashboard

15.2 Auth: Register /auth/register

RHF + Zod

store_code normalized (uppercase, strip spaces)
Success:

redirect /auth/login (unless backend returns token explicitly; if it does, auto-login allowed)

15.3 AppShell (all /app/*)

background: bg-app-bg

sidebar + topbar

store_code chip always visible (skeleton while ['business'] loading)

copy buttons give toast feedback

logout clears auth + query cache + redirect

Responsive:

desktop: sidebar visible

mobile: sidebar toggled, tables scroll horizontally

15.4 Dashboard /app/dashboard

Purpose: self-onboarding without support.
Fetch plan:

Business is loaded by AppShell.

Dashboard fetches in parallel:

products list

delivery zones list

payout status
Show:

one stable skeleton dashboard layout until these settle (no flashing spinners)
Checklist completion:

products > 0

zones > 0

payout.status == active

SharePanel:

Telegram: /start STORE_CODE (copy)

WhatsApp: START STORE_CODE (copy)

15.5 Business /app/business

Show name editable

store_code readonly

currency readonly
Save:

mutation + toast success + invalidate ['business']

15.6 Products /app/products

table + skeleton rows

empty state with CTA “Add product”

add/edit uses shadcn Dialog

image upload:

upload endpoint -> image_url

include in create/update payload

disable uses confirm + mutation + invalidate ['products']

15.7 Delivery Zones /app/delivery-zones

table + skeleton rows

empty state copy:
“Add delivery zones so delivery fees are calculated automatically.”

add/edit modal

disable + invalidate ['deliveryZones']

15.8 Payout /app/payout

status card + setup form

account_number validation 10 digits

mask last3 after save (from API)
If status != active:

show warning banner:
“Payments cannot be finalized until payout is active.”

15.9 Orders list /app/orders

filters: status + search

query key: ['orders', { status, search }]

skeleton rows while loading

empty state:
“Orders appear when customers buy via chat.”

row click navigates to detail

15.10 Order detail /app/orders/:orderId

query: ['order', orderId] staleTime 60s
Render:

header with status badge + total

timeline

items table

money breakdown

delivery info

payment info

receipt section

Payment link rule:

if status == payment_pending:

if authorization_url exists -> show Copy Payment Link button

else -> show neutral note:
“Payment link is available in the customer chat thread.”

Mark delivered:

only if status == paid

Receipt:

if status paid/delivered:

query ['receipt', orderId]

if 404 -> “Receipt is generating. Refresh in a moment.”

if exists -> Open Receipt PDF

16) Definition of done (v1)

Premium consistency: tokens enforced across pages

Merchant can onboard (checklist + share panel)

CRUD: products, zones

Payout setup works + status displayed

Orders list/detail stable

Mark delivered only when paid

Receipts open when available + graceful 404

No forbidden actions exist

No console errors

No dependency creep beyond v1 standardized tooling


---
