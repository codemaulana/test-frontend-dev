# Workspace Memory: Frontend Architecture Test (Next.js Latest)

## Project Context
- **Title**: Frontend Architecture Test – AI-Assisted Development Challenge
- **Store Name**: 精品商店 (Boutique Store)
- **Framework**: Next.js v16.4.5 (App Router, Turbopack, React 19, TypeScript, Tailwind CSS)
- **Time Constraint**: ~30 minutes
- **Evaluation Weight**:
  - **Code Structure**: 60%
  - **Problem Solving & Optimization**: 30%
  - **AI Usage**: 10%

---

## Catalog Synchronization (8 Products from Design)
1. 無線藍牙耳機 - NT$ 2999
2. 智慧手錶 - NT$ 8999
3. 便攜式充電器 - NT$ 1299 (Fixed 200 OK image URL)
4. 無線滑鼠 - NT$ 899
5. 機械鍵盤 - NT$ 3999
6. 網路攝影機 - NT$ 2199
7. USB隨身碟 - NT$ 599
8. 桌面擴音器 - NT$ 1599

---

## 5 Features Compliance Checklist
- [x] **1. Dialog Window**: Modal konfirmasi saat checkout dan saat hapus item dari cart (`ConfirmationDialog.tsx`, `useDialog.ts`).
- [x] **2. Toast Notification**: Notifikasi popup saat item ditambahkan ke keranjang (`ToastContainer.tsx`, `useToast.ts`, auto-dismiss 3 detik).
- [x] **3. Total Quantity Counter**: Akumulasi total pcs seluruh barang di keranjang pada badge merah cart header dan modal summary (`useCart.ts` via `useMemo`).
- [x] **4. Search Box**: Input pencarian reaktif di atas grid produk dengan icon search, tombol reset (X), counter hasil, dan empty state ramah (`SearchBar.tsx`, `useSearch.ts`).
- [x] **5. Fix Quantity Multiples & Realtime Price Update**:
  - **Root Cause Realtime Bug**: Browser auto-translate menginjeksi `<font>` tag ke dalam TextNode angka dan tombol, menyebabkan React DOM reconciliation error dan unhandled event bubbling. Selain itu, sanitasi ID tipe data campuran diperbaiki (`String(item.id) === String(productId)`).
  - **Solusi**: Isolasi dynamic number & button dengan `translate="no"` / `className="notranslate"` serta `pointer-events-none` pada SVG icons.
  - Subtotal per item (`NT$ {itemPrice * itemQty}`), badge counter, dan total order amount dihitung dan ter-render secara sinkron dan instan (real-time).

---

## Build & Test Status
- `npm run build` -> **PASS (0 TypeScript Errors, 0 Linter Warnings, Static Generation Valid)**.
