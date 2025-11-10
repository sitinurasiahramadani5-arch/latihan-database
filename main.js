// menambah library firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

// menambah/mengimfor Library firestore
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

// menambah konfigurasi
const firebaseConfig = {
    apiKey: "AIzaSyD1SzPGurWmohpmdQiXu4fcGoGn9jZEM4s",
    authDomain: "insancemerlang-86b51.firebaseapp.com",
    projectId: "insancemerlang-86b51",
    storageBucket: "insancemerlang-86b51.firebasestorage.app",
    messagingSenderId: "639827268939",
    appId: "1:639827268939:web:d52a83c6d165eb4b0344ce"
};


// inisialisasi firebase
const app = initializeApp(firebaseConfig);

// inisialisasi firestore
const db = getFirestore(app)


// fungsi untuk menyimpan data ke firebase
export async function tambahData() {
    try {
        // menyimpan data ke firestore
        const referensiDokumen = await addDoc(collection(db, "siswa"),
        {
            nama: 'Agus',
            kelas: 'XI RPL'
        })
        
        // menampilkan pesan berhasil
        console.log('Berhasil menambah data siswa')
    } catch (error) {
        // menampilkan pesan error
        console.log(error)
    }
}


// fungsi untuk mengambil data siswa dari firestore
export async function daftarSiswa() {
    //referensi ke daftar dokumen siswa
    const refDokumen = collection(db, "siswa")
    
    // melakukan permintaan atau query ke referensi daftar dokumen
    const kueri = query(refDokumen, orderBy("nama"))
    
    //menampung data cuplikan kueri
    const cuplikanKueri = await getDocs(kueri)
    
    // tampung hasil kueri
    let hasilKueri = []
    
    // loop cuplikan kueri,simpan ke variabel hasil kueri
    cuplikanKueri.forEach((dokumen) => {
        hasilKueri.push({
            id: dokumen.id,
            nama: dokumen.data().nama,
            kelas: dokumen.data().kelas
            
        })
    })
    
    //kembalikan nilai daftar siswa ke pemanggil fungsi
    return hasilKueri
}

// fungsi untuk menghapus data siswa berdasarkan id datanya
export async function hapusSiswa(id) {
    // hapus data siswa 
    await deleteDoc(doc(db, "siswa", id))
}

// fungsi untuk mengubah data siswa berdasarkan id datanya
export async function ubahSiswa(id, namaPengganti, kelasPengganti) {
    //ubah data siswa
    await updateDoc(
        doc(db, "siswa",id),
        {
            nama: namaPengganti,
            kelas: kelasPengganti
        }
    )
}