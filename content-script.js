// Membuat elemen baru
const newDiv = document.createElement("div");
newDiv.id = "custom-element";
newDiv.style.position = "fixed";
newDiv.style.bottom = "100px";
newDiv.style.right = "10px";
newDiv.style.padding = "10px";
newDiv.style.backgroundColor = "#333";
newDiv.style.color = "white";
newDiv.style.borderRadius = "5px";
newDiv.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
newDiv.style.zIndex = "1000";
newDiv.textContent = "Halo, ini elemen baru dari ekstensi!";

// Menambahkan elemen ke body halaman
document.body.appendChild(newDiv);

// Tambahkan tombol untuk menutup elemen
const closeButton = document.createElement("button");
closeButton.textContent = "Tutup";
closeButton.style.marginLeft = "10px";
closeButton.style.backgroundColor = "#ff5e57";
closeButton.style.color = "white";
closeButton.style.border = "none";
closeButton.style.padding = "5px";
closeButton.style.borderRadius = "3px";
closeButton.style.cursor = "pointer";

// Menambahkan event listener untuk menutup elemen
closeButton.addEventListener("click", () => {
  newDiv.remove();
});

// Tambahkan tombol ke elemen
newDiv.appendChild(closeButton);

/*
// Membuat tombol untuk scraping
const scrapButton = document.createElement("button");
scrapButton.id = "scrap-button";
scrapButton.textContent = "Scrap Data";
scrapButton.style.position = "fixed";
scrapButton.style.bottom = "10px";
scrapButton.style.right = "10px";
scrapButton.style.padding = "10px";
scrapButton.style.backgroundColor = "#007bff";
scrapButton.style.color = "white";
scrapButton.style.border = "none";
scrapButton.style.borderRadius = "5px";
scrapButton.style.cursor = "pointer";
scrapButton.style.zIndex = "10000";
scrapButton.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";

// Menambahkan tombol ke body halaman
document.body.appendChild(scrapButton);

// Fungsi untuk scraping data
function scrapData() {
  // Contoh: Mengambil semua teks di dalam elemen <h1> di halaman
  const headings = Array.from(document.querySelectorAll("h1")).map(
    (element) => element.textContent.trim()
  );

  // Contoh: Mengambil semua link di halaman
  const links = Array.from(document.querySelector("#1jxf684")).map((element) => ({
    text: element.textContent.trim(),
    href: element.href,
  }));

  // Gabungkan data menjadi satu objek
  const scrapedData = {
    headings,
    links,
    timestamp: new Date().toISOString(),
  };

  // Simpan data ke file
  saveToFile(scrapedData, "scraped-data.json");
}
scrapButton.addEventListener("click", scrapData);

// Fungsi untuk menyimpan data ke file

*/
function saveToFile(data, filename) {
    // Konversi data menjadi string JSON
    const fileContent = JSON.stringify(data, null, 2);
  
    // Membuat Blob dari string JSON
    const blob = new Blob([fileContent], { type: "application/json" });
  
    // Membuat URL untuk file
    const url = URL.createObjectURL(blob);
  
    // Membuat elemen <a> untuk mengunduh file
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
  
    // Menyisipkan elemen <a> ke halaman, klik secara otomatis, lalu hapus
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  
    // Membersihkan URL Blob
    URL.revokeObjectURL(url);
  }
// Membuat tombol untuk mendengarkan request
const listenButton = document.createElement("button");
listenButton.textContent = "Start Listening API Requests";
listenButton.style.position = "fixed";
listenButton.style.bottom = "10px";
listenButton.style.right = "10px";
listenButton.style.padding = "10px";
listenButton.style.backgroundColor = "#28a745";
listenButton.style.color = "white";
listenButton.style.border = "none";
listenButton.style.borderRadius = "5px";
listenButton.style.cursor = "pointer";
listenButton.style.zIndex = "1000";

// Menambahkan tombol ke halaman
document.body.appendChild(listenButton);

// Fungsi untuk inject script dari file terpisah
function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("inject-script.js");
  document.documentElement.appendChild(script);
  script.onload = () => script.remove();
}

// Mendengarkan event pesan dari halaman
window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data.type) return;

  if (event.data.type === "FETCH") {
    console.log("Intercepted Fetch:", event.data.url, event.data.options);
  }

  if (event.data.type === "XHR") {
    console.log("Intercepted XHR:", event.data.method, event.data.url);
  }
});

// Tambahkan event listener untuk tombol
listenButton.addEventListener("click", () => {
  injectScript();
  alert("Listening for API requests...");
});
