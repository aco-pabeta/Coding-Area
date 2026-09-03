let currentUser = null;

(function(){
  const loggedIn=localStorage.getItem('loggedIn');
  const userData=localStorage.getItem('user');
  const token=localStorage.getItem('token');
  if(loggedIn!=='true'||!userData||!token){
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
    const mgmtNav=document.getElementById('navUserMgmt');
    if(mgmtNav)mgmtNav.style.display='none';
  }
}

function handleLogout(){
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href='login.html';
}

document.addEventListener('DOMContentLoaded',()=>{lucide.createIcons()});

const statusBadge = {
  menunggu:'badge-yellow',diagnosa:'badge-blue',sparepart:'badge-purple',
  dikerjakan:'badge-orange',selesai:'badge-green',diambil:'badge-black',batal:'badge-red'
};
const statusLabel = {
  menunggu:'Menunggu',diagnosa:'Diagnosa',sparepart:'Menunggu Sparepart',
  dikerjakan:'Dikerjakan',selesai:'Selesai',diambil:'Diambil',batal:'Batal'
};

function showPage(name,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(el)el.classList.add('active');
  lucide.createIcons();
  if(name==='dashboard')loadDashboard();
  if(name==='servis')loadServices();
  if(name==='pelanggan')loadCustomers();
  if(name==='sparepart')loadSpareparts();
  if(name==='user-management')loadUsers();
}

function openModal(id){document.getElementById(id).classList.add('show');lucide.createIcons()}
function closeModal(id){document.getElementById(id).classList.remove('show')}
document.querySelectorAll('.modal-overlay').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')});
});

function formatRp(n){
  if(!n)return 'Rp 0';
  return 'Rp '+Number(n).toLocaleString('id-ID');
}
function fmtDate(d){
  if(!d)return '-';
  const dt=new Date(d);
  return dt.toLocaleDateString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric'});
}

// ===== DASHBOARD =====
async function loadDashboard(){
  try{
    const s=await api.getDashboard();
    document.getElementById('stat-total').textContent=s.total_services;
    document.getElementById('stat-active').textContent=s.active_services;
    document.getElementById('stat-completed').textContent=s.completed_services;
    document.getElementById('stat-customers').textContent=s.total_customers;
    document.getElementById('stat-spareparts').textContent=s.total_spareparts;
    document.getElementById('stat-revenue').textContent=formatRp(s.total_revenue);

    const services=await api.getServices();
    const recent=services.slice(0,5);
    const tbody=document.getElementById('dashboardServisTable');
    if(tbody){
      if(recent.length===0){
        tbody.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-tertiary);padding:20px">Belum ada data servis</td></tr>';
      }else{
        tbody.innerHTML=recent.map(s=>`
          <tr>
            <td><strong>#${s.invoice}</strong></td>
            <td>${s.pelanggan}</td>
            <td>${s.hp}</td>
            <td>${s.kerusakan}</td>
            <td><span class="badge ${statusBadge[s.status]||'badge-yellow'}">${statusLabel[s.status]||s.status}</span></td>
          </tr>
        `).join('');
      }
    }
    lucide.createIcons();
  }catch(e){console.error('Dashboard error:',e)}
}

// ===== SERVICES =====
async function loadServices(){
  try{
    const services=await api.getServices();
    renderServis(services);
  }catch(e){console.error('Services error:',e)}
}

function renderServis(data){
  const tbody=document.getElementById('servisTableBody');
  if(!tbody)return;
  tbody.innerHTML=data.map(s=>`
    <tr onclick="showServiceDetail(${s.id})" style="cursor:pointer">
      <td><strong>#${s.invoice}</strong></td>
      <td>${s.pelanggan}</td>
      <td>${s.hp}<br><span style="font-size:10px;color:var(--text-tertiary)">${s.imei||'-'}</span></td>
      <td>${s.kerusakan}</td>
      <td>${s.teknisi||'-'}</td>
      <td>${s.tanggal}</td>
      <td><span class="badge ${statusBadge[s.status]||'badge-yellow'}">${statusLabel[s.status]||s.status}</span></td>
    </tr>
  `).join('');
}

function filterStatus(btn,status){
  document.querySelectorAll('#page-servis .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(status==='all')loadServices();
  else api.getServices('status_filter='+status).then(renderServis).catch(console.error);
}

document.getElementById('searchServis').addEventListener('input',function(){
  const q=this.value;
  if(!q)return loadServices();
  api.getServices('search='+encodeURIComponent(q)).then(renderServis).catch(console.error);
});

async function showServiceDetail(id){
  try{
    const s=await api.getService(id);
    document.getElementById('serviceDetailContent').innerHTML=`
      <div class="detail-header">
        <div class="detail-avatar">${s.pelanggan.split(' ').map(n=>n[0]).join('')}</div>
        <div class="detail-info">
          <h2>${s.pelanggan}</h2>
          <div class="detail-meta">${s.hp} &bull; ${s.imei||'Tanpa IMEI'}</div>
          <div style="margin-top:8px"><span class="badge ${statusBadge[s.status]||'badge-yellow'}">${statusLabel[s.status]||s.status}</span></div>
        </div>
      </div>
      <div class="detail-section">
        <h4>Informasi Servis</h4>
        <div class="detail-row"><span class="dlabel">Invoice</span><span class="dvalue">#${s.invoice}</span></div>
        <div class="detail-row"><span class="dlabel">Kerusakan</span><span class="dvalue">${s.kerusakan}</span></div>
        <div class="detail-row"><span class="dlabel">Teknisi</span><span class="dvalue">${s.teknisi||'Belum ditentukan'}</span></div>
        <div class="detail-row"><span class="dlabel">Tanggal Masuk</span><span class="dvalue">${s.tanggal}</span></div>
        <div class="detail-row"><span class="dlabel">Biaya</span><span class="dvalue">${s.biaya?formatRp(s.biaya):'Dalam diagnosa'}</span></div>
      </div>
      ${s.catatan?`<div class="detail-section"><h4>Catatan</h4><p style="font-size:12.5px;color:var(--text-secondary);line-height:1.6">${s.catatan}</p></div>`:''}
      <div class="detail-section">
        <h4>Aksi Status</h4>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">
          ${s.status!=='selesai'&&s.status!=='diambil'&&s.status!=='batal'?`
            <button class="filter-btn" onclick="updateStatus(${s.id},'selesai')" style="background:#D1FAE5;color:#065F46;border-color:#059669">Tandai Selesai</button>
          `:''}
          ${s.status==='selesai'?`
            <button class="filter-btn" onclick="updateStatus(${s.id},'diambil')" style="background:#F1F5F9;color:#334155;border-color:#94A3B8">Tandai Diambil</button>
          `:''}
          ${s.status!=='batal'&&s.status!=='diambil'?`
            <button class="filter-btn" onclick="updateStatus(${s.id},'batal')" style="background:#FEE2E2;color:#991B1B;border-color:#DC2626">Batalkan</button>
          `:''}
        </div>
      </div>
    `;
    openModal('serviceDetailModal');
  }catch(e){alert('Gagal memuat detail: '+e.message)}
}

async function updateStatus(id,newStatus){
  try{
    await api.updateService(id,{status:newStatus});
    closeModal('serviceDetailModal');
    loadServices();
  }catch(e){alert('Gagal update status: '+e.message)}
}

// ===== ADD SERVICE =====
async function openAddService(){
  try{
    const [customers,users]=await Promise.all([api.getCustomers(),api.getUsers()]);
    const custSel=document.getElementById('svcPelanggan');
    const techSel=document.getElementById('svcTeknisi');
    custSel.innerHTML='<option value="">Pilih pelanggan...</option>'+customers.map(c=>`<option value="${c.nama}">${c.nama}</option>`).join('');
    custSel.innerHTML+='<option value="_new">+ Tambah Baru</option>';
    techSel.innerHTML='<option value="">Pilih teknisi...</option>'+users.filter(u=>u.role==='teknisi'||u.role==='admin').map(u=>`<option value="${u.nama}">${u.nama}</option>`).join('');
  }catch(e){console.error(e)}
  openModal('addServiceModal');
}

async function saveService(){
  const custSel=document.getElementById('svcPelanggan');
  let pelanggan=custSel.value;
  if(pelanggan==='_new'){
    const newNama=prompt('Nama pelanggan baru:');
    if(!newNama)return;
    try{await api.createCustomer({nama:newNama});}catch(e){}
    pelanggan=newNama;
  }
  const hp=document.getElementById('svcHP').value.trim();
  const imei=document.getElementById('svcIMEI').value.trim();
  const kerusakan=document.getElementById('svcKerusakan').value.trim();
  const teknisi=document.getElementById('svcTeknisi').value;
  const biayaStr=document.getElementById('svcBiaya').value;
  const biaya=biayaStr?parseInt(biayaStr.replace(/\D/g,''))||0:0;
  const catatan=document.getElementById('svcCatatan').value.trim();

  if(!pelanggan||!hp||!kerusakan){alert('Pelanggan, Jenis HP, dan Kerusakan wajib diisi');return;}
  const today=new Date();
  const tanggal=String(today.getDate()).padStart(2,'0')+'/'+String(today.getMonth()+1).padStart(2,'0')+'/'+today.getFullYear();

  try{
    await api.createService({pelanggan,hp,imei:imei||null,kerusakan,teknisi:teknisi||null,tanggal,biaya,catatan:catatan||null});
    closeModal('addServiceModal');
    loadServices();
    document.getElementById('svcPelanggan').selectedIndex=0;
    document.getElementById('svcHP').value='';
    document.getElementById('svcIMEI').value='';
    document.getElementById('svcKerusakan').value='';
    document.getElementById('svcTeknisi').selectedIndex=0;
    document.getElementById('svcBiaya').value='';
    document.getElementById('svcCatatan').value='';
  }catch(e){alert('Gagal menyimpan: '+e.message)}
}

// ===== CUSTOMERS =====
async function loadCustomers(){
  try{
    const customers=await api.getCustomers();
    renderPelanggan(customers);
  }catch(e){console.error('Customers error:',e)}
}

function renderPelanggan(data){
  const grid=document.getElementById('customerGrid');
  if(!grid)return;
  const colors=['#3B82F6','#059669','#D97706','#DC2626','#7C3AED','#0891B2','#EA580C'];
  grid.innerHTML=data.map((p,i)=>`
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar" style="background:${colors[i%colors.length]}">${p.nama.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div class="profile-name">${p.nama}</div>
          <div class="profile-phone"><i data-lucide="phone"></i> ${p.no_hp||'-'}</div>
          <div class="profile-count"><i data-lucide="repeat"></i> ${p.servis_count}x servis di tempat kami</div>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

document.getElementById('searchPelanggan').addEventListener('input',function(){
  const q=this.value;
  if(!q)return loadCustomers();
  api.getCustomers('search='+encodeURIComponent(q)).then(renderPelanggan).catch(console.error);
});

async function saveCustomer(){
  const nama=document.getElementById('custNama').value.trim();
  const no_hp=document.getElementById('custNoHP').value.trim();
  if(!nama){alert('Nama wajib diisi');return;}
  try{
    await api.createCustomer({nama,no_hp:no_hp||null});
    closeModal('addCustomerModal');
    loadCustomers();
    document.getElementById('custNama').value='';
    document.getElementById('custNoHP').value='';
  }catch(e){alert('Gagal menyimpan: '+e.message)}
}

// ===== SPAREPARTS =====
async function loadSpareparts(){
  try{
    const spareparts=await api.getSpareparts();
    renderSparepart(spareparts);
    updateStockSummary(spareparts);
  }catch(e){console.error('Spareparts error:',e)}
}

function updateStockSummary(data){
  const total=data.reduce((a,s)=>a+s.stok,0);
  const menipis=data.filter(s=>s.stok>0&&s.stok<=3).length;
  const habis=data.filter(s=>s.stok===0).length;
  const cards=document.querySelectorAll('#page-sparepart .stock-card .stock-value');
  if(cards[0])cards[0].textContent=total;
  if(cards[1])cards[1].textContent=menipis;
  if(cards[2])cards[2].textContent=habis;
}

function renderSparepart(data){
  const tbody=document.getElementById('sparepartTableBody');
  if(!tbody)return;
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
      <td><strong>${formatRp(s.harga)}</strong></td>
      <td>
        <button class="filter-btn" style="padding:4px 8px;font-size:11px" onclick="editSparepart(${s.id},'${s.nama.replace(/'/g,"\\'")}',${s.stok},${s.harga},'${s.kategori}')"><i data-lucide="pencil" style="width:12px;height:12px"></i></button>
        <button class="filter-btn" style="padding:4px 8px;font-size:11px;color:#DC2626;border-color:#FEE2E2" onclick="deleteSparepartConfirm(${s.id})"><i data-lucide="trash-2" style="width:12px;height:12px"></i></button>
      </td>
    </tr>
  `}).join('');
  lucide.createIcons();
}

document.getElementById('searchSparepart').addEventListener('input',function(){
  const q=this.value;
  if(!q)return loadSpareparts();
  api.getSpareparts('search='+encodeURIComponent(q)).then(renderSparepart).catch(console.error);
});

async function saveSparepart(){
  const nama=document.getElementById('spNama').value.trim();
  const sku=document.getElementById('spSKU').value.trim();
  const stok=parseInt(document.getElementById('spStok').value)||0;
  const harga=parseInt(document.getElementById('spHarga').value.replace(/\D/g,''))||0;
  const kategori=document.getElementById('spKategori').value;
  if(!nama||!sku||!kategori){alert('Nama, SKU, dan Kategori wajib diisi');return;}
  try{
    await api.createSparepart({nama,sku,stok,harga,kategori});
    closeModal('addSparepartModal');
    loadSpareparts();
    document.getElementById('spNama').value='';
    document.getElementById('spSKU').value='';
    document.getElementById('spStok').value='';
    document.getElementById('spHarga').value='';
    document.getElementById('spKategori').selectedIndex=0;
  }catch(e){alert('Gagal menyimpan: '+e.message)}
}

function editSparepart(id,nama,stok,harga,kategori){
  const newStok=prompt('Stok baru untuk '+nama+':',stok);
  if(newStok===null)return;
  api.updateSparepart(id,{stok:parseInt(newStok)||0}).then(()=>loadSpareparts()).catch(e=>alert(e.message));
}

function deleteSparepartConfirm(id){
  if(!confirm('Yakin ingin menghapus sparepart ini?'))return;
  api.deleteSparepart(id).then(()=>loadSpareparts()).catch(e=>alert(e.message));
}

// ===== USER MANAGEMENT =====
async function loadUsers(){
  try{
    const users=await api.getUsers();
    renderUserManagement(users);
  }catch(e){console.error('Users error:',e)}
}

function renderUserManagement(users){
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
            ${u.role!=='superadmin'?`
            <div class="action-dropdown-item" onclick="approveUser(${u.id})">
              <i data-lucide="check-circle"></i> Setujui
            </div>
            <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'active')">
              <i data-lucide="user-check"></i> Aktifkan
            </div>
            <div class="action-dropdown-item" onclick="toggleUserStatus(${u.id},'inactive')">
              <i data-lucide="user-x"></i> Nonaktifkan
            </div>
            <div class="action-dropdown-item danger" onclick="deleteUserConfirm(${u.id})">
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
  btn.nextElementSibling.classList.toggle('show');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.action-menu')){
    document.querySelectorAll('.action-dropdown.show').forEach(d=>d.classList.remove('show'));
  }
});

async function approveUser(id){
  try{
    await api.updateUser(id,{status:'active'});
    loadUsers();
  }catch(e){alert(e.message)}
}

async function toggleUserStatus(id,newStatus){
  const action=newStatus==='active'?'mengaktifkan':'menonaktifkan';
  if(!confirm('Yakin ingin '+action+' akun ini?'))return;
  try{
    await api.updateUser(id,{status:newStatus});
    loadUsers();
  }catch(e){alert(e.message)}
}

async function deleteUserConfirm(id){
  if(!confirm('Yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.'))return;
  try{
    await api.deleteUser(id);
    loadUsers();
  }catch(e){alert(e.message)}
}

async function viewUserActivity(id){
  try{
    const [user,logs]=await Promise.all([api.getUser(id),api.getUserLogs(id)]);
    const roleLabels={superadmin:'Superadmin',admin:'Admin',teknisi:'Teknisi'};
    const roleColors={superadmin:'#7C3AED',admin:'#3B82F6',teknisi:'#EA580C'};
    document.getElementById('activityContent').innerHTML=`
      <div class="user-modal-detail">
        <div class="user-modal-avatar" style="background:${roleColors[user.role]||'#64748B'}">${user.nama.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
        <div class="user-modal-info">
          <h2>${user.nama}</h2>
          <div class="umi-role"><span class="role-badge role-${user.role}">${roleLabels[user.role]}</span></div>
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
                <div class="activity-log-time">${new Date(log.timestamp).toLocaleString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
              </div>
            </div>
          `).join('')}
      </div>
    `;
    openModal('activityModal');
  }catch(e){alert('Gagal memuat: '+e.message)}
}

const searchUserEl=document.getElementById('searchUser');
if(searchUserEl){
  searchUserEl.addEventListener('input',function(){
    const q=this.value;
    if(!q)return loadUsers();
    api.getUsers('search='+encodeURIComponent(q)).then(renderUserManagement).catch(console.error);
  });
}

function filterUserStatus(btn,status){
  document.querySelectorAll('#page-user-management .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(status==='all')loadUsers();
  else api.getUsers('status_filter='+status).then(renderUserManagement).catch(console.error);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',()=>{
  loadDashboard();
});
