# AI Usage & Prompting Playbook: Next.js Architecture (10% Score)

Gunakan playbook ini saat berinteraksi dengan AI atau saat menjelaskan hasil kerja ke evaluator/penguji untuk memastikan nilai **10% AI Usage** diraih secara maksimal.

---

## 1. Professional Prompting Progression (Reasonable Prompting Techniques)

### Langkah 1: Decomposition & Analisis (Anti-Vague Prompting)
**Prompt:**
> "Saya memiliki starter code `index.html` dari aplikasi shopping cart lama. Bantu saya menganalisis kelemahan arsitektur monolitiknya dan merencanakannya ulang ke **Next.js App Router (React 19 + TypeScript + Tailwind CSS)**.
> Pisahkan arsitektur ke:
> 1. Types contract murni (`types/index.ts`).
> 2. State management terisolasi via Custom Hooks (`useCart`, `useSearch`, `useToast`, `useDialog`).
> 3. Komponen modular (`ProductCard`, `SearchBar`, `CartDrawer`, `ConfirmationDialog`, `ToastContainer`).
> 4. Fix bug kritis pada update kuantitas kelipatan (multiples) dan string concatenation."

---

### Langkah 2: State Management & Bug Fixing Multiples
**Prompt:**
> "Buatkan hook `useCart` untuk Next.js dengan `'use client'`.
> Syarat arsitektur:
> - Hitung `totalQuantity` dan `totalPrice` secara derivatif menggunakan `useMemo`.
> - Terapkan sanitasi kuantitas yang kebal terhadap string concatenation dan nilai NaN: `const qty = parseInt(String(val), 10); Math.max(1, isNaN(qty) ? 1 : qty)`.
> - Semua update state harus immutable (tidak ada direct array push/splice)."

---

### Langkah 3: UI/UX Anti-Slop Implementation
**Prompt:**
> "Buatkan komponen UI yang memenuhi kriteria UX modern:
> - `ConfirmationDialog`: modal accessible dengan `role='dialog'`, backdrop blur, escape key listener, dan konfirmasi aksi destruktif (merah) vs normal.
> - `ToastContainer`: toast notifikasi saat add to cart dengan animasi slide-in dan auto-dismiss 3 detik.
> - `SearchBar`: search box dengan clear button dan hitungan produk yang ditemukan.
> - `CartDrawer`: panel slide-over dengan ringkasan total pcs dan subtotal harga."

---

### Langkah 4: Production Verification
**Prompt:**
> "Jalankan `npx next build` untuk memverifikasi bahwa seluruh tipe data valid, tidak ada `any`, tidak ada hydration mismatch, dan aplikasi siap dideploy."

---

## 2. Interview Defense: Final Result Accuracy and Understanding

### Pertanyaan 1: "Mengapa memilih Next.js App Router untuk test ini?"
> **Jawaban:** "Next.js memberikan fondasi arsitektur terstruktur standar industri. Dengan memisahkan layout, page, dan komponen klien (`'use client'`), kita mendapatkan rendering yang optimal, TypeScript support out-of-the-box, dan struktur folder yang scalable dibandingkan single HTML file monolitik."

### Pertanyaan 2: "Bagaimana Anda memperbaiki bug 'quantity couldn't update by multiples'?"
> **Jawaban:** "Pada JavaScript vanilla dan event handler input, value input form bertipe `string`. Operasi `item.quantity + step` sering mengevaluasi string concatenation (misal `'2' + 2 = '22'`). Selain itu, starter code tidak menangani invalid value seperti NaN saat input dikosongkan. Saya memperbaikinya di hook `useCart` dengan sanitasi `parseInt(String(val), 10)` yang dipagari `Math.max(1, ...)`, serta menyediakan fungsi `adjustQuantity` dan `updateQuantity` yang immutable."

### Pertanyaan 3: "Mengapa totalQuantity dan totalPrice menggunakan `useMemo` daripada `useState` terpisah?"
> **Jawaban:** "Menyimpan nilai turunan di state independen melanggar prinsip *Single Source of Truth* dan rawan terjadi *state desync*. Dengan `useMemo`, kedua nilai tersebut otomatis terhitung ulang secara efisien setiap kali array `cart` berubah."
