# Workspace Rules: Frontend Architecture Test (Next.js Latest)

Repo ini dikonfigurasi khusus untuk menyelesaikan **Frontend Architecture Test – AI-Assisted Development Challenge** menggunakan **Next.js (App Router) + TypeScript + Tailwind CSS**.

## 1. Golden Rules (Non-Negotiable)
- **Framework & Architecture**:
  - Gunakan **Next.js App Router (v16+)** dengan arsitektur modular.
  - Pisahkan Server vs Client boundary dengan presisi (`'use client'` hanya di komponen yang butuh interactivity / browser state).
  - Isolasi state management dan business logic ke dalam Custom Hooks (`useCart`, `useSearch`, `useToast`, `useDialog`).
- **Anti-AI-Slop Code**:
  - Tipe data ketat (`interface Product`, `CartItem`, `ToastItem`, `DialogConfig`). Dilarang keras memakai `any`.
  - Dilarang membuat komentar tutorial generik AI (`// handle click`, `// update state`, `// return JSX`).
  - Dilarang mutasi state langsung: selalu gunakan immutable updates (`map`, `filter`, spread operator).
  - Sanitasi angka wajib dilakukan pada setiap input quantity (`Math.max(1, parseInt(val, 10))`). Hindari bug konkat string `"1" + 1 = "11"`.
- **Anti-UI-Slop Visuals**:
  - Gunakan visual modern, bersih, dan berstandar industri (Slate / Zinc neutral dengan aksen Indigo/Emerald).
  - Dialog / Modal wajib memiliki backdrop blur, ARIA accessibility (`role="dialog"`, `aria-modal="true"`), support `Escape` key, dan prevent background scroll.
  - Toast Notification memiliki durasi auto-dismiss (3 detik), icon status yang jelas, dan animasi halus.
  - Semua tombol memiliki status `:hover`, `:active`, `:focus-visible`, dan `:disabled`.
  - Terdapat empty state yang elegan ketika pencarian produk tidak ditemukan atau ketika keranjang kosong.

## 2. Target 5 Fitur Wajib
1. Dialog window saat checkout dan saat remove item dari keranjang.
2. Toast notification saat item ditambahkan ke keranjang.
3. Total quantity counter (akumulasi seluruh pcs barang di keranjang).
4. Search box reaktif dengan filter instant, icon pencarian, tombol clear, dan hitungan hasil.
5. Perbaikan bug quantity multiples update (string concatenation vs safe integer arithmetic).

## 3. Verifikasi Mandiri
Setiap perubahan wajib lolos verifikasi terminal:
- Next.js build: `npx next build`
- Zero TypeScript error & zero linter warning.
