const firebaseConfig = {
  apiKey: "AIzaSyAMIDwDZvvPntqQcd2SHcCsvkzSV3vV4U8",
  authDomain: "ngocnhi-os.firebaseapp.com",
  databaseURL: "https://ngocnhi-os-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "ngocnhi-os",
  storageBucket: "ngocnhi-os.firebasestorage.app",
  messagingSenderId: "341142528514",
  appId: "1:341142528514:web:7b6d226bd6439431a17d1b",
  measurementId: "G-PYGJX4XCHE"
};

// Khởi tạo Firebase nếu chưa được khởi tạo
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
