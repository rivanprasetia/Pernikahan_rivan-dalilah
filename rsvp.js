import { db } from './firebase.js';
import { collection, addDoc } from "firebase/firestore";

async function tambahDataRSVP(nama, hadir) {
    try {
        const docRef = await addDoc(collection(db, "rsvp"), {
            nama: nama,
            hadir: hadir
        });
        console.log("Data berhasil disimpan dengan ID:", docRef.id);
    } catch (e) {
        console.error("Kesalahan:", e);
    }
}

export { tambahDataRSVP };
