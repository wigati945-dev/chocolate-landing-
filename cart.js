const CART_KEY = 'chocoBoutiqueCart';

const produkPesanan = [
    {
        id: 'puding-coklat',
        nama: 'Puding Coklat',
        harga: 25000
    },
    {
        id: 'es-krim-coklat',
        nama: 'Es Krim Coklat',
        harga: 22000
    }
];

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

function ambilKeranjang() {
    const dataTersimpan = localStorage.getItem(CART_KEY);

    if (!dataTersimpan) {
        return [];
    }

    try {
        return JSON.parse(dataTersimpan);
    } catch (error) {
        localStorage.removeItem(CART_KEY);
        return [];
    }
}

function simpanKeranjang(keranjang) {
    localStorage.setItem(CART_KEY, JSON.stringify(keranjang));
}

function tambahKeKeranjang(idProduk) {
    const produk = produkPesanan.find((item) => item.id === idProduk);

    if (!produk) {
        return;
    }

    const keranjang = ambilKeranjang();
    const itemKeranjang = keranjang.find((item) => item.id === idProduk);

    if (itemKeranjang) {
        itemKeranjang.jumlah += 1;
    } else {
        keranjang.push({
            ...produk,
            jumlah: 1
        });
    }

    simpanKeranjang(keranjang);
}

function hapusDariKeranjang(idProduk) {
    const keranjang = ambilKeranjang().filter((item) => item.id !== idProduk);
    simpanKeranjang(keranjang);
}

function kosongkanKeranjang() {
    localStorage.removeItem(CART_KEY);
}

function hitungTotal(keranjang) {
    return keranjang.reduce((total, item) => total + (item.harga * item.jumlah), 0);
}

function hitungJumlahBarang(keranjang) {
    return keranjang.reduce((total, item) => total + item.jumlah, 0);
}
