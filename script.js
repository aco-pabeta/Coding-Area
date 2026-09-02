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
