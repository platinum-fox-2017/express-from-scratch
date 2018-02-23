# Express from Scratch

Seperti yang sudah kita bicarakan di tantangan sebelumnya, ada dua cara untuk membuat sebuah project Express: cara manual atau gunakan generator. Kita sudah membuat project dengan bantuan express generator, kini saatnya kita membuat project dengan cara manual. Hal ini penting diketahui agar kita benar-benar mengetahui bagaimana framework ini bekerja.

## Release 0: Generate from Scratch

Untuk membuat project secara manual, tambahkan paket `express` ke dalam folder kerja kita dengan menggunakan perintah:

```sh
npm install --save express
```

## Release 1: Create some app

Untuk memulai membuat sebuah aplikasi express, kita perlu membuat sebuah
file sebagai *endpoint*, sebagai contoh `app.js`.

Langkah paling awal untuk menggunakan framework Express adalah dengan cara
memanggil library express dengan sintaks `require`.

Kemudian kita juga perlu membuat sebuah app variable untuk menampung segala
macam konfigurasi dan hal lain terkait aplikasi kita. dan terakhir
kita tinggal memanggil method `listen` untuk menjalankan web server sehingga
aplikasi kita sudah dapat menerima *request* dan memberikan *response*. Dalam hal ini port yang kita gunakan adalah port `3000`. Lihat contoh dibawah :

```javascript
'use strict'

const express = require('express')

let app = express()

app.listen(3000)
```


Dan sekarang percaya atau tidak kita sudah memiliki aplikasi web yang
berjalan di port `3000` dengan menjalankan perintah `node server.js`.
Bukalah web browser dan ketikkan `localhost:3000` di address bar dan
aplikasi kita sudah berjalan dengan tanda sebuah error `Cannot GET /`.

Jangan khawatir, ini adalah error yang baik buat kita. Artinya express sudah
berjalan dan express tidak menemukan `route` yang kita inginkan dan kita
juga belum melakukan apa-apa di aplikasi express kita ya kan?

## Release 2: Get something

Untuk membuat `routes` di express kita memiliki beberapa pilihan, yang akan paling sering digunakan diantaranya: `GET`, `POST`, `DELETE`, `PUT`.

Method `GET` dapat digunakan client untuk meminta sesuatu dari server kita. Di
framework express, kita dapat membuat `route` get dengan cara seperti
berikut.

```javascript
'use strict'

var express = require('express')

var app = express()

app.get('/', function (req, res) {
  res.send("I love Hacktiv8!")
})

app.listen(3000)
```

Jangan lupa juga kita perlu memberikan *response* terhadap *request* yang
masuk dari client dengan mendefinisikan fungsi callback.

Keluar dari node dengan menekan `CTRL+C` dan restart lagi server kita dengan
mengetikkan `node app.js`.

## Release 3: Move routes in a folder named 'routes'

Saat ini routes yang kita buat hanya 1, namun kita harus memikirkan untuk ke depannya, semakin berkembang suatu aplikasi, akan semakin banyak fitur yang bervariasi dan routes yang digunakan akan semakin banyak. Oleh karena itu, sebaiknya routes kita pisahkan dalam 1 folder terpisah.

Baca [referensi](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)

Buat sebuah folder bernama `routes` dengan file `index.js` di dalamnya. Pindahkan router yang sebelumnya ada di server.js ke dalam file tsb. Tambahkan beberapa konfigurasi sehingga ketika `node app.js` dijalankan, tetap menampilkan hasil spt release 2.

## Release 4: Basic routing for User

Buatlah `routing` baru untuk User pada file baru di folder `routes`. Implementasikan routing yang sesuai dengan best practice di release 3. Buatlah sejumlah route berikut pada file tersebut dengan tema sekolahan.

| Method | Route | Keterangan |
|-------|-------|-----------|
| GET    | / | Menampilkan profile sekolahan yang akan kamu buat seperti halaman home jika kalian masuk ke web sekolahan|
| GET    | /student | menampilkan form untuk menginput data student |
| POST   | /student | menerima data form untuk add student |
| GET    | /teachers | menampilkan data teachers dengan menggunakan table html |

Pastikan setiap route memberikan respon yang unik sebagai penanda jika kita berhasil mengakses route tersebut.
Bila kamu kesulitan silakan baca dokumentasi ExpressJs mengenai basic routing.

## Release 5: Make it pretty with Interface

Yang kita lakukan sebelumnya adalah merespon dengan plain text. Kita dapat menggunakan templating engine yang sudah disediakan oleh Node.js via npm. Salah satu yang paling populer digunakan adalah `pug` (dulunya bernama `jade`). Namun di challenge ini kita akan menggunakan `ejs`.

Install paket `ejs` dan gunakan template engine tersebut di aplikasi express kita. Kembali ke dokumentasi untuk informasi lebih lanjut.

Buatlah halaman html sederhana untuk routing `/`, kamu bebas mengkreasikan halamanmu dengan menggunakan CSS dan Gambar untuk mempercantik website kalian

## Resources

* [Express Js - Template Engine](http://expressjs.com/en/guide/using-template-engines.html)
