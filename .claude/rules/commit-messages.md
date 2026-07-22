# Commit Message Rules

Gunakan standar **Conventional Commits** untuk semua pesan commit.

## Format
`<type>(<scope>): <subject>`
*(scope bersifat opsional)*

## Tipe (Types)
- **feat**: Fitur baru
- **fix**: Perbaikan bug
- **docs**: Perubahan dokumentasi (README, dll)
- **style**: Format kode (spasi, titik koma, dll, tanpa ubah logika)
- **refactor**: Refactoring kode (bukan fitur/bug)
- **perf**: Peningkatan kinerja
- **test**: Penambahan/perbaikan pengujian
- **chore**: Update rutin (dependensi, konfigurasi, build)

## Aturan
1. **Subject** gunakan kalimat perintah bahasa Inggris huruf kecil (contoh: "add button" BUKAN "Added button").
2. **Subject** jangan diakhiri titik.
3. Jaga pesan singkat tapi jelas.

## Contoh
- `feat(ui): add navigation menu`
- `fix(auth): resolve null token`
- `chore: init shadcn`
- `docs: update setup instructions`
