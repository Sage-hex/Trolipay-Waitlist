
```md
# V1_BACKEND_FRONTEND_ALIGNMENT_CHECKLIST.md
ChatCommerce v1 — Backend ↔ Frontend Alignment Checklist
Scope: Admin Dashboard + Money Loop + Media + Receipts + States + Multi-tenant
Status: Must-pass before production

---

## A) Shared invariants (must match AGENTS.md)

A1. Routes
- [ ] Backend exposes all v1 APIs under `/api/v1/*`
- [ ] Frontend uses `VITE_API_BASE_URL` and calls `/api/v1/*` only

A2. Money
- [ ] Backend stores money as integer kobo
- [ ] Frontend displays kobo as naira (`₦` formatting)
- [ ] Admin inputs are whole naira integers only (frontend validates, backend enforces)
- [ ] Fee rule: platform_fee_kobo = ceil(total_kobo * 0.015)

A3. Payment truth
- [ ] Order becomes PAID only via verified Paystack webhook
- [ ] Frontend has no “mark paid” action anywhere

A4. Multi-tenant
- [ ] Backend derives `business_id` from JWT for admin APIs
- [ ] Frontend never sends `business_id` in admin requests
- [ ] JWT is stored client-side and attached as Bearer token by Axios interceptor

A5. Media
- [ ] Backend serves media via `/media/*` in v1
- [ ] Frontend uses returned URLs directly (no guessing file paths)

---

## B) Endpoint existence + response fields (UI contract)

B1. Auth
- [ ] POST `/api/v1/auth/login` returns `{ access_token }`
- [ ] POST `/api/v1/auth/register` behavior is defined:
  - [ ] either returns success and frontend redirects to login
  - [ ] or returns access_token and frontend auto-logins (pick one)

B2. Business
- [ ] GET `/api/v1/business` returns:
  - id, name, store_code, currency ("NGN")
- [ ] PATCH `/api/v1/business` allows name update only

B3. Products
- [ ] GET `/api/v1/products` returns list with:
  - id, name, description?, base_price_kobo, image_url?, is_active
- [ ] POST/PATCH return updated product object
- [ ] DELETE performs soft disable and returns success or updated product

B4. Upload
- [ ] POST `/api/v1/uploads/product-image` (multipart) returns:
  - image_url starting with `/media/products/`

B5. Delivery zones
- [ ] GET `/api/v1/delivery-zones` returns:
  - id, name, fee_kobo, is_active
- [ ] POST/PATCH/DELETE exist and work

B6. Payout
- [ ] GET `/api/v1/payout/status` returns:
  - status (pending|active|failed)
  - bank_name?, account_number_last3?, account_name?
- [ ] POST `/api/v1/payout/setup` exists and returns status

B7. Orders list
- [ ] GET `/api/v1/orders` returns list items:
  - id, status, total_kobo, channel_type, created_at, customer_display

B8. Order detail
- [ ] GET `/api/v1/orders/{id}` returns:
  - id, status, created_at, channel_type, customer_display
  - delivery_address?, delivery_zone_name?
  - subtotal_kobo, delivery_fee_kobo, total_kobo
  - items[]: name_snapshot, quantity, unit_price_kobo, line_total_kobo
  - payment?: status?, paystack_reference?, authorization_url?

B9. Mark delivered
- [ ] POST `/api/v1/orders/{id}/mark-delivered` exists
- [ ] Backend enforces: only paid -> delivered transition

B10. Receipts
- [ ] GET `/api/v1/receipts/{order_id}` returns:
  - receipt_number, pdf_url (starts `/media/receipts/`), created_at
- [ ] If receipt not ready, backend returns 404 (frontend shows “generating” message)

---

## C) Order state machine alignment

C1. States must match exactly:
- [ ] reserved
- [ ] payment_pending
- [ ] paid
- [ ] delivered
- [ ] expired

C2. Frontend action availability:
- [ ] payment_pending: show payment link if available, otherwise show neutral note
- [ ] paid: show “mark delivered”
- [ ] delivered: no actions except receipt open
- [ ] expired: no actions

C3. Backend enforcement:
- [ ] No illegal transitions allowed via API
- [ ] Webhook transition to paid is idempotent

---

## D) Security & session behavior

D1. 401 behavior
- [ ] Backend returns 401 on expired/invalid JWT
- [ ] Frontend Axios interceptor:
  - clears auth store
  - queryClient.clear()
  - redirects to /auth/login

D2. Webhook security
- [ ] Backend verifies Paystack signature
- [ ] Backend ignores duplicate webhook deliveries (idempotency key/reference)

---

## E) Performance & UX stability

E1. Dashboard fetch plan
- [ ] Backend endpoints are fast enough for parallel calls:
  - products list
  - delivery zones list
  - payout status
- [ ] Frontend shows a single stable skeleton layout (no flashing)

E2. Pagination (optional v1)
- [ ] If orders list can be large, backend supports pagination later
- [ ] Frontend is structured to add pagination without rewrite

---

## F) Nigeria + international readiness

F1. Currency display
- [ ] Frontend displays NGN (₦) for now
- [ ] Backend keeps amounts in kobo universally
- [ ] Multi-currency can be added later without breaking schema

F2. Processors
- [ ] v1: Paystack only (platform-owned)
- [ ] Future: Stripe/others can be added without changing the UI architecture

---

## G) Release gate (must pass)
- [ ] All checklist items A–D are satisfied
- [ ] A real test order can be created via Telegram, paid via Paystack, and shows as PAID in dashboard
- [ ] Receipt can be opened from dashboard after paid
- [ ] Mark delivered works only after paid
- [ ] No “mark paid” exists anywhere