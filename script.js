// ===== AUTH CHECK =====
let currentUser = null;

(function(){
  const loggedIn=localStorage.getItem('loggedIn');
  const userData=localStorage.getItem('user');
  if(loggedIn!=='true'||!userData){
    window.location.replace('login.html');
    return;
  }
  try{
    currentUser=JSON.parse(userData);
    if(!currentUser.name||!currentUser.role){
      window.location.replace('login.html');
      return;
    }
    const nameEl=document.querySelector('.sidebar-footer .user-info .name');
    const roleEl=document.querySelector('.sidebar-footer .user-info .role');
    if(nameEl)nameEl.textContent=currentUser.name;
    if(roleEl)roleEl.textContent=currentUser.role;
    applyRoleAccess(currentUser.role);
  }catch(e){
    window.location.replace('login.html');
  }
})();

function applyRoleAccess(role){
  const navItems=document.querySelectorAll('.nav-item[data-role]');
  navItems.forEach(item=>{
    const allowed=item.getAttribute('data-role').split(',');
    if(!allowed.includes(role)){
      item.style.display='none';
    }
  });
  if(role!=='superadmin'){
    const mgmtNav=document.querySelector('.nav-item[data-page="pengaturan"]');
    if(mgmtNav)mgmtNav.style.display='none';
  }
}

function handleLogout(){
  logActivity('Keluar dari sistem');
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  window.location.href='login.html';
}

// ===== LUCIDE ICONS INIT =====
document.addEventListener('DOMContentLoaded',()=>{lucide.createIcons()});

// ===== DATA =====
const servisData = [
  {id:'INV-0048',pelanggan:'Rina Sari',hp:'iPhone 14 Pro',imei:'123456789012345',kerusakan:'Layar Retak',teknisi:'Kurniawan',tanggal:'02/09/2026',status:'dikerjakan',biaya:1850000,catatan:'Layar retak parah, perlu ganti total'},
  {id:'INV-0047',pelanggan:'Budi Santoso',hp:'Samsung A54',imei:'987654321098765',kerusakan:'Baterai Kembung',teknisi:'Andi',tanggal:'02/09/2026',status:'menunggu',biaya:350000,catatan:'Baterai sudah kembung, perlu ganti baru'},
  {id:'INV-0046',pelanggan:'Dewi Lestari',hp:'Redmi Note 12',imei:'555666777888999',kerusakan:'Charging Port Rusak',teknisi:'Rudi',tanggal:'01/09/2026',status:'sparepart',biaya:250000,catatan:'Port charging longgar, menunggu sparepart masuk'},
  {id:'INV-0045',pelanggan:'Andi Pratama',hp:'OPPO Reno 8',imei:'111222333444555',kerusakan:'Sinyal Hilang',teknisi:'Kurniawan',tanggal:'01/09/2026',status:'selesai',biaya:350000,catatan:'Modul sinyal sudah diganti, tested OK'},
  {id:'INV-0044',pelanggan:'Sari Melati',hp:'Vivo Y36',imei:'666777888999000',kerusakan:'Tombol Power Mati',teknisi:'Andi',tanggal:'31/08/2026',status:'diambil',biaya:150000,catatan:'Tombol power sudah diganti, normal'},
  {id:'INV-0043',pelanggan:'Rudi Hartono',hp:'iPhone 13',imei:'444555666777888',kerusakan:'Baterai Drop',teknisi:'Rudi',tanggal:'31/08/2026',status:'selesai',biaya:450000,catatan:'Baterai diganti, health 100%'},
  {id:'INV-0042',pelanggan:'Lisa Permata',hp:'Samsung A34',imei:'222333444555666',kerusakan:'LCD Blank',teknisi:'Kurniawan',tanggal:'30/08/2026',status:'selesai',biaya:650000,catatan:'LCD diganti, tested normal'},
  {id:'INV-0041',pelanggan:'Hendra Wijaya',hp:'OPPO A78',imei:'333444555666777',kerusakan:'Tembok Kamera Belakang',teknisi:'Andi',tanggal:'30/08/2026',status:'diagnosa',biaya:0,catatan:'Sedang dalam tahap diagnosa'},
  {id:'INV-0040',pelanggan:'Maya Putri',hp:'iPhone 12',imei:'888999000111222',kerusakan:'Face ID Error',teknisi:'Rudi',tanggal:'29/08/2026',status:'selesai',biaya:800000,catatan:'Face ID sudah diperbaiki'},
  {id:'INV-0039',pelanggan:'Dodi Kusuma',hp:'Samsung A14',imei:'999000111222333',kerusakan:'Vibrator Mati',teknisi:'Kurniawan',tanggal:'29/08/2026',status:'batal',biaya:0,catatan:'Pelanggan membatalkan servis'},
  {id:'INV-0038',pelanggan:'Nina Sari',hp:'Xiaomi 13',imei:'777888999000111',kerusakan:'Layar Bergaris',teknisi:'Andi',tanggal:'28/08/2026',status:'selesai',biaya:1200000,catatan:'LCD diganti, kualitas original'},
  {id:'INV-0037',pelanggan:'Tono Sugiarto',hp:'Realme C55',imei:'555111222333444',kerusakan:'Speaker Rusak',teknisi:'Rudi',tanggal:'28/08/2026',status:'diambil',biaya:200000,catatan:'Speaker sudah diganti'},
];

const pelangganData = [
  {nama:'Rina Sari',noHP:'081234567890',servis:3,color:'#3B82F6',riwayat:[
    {hp:'iPhone 14 Pro',kerusakan:'Layar Retak',masuk:'02/09/2026',selesai:'-',status:'dikerjakan'},
    {hp:'iPhone 13',kerusakan:'Baterai Drop',masuk:'15/07/2026',selesai:'17/07/2026',status:'selesai'},
    {hp:'iPhone 12',kerusakan:'Charging Port',masuk:'20/05/2026',selesai:'21/05/2026',status:'diambil'},
  ]},
  {nama:'Budi Santoso',noHP:'085678901234',servis:2,color:'#059669',riwayat:[
    {hp:'Samsung A54',kerusakan:'Baterai Kembung',masuk:'02/09/2026',selesai:'-',status:'menunggu'},
    {hp:'Samsung A34',kerusakan:'Layar Retak',masuk:'10/06/2026',selesai:'12/06/2026',status:'diambil'},
  ]},
  {nama:'Dewi Lestari',noHP:'087890123456',servis:1,color:'#D97706',riwayat:[
    {hp:'Redmi Note 12',kerusakan:'Charging Port Rusak',masuk:'01/09/2026',selesai:'-',status:'sparepart'},
  ]},
  {nama:'Andi Pratama',noHP:'083456789012',servis:4,color:'#DC2626',riwayat:[
    {hp:'OPPO Reno 8',kerusakan:'Sinyal Hilang',masuk:'01/09/2026',selesai:'01/09/2026',status:'selesai'},
    {hp:'OPPO A78',kerusakan:'Layar Bergaris',masuk:'15/07/2026',selesai:'16/07/2026',status:'diambil'},
    {hp:'OPPO Reno 7',kerusakan:'Baterai',masuk:'20/04/2026',selesai:'21/04/2026',status:'selesai'},
    {hp:'OPPO A57',kerusakan:'Speaker',masuk:'10/03/2026',selesai:'11/03/2026',status:'diambil'},
  ]},
  {nama:'Sari Melati',noHP:'089012345678',servis:2,color:'#7C3AED',riwayat:[
    {hp:'Vivo Y36',kerusakan:'Tombol Power Mati',masuk:'31/08/2026',selesai:'01/09/2026',status:'diambil'},
    {hp:'Vivo Y22',kerusakan:'LCD Blank',masuk:'12/06/2026',selesai:'14/06/2026',status:'selesai'},
  ]},
  {nama:'Rudi Hartono',noHP:'082345678901',servis:1,color:'#0891B2',riwayat:[
    {hp:'iPhone 13',kerusakan:'Baterai Drop',masuk:'31/08/2026',selesai:'01/09/2026',status:'selesai'},
  ]},
];

const sparepartData = [
  {nama:'LCD iPhone 14 Pro',sku:'LCD-IP14P',stok:5,harga:1850000,kategori:'Layar'},
  {nama:'LCD iPhone 13',sku:'LCD-IP13',stok:8,harga:950000,kategori:'Layar'},
  {nama:'Baterai Samsung A54',sku:'BAT-SA54',stok:12,harga:180000,kategori:'Baterai'},
  {nama:'Baterai iPhone 13',sku:'BAT-IP13',stok:3,harga:350000,kategori:'Baterai'},
  {nama:'Charging Port Redmi Note 12',sku:'CHG-RMN12',stok:2,harga:85000,kategori:'Charging'},
  {nama:'Kamera Belakang OPPO A78',sku:'CAM-OPA78',stok:0,harga:250000,kategori:'Kamera'},
  {nama:'Tombol Power Vivo Y36',sku:'BTN-VY36',stok:15,harga:25000,kategori:'Lainnya'},
  {nama:'Speaker iPhone 12',sku:'SPK-IP12',stok:4,harga:120000,kategori:'Lainnya'},
  {nama:'LCD Samsung A34',sku:'LCD-SA34',stok:1,harga:650000,kategori:'Layar'},
  {nama:'Face ID Module iPhone 12',sku:'FID-IP12',stok:0,harga:800000,kategori:'Sensor'},
  {nama:'Layar Xiaomi 13',sku:'LCD-XM13',stok:6,harga:1200000,kategori:'Layar'},
  {nama:'Vibrator Motor Realme C55',sku:'VIB-RC55',stok:7,harga:45000,kategori:'Lainnya'},
  {nama:'Kabel Flex Samsung A14',sku:'FLX-SA14',stok:0,harga:55000,kategori:'Lainnya'},
];

const statusBadge = {
  menunggu:'badge-yellow',diagnosa:'badge-blue',sparepart:'badge-purple',
  dikerjakan:'badge-orange',selesai:'badge-green',diambil:'badge-black',batal:'badge-red'
};
const statusLabel = {
  menunggu:'Menunggu',diagnosa:'Diagnosa',sparepart:'Menunggu Sparepart',
  dikerjakan:'Dikerjakan',selesai:'Selesai',diambil:'Diambil',batal:'Batal'
};

// ===== NAVIGATION =====
function showPage(name,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(el)el.classList.add('active');
  lucide.createIcons();
}

// ===== MODAL =====
function openModal(id){document.getElementById(id).classList.add('show');lucide.createIcons()}
function closeModal(id){document.getElementById(id).classList.remove('show')}
document.querySelectorAll('.modal-overlay').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')});
});

// ===== RENDER SERVIS TABLE =====
function renderServis(data){
  const tbody=document.getElementById('servisTableBody');
  tbody.innerHTML=data.map(s=>`
    <tr onclick="showServiceDetail('${s.id}')" style="cursor:pointer">
      <td><strong>#${s.id}</strong></td>
      <td>${s.pelanggan}</td>
      <td>${s.hp}<br><span style="font-size:10px;color:var(--text-tertiary)">${s.imei}</span></td>
      <td>${s.kerusakan}</td>
      <td>${s.teknisi}</td>
      <td>${s.tanggal}</td>
      <td><span class="badge ${statusBadge[s.status]}">${statusLabel[s.status]}</span></td>
    </tr>
  `).join('');
}

function filterStatus(btn,status){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(status==='all')renderServis(servisData);
  else renderServis(servisData.filter(s=>s.status===status));
}

document.getElementById('searchServis').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  renderServis(servisData.filter(s=>
    s.id.toLowerCase().includes(q)||s.pelanggan.toLowerCase().includes(q)||s.hp.toLowerCase().includes(q)||s.imei.includes(q)
  ));
});

// ===== SERVICE DETAIL =====
function showServiceDetail(id){
  const s=servisData.find(x=>x.id===id);
  if(!s)return;
  document.getElementById('serviceDetailContent').innerHTML=`
    <div class="detail-header">
      <div class="detail-avatar">${s.pelanggan.split(' ').map(n=>n[0]).join('')}</div>
      <div class="detail-info">
        <h2>${s.pelanggan}</h2>
        <div class="detail-meta">${s.hp} &bull; ${s.imei}</div>
        <div style="margin-top:8px"><span class="badge ${statusBadge[s.status]}">${statusLabel[s.status]}</span></div>
      </div>
    </div>
    <div class="detail-section">
      <h4>Informasi Servis</h4>
      <div class="detail-row"><span class="dlabel">Invoice</span><span class="dvalue">#${s.id}</span></div>
      <div class="detail-row"><span class="dlabel">Kerusakan</span><span class="dvalue">${s.kerusakan}</span></div>
      <div class="detail-row"><span class="dlabel">Teknisi</span><span class="dvalue">${s.teknisi}</span></div>
      <div class="detail-row"><span class="dlabel">Tanggal Masuk</span><span class="dvalue">${s.tanggal}</span></div>
      <div class="detail-row"><span class="dlabel">Estimasi Biaya</span><span class="dvalue">${s.biaya?'Rp '+s.biaya.toLocaleString('id-ID'):'Dalam diagnosa'}</span></div>
    </div>
    <div class="detail-section">
      <h4>Catatan</h4>
      <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.6">${s.catatan}</p>
    </div>
    <div class="detail-section">
      <h4>Riwayat Status</h4>
      <div class="detail-timeline">
        <div class="timeline-item"><div class="timeline-dot" style="background:var(--primary)"></div><div class="timeline-content"><strong>Diterima</strong><div class="time">${s.tanggal}</div></div></div>
        ${s.status!=='menunggu'?`<div class="timeline-item"><div class="timeline-dot" style="background:#0EA5E9"></div><div class="timeline-content"><strong>Diagnosa</strong><div class="time">Dalam proses</div></div></div>`:''}
        ${s.status==='sparepart'||s.status==='dikerjakan'||s.status==='selesai'||s.status==='diambil'?`<div class="timeline-item"><div class="timeline-dot" style="background:#7C3AED"></div><div class="timeline-content"><strong>Menunggu Sparepart</strong><div class="time">Sparepart dipesan</div></div></div>`:''}
        ${s.status==='dikerjakan'||s.status==='selesai'||s.status==='diambil'?`<div class="timeline-item"><div class="timeline-dot" style="background:#EA580C"></div><div class="timeline-content"><strong>Sedang Dikerjakan</strong><div class="time">Proses perbaikan</div></div></div>`:''}
        ${s.status==='selesai'||s.status==='diambil'?`<div class="timeline-item"><div class="timeline-dot" style="background:#059669"></div><div class="timeline-content"><strong>Selesai</strong><div class="time">Siap diambil</div></div></div>`:''}
        ${s.status==='diambil'?`<div class="timeline-item"><div class="timeline-dot" style="background:#334155"></div><div class="timeline-content"><strong>Diambil</strong><div class="time">Pelanggan sudah mengambil</div></div></div>`:''}
      </div>
    </div>
  `;
  openModal('serviceDetailModal');
}

// ===== RENDER PELANGGAN =====
function renderPelanggan(data){
  const grid=document.getElementById('customerGrid');
  grid.innerHTML=data.map(p=>`
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar" style="background:${p.color}">${p.nama.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div class="profile-name">${p.nama}</div>
          <div class="profile-phone"><i data-lucide="phone"></i> ${p.noHP}</div>
          <div class="profile-count"><i data-lucide="repeat"></i> ${p.servis}x servis di tempat kami</div>
        </div>
      </div>
      <div class="profile-history">
        ${p.riwayat.map(r=>`
          <div class="history-item">
            <div class="history-info">
              <div class="hp-name">${r.hp}</div>
              <div class="kerusakan">${r.kerusakan}</div>
              <div class="tanggal"><i data-lucide="calendar"></i> ${r.masuk} ${r.selesai!=='-'?'&bull; Selesai: '+r.selesai:''}</div>
            </div>
            <span class="badge ${statusBadge[r.status]}">${statusLabel[r.status]}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

document.getElementById('searchPelanggan').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  renderPelanggan(pelangganData.filter(p=>p.nama.toLowerCase().includes(q)||p.noHP.includes(q)));
});

// ===== RENDER SPAREPART =====
function renderSparepart(data){
  const tbody=document.getElementById('sparepartTableBody');
  const iconMap={Layar:'smartphone',Baterai:'battery-charging',Charging:'plug',Kamera:'camera',Sensor:'scan',Lainnya:'more-horizontal'};
  tbody.innerHTML=data.map(s=>{
    let stockStyle='';
    if(s.stok===0)stockStyle='color:#DC2626;font-weight:700';
    else if(s.stok<=3)stockStyle='color:#D97706;font-weight:600';
    return `
    <tr>
      <td style="display:flex;align-items:center;gap:10px">
        <div class="product-img"><i data-lucide="${iconMap[s.kategori]||'box'}"></i></div>
        <div><strong>${s.nama}</strong><br><span style="font-size:10px;color:var(--text-tertiary)">${s.kategori}</span></div>
      </td>
      <td><span style="font-family:monospace;font-size:11px;background:var(--bg);padding:2px 6px;border-radius:4px">${s.sku}</span></td>
      <td><span style="${stockStyle}">${s.stok} pcs</span></td>
      <td><strong>Rp ${s.harga.toLocaleString('id-ID')}</strong></td>
      <td>
        <button class="filter-btn" style="padding:4px 8px;font-size:11px" onclick="event.stopPropagation()"><i data-lucide="pencil" style="width:12px;height:12px"></i></button>
        <button class="filter-btn" style="padding:4px 8px;font-size:11px;color:#DC2626;border-color:#FEE2E2" onclick="event.stopPropagation()"><i data-lucide="trash-2" style="width:12px;height:12px"></i></button>
      </td>
    </tr>
  `}).join('');
  lucide.createIcons();
}

document.getElementById('searchSparepart').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  renderSparepart(sparepartData.filter(s=>s.nama.toLowerCase().includes(q)||s.sku.toLowerCase().includes(q)));
});

// ===== INIT =====
renderServis(servisData);
renderPelanggan(pelangganData);
renderSparepart(sparepartData);

// ===== USER MANAGEMENT =====
const defaultUsers = [
  {id:1,nama:'Super Admin',username:'admin',email:'admin@loopfix.com',noHP:'081234567890',password:'admin123',role:'superadmin',status:'active',createdAt:'2026-01-01T00:00:00.000Z',activityLog:[]}
];

function initUsers(){
  let users=JSON.parse(localStorage.getItem('users')||'[]');
  const superadmin=users.find(u=>u.role==='superadmin');
  if(!superadmin){
    users.unshift({id:1,nama:'Super Admin',username:'admin',email:'admin@loopfix.com',noHP:'081234567890',password:'admin123',role:'superadmin',status:'active',createdAt:'2026-01-01T00:00:00.000Z',activityLog:[]});
  }else{
    superadmin.username='admin';
    superadmin.password='admin123';
    superadmin.nama='Super Admin';
    superadmin.email='admin@loopfix.com';
    superadmin.status='active';
  }
  localStorage.setItem('users',JSON.stringify(users));
  return users;
}

function getUsers(){return JSON.parse(localStorage.getItem('users')||'[]')}
function saveUsers(users){localStorage.setItem('users',JSON.stringify(users))}

function logActivity(action){
  if(!currentUser)return;
  const users=getUsers();
  const user=users.find(u=>u.username===currentUser.username);
  if(user){
    if(!user.activityLog)user.activityLog=[];
    user.activityLog.unshift({
      action,
      time:new Date().toISOString()
    });
    if(user.activityLog.length>50)user.activityLog=user.activityLog.slice(0,50);
    saveUsers(users);
  }
}

function renderUserManagement(){
  const users=getUsers();
  const tbody=document.getElementById('userTableBody');
  if(!tbody)return;

  const roleColors={superadmin:'#7C3AED',admin:'#3B82F6',teknisi:'#EA580C'};
  const statusColors={active:'status-active',pending:'status-pending',inactive:'status-inactive'};
  const statusLabels={active:'Aktif',pending:'Pending',inactive:'Nonaktif'};
  const roleLabels={superadmin:'Superadmin',admin:'Admin',teknisi:'Teknisi'};

  tbody.innerHTML=users.map(u=>`
    <tr>
      <td>
        <div class="user-cell">
          <div class="user-avatar" style="background:${roleColors[u.role]||'#64748B'}">${u.nama.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
          <div class="user-cell-info">
            <div class="uc-name">${u.nama}</div>
            <div class="uc-email">${u.email}</div>
          </div>
        </div>
      </td>
      <td><span style="font-family:monospace;font-size:12px">${u.username}</span></td>
      <td><span class="role-badge role-${u.role}">${roleLabels[u.role]||u.role}</span></td>
      <td><span class="status-badge ${statusColors[u.status]}">${statusLabels[u.status]}</span></td>
      <td>
        <div class="action-menu">
          <button class="action-btn" onclick="toggleActionMenu(this)">
            <i data-lucide="more-vertical"></i>
          </button>
          <div class="action-dropdown">
            <div class="action-dropdown-item" onclick="viewUserProfile(${u.id})">
              <i data-lucide="eye"></i> Lihat Profil
            </div>
            ${u.role!=='superadmin'?`
            <div class="action-dropdown-item" onclick="editUser(${u.id})">
              <i data-lucide="pencil"></i> Edit
            </div>
            <div class="action-dropdown-item" onclick="resetUserPassword(${u.id})">
              <i data-lucide="key"></i> Reset Password
            </div>
            ${u.status==='active'?`
            <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'inactive')">
              <i data-lucide="user-x"></i> Nonaktifkan
            </div>
            `:`
            <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'active')">
              <i data-lucide="user-check"></i> Aktifkan
            </div>
            `}
            <div class="action-dropdown-item" onclick="viewUserActivity(${u.id})">
              <i data-lucide="activity"></i> Riwayat Aktif
            </div>
            <div class="action-dropdown-item danger" onclick="deleteUser(${u.id})">
              <i data-lucide="trash-2"></i> Hapus
            </div>
            `:`
            <div class="action-dropdown-item" onclick="viewUserActivity(${u.id})">
              <i data-lucide="activity"></i> Riwayat Aktif
            </div>
            `}
          </div>
        </div>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function toggleActionMenu(btn){
  document.querySelectorAll('.action-dropdown.show').forEach(d=>d.classList.remove('show'));
  const dropdown=btn.nextElementSibling;
  dropdown.classList.toggle('show');
}

document.addEventListener('click',function(e){
  if(!e.target.closest('.action-menu')){
    document.querySelectorAll('.action-dropdown.show').forEach(d=>d.classList.remove('show'));
  }
});

function viewUserProfile(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u)return;
  const roleLabels={superadmin:'Superadmin',admin:'Admin',teknisi:'Teknisi'};
  const statusLabels={active:'Aktif',pending:'Pending',inactive:'Nonaktif'};
  const statusColors={active:'status-active',pending:'status-pending',inactive:'status-inactive'};
  const roleColors={superadmin:'#7C3AED',admin:'#3B82F6',teknisi:'#EA580C'};

  document.getElementById('userDetailContent').innerHTML=`
    <div class="user-modal-detail">
      <div class="user-modal-avatar" style="background:${roleColors[u.role]}">${u.nama.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
      <div class="user-modal-info">
        <h2>${u.nama}</h2>
        <div class="umi-role"><span class="role-badge role-${u.role}">${roleLabels[u.role]}</span> <span class="status-badge ${statusColors[u.status]}">${statusLabels[u.status]}</span></div>
        <div class="umi-email"><i data-lucide="mail"></i> ${u.email}</div>
      </div>
    </div>
    <div class="user-detail-section">
      <h4>Data Diri</h4>
      <div class="user-detail-row"><span class="udl">Username</span><span class="udv">${u.username}</span></div>
      <div class="user-detail-row"><span class="udl">No. HP</span><span class="udv">${u.noHP}</span></div>
      <div class="user-detail-row"><span class="udl">Role</span><span class="udv">${roleLabels[u.role]}</span></div>
      <div class="user-detail-row"><span class="udl">Status</span><span class="udv">${statusLabels[u.status]}</span></div>
      <div class="user-detail-row"><span class="udl">Terdaftar</span><span class="udv">${new Date(u.createdAt).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</span></div>
    </div>
  `;
  openModal('userDetailModal');
}

function editUser(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u||u.role==='superadmin')return;

  document.getElementById('editUserId').value=u.id;
  document.getElementById('editNama').value=u.nama;
  document.getElementById('editUsername').value=u.username;
  document.getElementById('editEmail').value=u.email;
  document.getElementById('editNoHP').value=u.noHP;
  document.getElementById('editRole').value=u.role;
  openModal('editUserModal');
}

function saveEditUser(){
  const id=parseInt(document.getElementById('editUserId').value);
  const nama=document.getElementById('editNama').value.trim();
  const username=document.getElementById('editUsername').value.trim();
  const email=document.getElementById('editEmail').value.trim();
  const noHP=document.getElementById('editNoHP').value.trim();
  const role=document.getElementById('editRole').value;

  if(!nama||!username||!email||!noHP||!role){
    alert('Semua field wajib diisi');
    return;
  }

  const users=getUsers();
  const existing=users.find(u=>u.username===username&&u.id!==id);
  if(existing){
    alert('Username sudah digunakan');
    return;
  }

  const user=users.find(u=>u.id===id);
  if(user){
    user.nama=nama;
    user.username=username;
    user.email=email;
    user.noHP=noHP;
    user.role=role;
    saveUsers(users);
    renderUserManagement();
    closeModal('editUserModal');
  }
}

function resetUserPassword(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u||u.role==='superadmin')return;

  const newPass=prompt('Masukkan password baru untuk '+u.username+':');
  if(!newPass||newPass.length<6){
    if(newPass!==null)alert('Password minimal 6 karakter');
    return;
  }

  u.password=newPass;
  saveUsers(users);
  alert('Password berhasil direset');
}

function toggleUserStatus(id,newStatus){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u||u.role==='superadmin')return;

  const action=newStatus==='active'?'mengaktifkan':'menonaktifkan';
  if(!confirm('Yakin ingin '+action+' akun '+u.username+'?'))return;

  u.status=newStatus;
  saveUsers(users);
  renderUserManagement();
}

function deleteUser(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u||u.role==='superadmin')return;

  if(!confirm('Yakin ingin menghapus akun '+u.username+'? Tindakan ini tidak dapat dibatalkan.'))return;

  const newUsers=users.filter(x=>x.id!==id);
  saveUsers(newUsers);
  renderUserManagement();
}

function viewUserActivity(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u)return;

  const roleLabels={superadmin:'Superadmin',admin:'Admin',teknisi:'Teknisi'};
  const logs=u.activityLog||[];

  document.getElementById('activityContent').innerHTML=`
    <div class="user-modal-detail">
      <div class="user-modal-avatar" style="background:${u.role==='superadmin'?'#7C3AED':u.role==='admin'?'#3B82F6':'#EA580C'}">${u.nama.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
      <div class="user-modal-info">
        <h2>${u.nama}</h2>
        <div class="umi-role"><span class="role-badge role-${u.role}">${roleLabels[u.role]}</span></div>
      </div>
    </div>
    <div class="user-detail-section">
      <h4>Riwayat Aktivitas</h4>
      ${logs.length===0?'<p style="font-size:12.5px;color:var(--text-secondary);padding:12px 0">Belum ada aktivitas</p>':
        logs.map(log=>`
          <div class="activity-log-item">
            <div class="activity-log-dot" style="background:${log.action.includes('Login')?'#059669':log.action.includes('Keluar')?'#DC2626':'#3B82F6'}"></div>
            <div>
              <div class="activity-log-text"><strong>${log.action}</strong></div>
              <div class="activity-log-time">${new Date(log.time).toLocaleString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
            </div>
          </div>
        `).join('')}
    </div>
  `;
  openModal('activityModal');
}

function approveUser(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u)return;
  u.status='active';
  saveUsers(users);
  renderUserManagement();
  alert('Akun '+u.username+' telah disetujui');
}

function rejectUser(id){
  const users=getUsers();
  const u=users.find(x=>x.id===id);
  if(!u)return;
  u.status='inactive';
  saveUsers(users);
  renderUserManagement();
  alert('Akun '+u.username+' telah ditolak');
}

initUsers();
if(document.getElementById('userTableBody'))renderUserManagement();

// ===== USER SEARCH & FILTER =====
function filterUserStatus(btn,status){
  document.querySelectorAll('#page-user-management .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const users=getUsers();
  if(status==='all')renderUserManagement();
  else{
    const tbody=document.getElementById('userTableBody');
    const filtered=users.filter(u=>u.status===status);
    const roleColors={superadmin:'#7C3AED',admin:'#3B82F6',teknisi:'#EA580C'};
    const statusColors={active:'status-active',pending:'status-pending',inactive:'status-inactive'};
    const statusLabels={active:'Aktif',pending:'Pending',inactive:'Nonaktif'};
    const roleLabels={superadmin:'Superadmin',admin:'Admin',teknisi:'Teknisi'};
    tbody.innerHTML=filtered.map(u=>`
      <tr>
        <td>
          <div class="user-cell">
            <div class="user-avatar" style="background:${roleColors[u.role]||'#64748B'}">${u.nama.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
            <div class="user-cell-info">
              <div class="uc-name">${u.nama}</div>
              <div class="uc-email">${u.email}</div>
            </div>
          </div>
        </td>
        <td><span style="font-family:monospace;font-size:12px">${u.username}</span></td>
        <td><span class="role-badge role-${u.role}">${roleLabels[u.role]||u.role}</span></td>
        <td><span class="status-badge ${statusColors[u.status]}">${statusLabels[u.status]}</span></td>
        <td>
          <div class="action-menu">
            <button class="action-btn" onclick="toggleActionMenu(this)">
              <i data-lucide="more-vertical"></i>
            </button>
            <div class="action-dropdown">
              <div class="action-dropdown-item" onclick="viewUserProfile(${u.id})">
                <i data-lucide="eye"></i> Lihat Profil
              </div>
              ${u.role!=='superadmin'?`
              <div class="action-dropdown-item" onclick="editUser(${u.id})">
                <i data-lucide="pencil"></i> Edit
              </div>
              <div class="action-dropdown-item" onclick="resetUserPassword(${u.id})">
                <i data-lucide="key"></i> Reset Password
              </div>
              ${u.status==='active'?`
              <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'inactive')">
                <i data-lucide="user-x"></i> Nonaktifkan
              </div>
              `:`
              <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'active')">
                <i data-lucide="user-check"></i> Aktifkan
              </div>
              `}
              <div class="action-dropdown-item" onclick="viewUserActivity(${u.id})">
                <i data-lucide="activity"></i> Riwayat Aktif
              </div>
              <div class="action-dropdown-item danger" onclick="deleteUser(${u.id})">
                <i data-lucide="trash-2"></i> Hapus
              </div>
              `:`
              <div class="action-dropdown-item" onclick="viewUserActivity(${u.id})">
                <i data-lucide="activity"></i> Riwayat Aktif
              </div>
              `}
            </div>
          </div>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
  }
}

const searchUserEl=document.getElementById('searchUser');
if(searchUserEl){
  searchUserEl.addEventListener('input',function(){
    const q=this.value.toLowerCase();
    const users=getUsers();
    const filtered=users.filter(u=>u.nama.toLowerCase().includes(q)||u.username.toLowerCase().includes(q)||u.email.toLowerCase().includes(q));
    const tbody=document.getElementById('userTableBody');
    const roleColors={superadmin:'#7C3AED',admin:'#3B82F6',teknisi:'#EA580C'};
    const statusColors={active:'status-active',pending:'status-pending',inactive:'status-inactive'};
    const statusLabels={active:'Aktif',pending:'Pending',inactive:'Nonaktif'};
    const roleLabels={superadmin:'Superadmin',admin:'Admin',teknisi:'Teknisi'};
    tbody.innerHTML=filtered.map(u=>`
      <tr>
        <td>
          <div class="user-cell">
            <div class="user-avatar" style="background:${roleColors[u.role]||'#64748B'}">${u.nama.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
            <div class="user-cell-info">
              <div class="uc-name">${u.nama}</div>
              <div class="uc-email">${u.email}</div>
            </div>
          </div>
        </td>
        <td><span style="font-family:monospace;font-size:12px">${u.username}</span></td>
        <td><span class="role-badge role-${u.role}">${roleLabels[u.role]||u.role}</span></td>
        <td><span class="status-badge ${statusColors[u.status]}">${statusLabels[u.status]}</span></td>
        <td>
          <div class="action-menu">
            <button class="action-btn" onclick="toggleActionMenu(this)">
              <i data-lucide="more-vertical"></i>
            </button>
            <div class="action-dropdown">
              <div class="action-dropdown-item" onclick="viewUserProfile(${u.id})">
                <i data-lucide="eye"></i> Lihat Profil
              </div>
              ${u.role!=='superadmin'?`
              <div class="action-dropdown-item" onclick="editUser(${u.id})">
                <i data-lucide="pencil"></i> Edit
              </div>
              <div class="action-dropdown-item" onclick="resetUserPassword(${u.id})">
                <i data-lucide="key"></i> Reset Password
              </div>
              ${u.status==='active'?`
              <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'inactive')">
                <i data-lucide="user-x"></i> Nonaktifkan
              </div>
              `:`
              <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'active')">
                <i data-lucide="user-check"></i> Aktifkan
              </div>
              `}
              <div class="action-dropdown-item" onclick="viewUserActivity(${u.id})">
                <i data-lucide="activity"></i> Riwayat Aktif
              </div>
              <div class="action-dropdown-item danger" onclick="deleteUser(${u.id})">
                <i data-lucide="trash-2"></i> Hapus
              </div>
              `:`
              <div class="action-dropdown-item" onclick="viewUserActivity(${u.id})">
                <i data-lucide="activity"></i> Riwayat Aktif
              </div>
              `}
            </div>
          </div>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
  });
}
