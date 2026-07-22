# Architecture Rules

- **Frontend-Backend Split**: Gunakan pola decoupled. Frontend via Next.js murni berinteraksi dengan Backend Laravel via REST API.
- **Styling**: Gunakan Tailwind CSS. Hindari custom CSS kecuali terpaksa.
- **Routing**: Next.js App Router (`app/` directory).
- **Backend API**: Response selalu gunakan JSON terstandarisasi. Taruh route di `routes/api.php`.
- **Icons**: Gunakan aset/referensi dari https://simpleicons.org/ untuk logo dan ikon brand/teknologi.
- **UI Components (shadcn/ui)**: Jika membutuhkan komponen UI baru, LANGSUNG install/tambahkan menggunakan perintah shadcn CLI (contoh: `npx shadcn@latest add [nama-komponen]`) sesuai kebutuhan. Tidak perlu meminta izin untuk instalasi standar.
