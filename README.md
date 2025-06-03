# 📸 Mini Photobooth 1x3 – versi Presencia

Hai! Ini project **Photobooth digital sederhana** buat seru-seruan bareng temen-temen atau acara komunitas kamu. Cuma modal kamera, bisa ambil 3 foto lucu, kasih dekorasi stiker ala-ala, terus hasilnya bisa di-download pakai QR Code langsung 😎

---

## ✨ Fitur Keren

- 🎥 Nyalain kamera langsung dari browser
- ⏱️ Foto 3x otomatis pake timer (biar sempet pose 😅)
- 📐 Gabungin jadi satu frame 1x3 (kayak cetak di studio)
- 🌸 Tambahin stiker lucu-lucu (tinggal drag & drop)
- 📥 Hasil bisa di-save, terus muncul QR Code buat download

---

## ⚙️ Cara Pakainya

### 1. Clone dulu

```bash
git clone https://github.com/hilmanXcode/photobooth1x3.git
cd photobooth1x3
```

### 2. Install dependency & jalanin backend-nya

```bash
npm install
node backend.js
```

👉 Backend ini penting buat nyimpen foto hasil photobooth.

### 3. Jalanin frontend-nya (buat buka `index.html` di server lokal)

```bash
npx serve .
```

Biasanya nanti bisa diakses di `http://localhost:3000`

---

## 📂 Struktur File

```
photobooth1x3/
├── backend.js          # Backend pakai Express
├── index.html          # Tampilan utama photobooth
├── script.js           # Semua logic kamera & foto
├── qrcode.js           # Bikin QR Code biar bisa download foto
├── visitorimage/       # Folder tempat nyimpen hasil foto
├── decorations/        # Stiker-stiker lucu buat dekorasi
```

---

## 🤔 Hal yang Masih Bisa Ditingkatin

> Project ini masih versi awal ya, jadi jangan berharap terlalu sempurna 😅

- ❌ **Belum responsive** – kalo dibuka di HP, tampilannya masih agak berantakan
- ❌ **Stiker belum bisa resize / geser ulang** – kalo udah dijatuhin, yaudah gitu aja 😭
- ❌ **QR Code IP-nya masih manual** – harus disesuaiin sendiri IP Wi-Fi lokal kamu
- ❌ **Gak bisa retake** – kalo foto jelek, harus ulang dari awal
- ❌ **Ada padding putih di hasil akhir** – karena template border belum fix banget
- ❌ **Belum ada aksesibilitas** – misalnya buat keyboard / screen reader
- ❌ **Kamera error?** – gak ada notifikasi kenapa (misal gak ada izin)

---

## 💡 Ide Fitur ke Depan

- Responsif buat HP & tablet
- Bisa **zoom / rotasi / geser ulang** stiker
- Tambah tombol **retake**
- Bisa ganti background atau template border
- QR code otomatis dari IP lokal (tanpa ubah manual)

---

## 🧑‍💻 Siapa yang Buat?

Made with 😎 by [@hilmanXcode](https://github.com/hilmanXcode)

---

## 📬 Mau Ikutan Ngebangun?

Silakan fork repo ini, oprek-oprek, dan kirim PR aja!  
Bebas banget mau nambah fitur, benahin bug, atau cuma ngasih saran ✨

---

## 🔐 Lisensi

Open source kok, tenang aja – pakai [MIT License](LICENSE)