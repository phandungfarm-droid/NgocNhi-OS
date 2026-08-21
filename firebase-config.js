/* =========================================================================
   FIREBASE CONFIG DÙNG CHUNG — HỆ THỐNG DỊCH VỤ NGỌC NHI
   -------------------------------------------------------------------------
   Toàn bộ 4 trang dùng chung MỘT project Firebase.
   ========================================================================= */
window.FIREBASE_CONFIG = {
  apiKey:            "AIzaSyAMIDwDZvvPntqQcd2SHcCsvkzSV3vV4U8",
  authDomain:       "ngocnhi-os.firebaseapp.com",
  databaseURL:      "https://ngocnhi-os-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "ngocnhi-os",
  storageBucket:     "ngocnhi-os.firebasestorage.app",
  messagingSenderId: "341142528514",
  appId:             "1:341142528514:web:7b6d226bd6439431a17d1b",
  measurementId:     "G-PYGJX4XCHE"
};

/* =========================================================================
   XÁC THỰC DÙNG CHUNG — chỉ đọc Auth + Accounts hiện có.
   Không bootstrap, không tạo Accounts, không thay đổi schema.
   ========================================================================= */
window.NgocNhiAuth = (function(){
  function normalizeRole(value){
    value = typeof value === "string" ? value.toLowerCase() : "";
    return value === "owner" || value === "staff" ? value : null;
  }
  function resolveRole(auth, db, user){
    user = user || (auth && auth.currentUser);
    if(!auth || !db || !user || user.isAnonymous){
      return Promise.resolve({user:user || null, uid:user ? user.uid : null, role:null, account:null, source:null});
    }
    var paths = ["Farm/Accounts/"+user.uid, "Restaurant/Accounts/"+user.uid];
    return Promise.all(paths.map(function(path){
      return db.ref(path).once("value").then(function(snap){ return snap.val() || null; }, function(){ return null; });
    })).then(function(accounts){
      var selected = null, source = null;
      accounts.forEach(function(account, index){
        var role = normalizeRole(account && account.role);
        if(!role) return;
        if(!selected || role === "owner"){
          selected = Object.assign({}, account, {role:role});
          source = index === 0 ? "Farm" : "Restaurant";
        }
      });
      return {user:user, uid:user.uid, role:selected ? selected.role : null, account:selected, source:source};
    });
  }
  function canStaff(role){ return role === "owner" || role === "staff"; }
  function canOwner(role){ return role === "owner"; }
  return {normalizeRole:normalizeRole, resolveRole:resolveRole, canStaff:canStaff, canOwner:canOwner};
})();
