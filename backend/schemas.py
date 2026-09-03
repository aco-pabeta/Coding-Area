from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ==================== AUTH ====================
class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    nama: str
    username: str
    email: EmailStr
    no_hp: Optional[str] = None
    password: str
    role: str = "teknisi"


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"


# ==================== USER ====================
class UserResponse(BaseModel):
    id: int
    nama: str
    username: str
    email: str
    no_hp: Optional[str] = None
    role: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    nama: str
    username: str
    email: EmailStr
    no_hp: Optional[str] = None
    password: str
    role: str = "teknisi"
    status: str = "active"


class UserUpdate(BaseModel):
    nama: Optional[str] = None
    email: Optional[EmailStr] = None
    no_hp: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None


# ==================== SERVICE ====================
class ServiceResponse(BaseModel):
    id: int
    invoice: str
    pelanggan: str
    hp: str
    imei: Optional[str] = None
    kerusakan: str
    teknisi: Optional[str] = None
    tanggal: str
    status: str
    biaya: float
    catatan: Optional[str] = None
    user_id: Optional[int] = None

    class Config:
        from_attributes = True


class ServiceCreate(BaseModel):
    pelanggan: str
    hp: str
    imei: Optional[str] = None
    kerusakan: str
    teknisi: Optional[str] = None
    tanggal: str
    status: str = "menunggu"
    biaya: float = 0
    catatan: Optional[str] = None
    user_id: Optional[int] = None


class ServiceUpdate(BaseModel):
    pelanggan: Optional[str] = None
    hp: Optional[str] = None
    imei: Optional[str] = None
    kerusakan: Optional[str] = None
    teknisi: Optional[str] = None
    status: Optional[str] = None
    biaya: Optional[float] = None
    catatan: Optional[str] = None


# ==================== CUSTOMER ====================
class CustomerResponse(BaseModel):
    id: int
    nama: str
    no_hp: Optional[str] = None
    servis_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class CustomerCreate(BaseModel):
    nama: str
    no_hp: Optional[str] = None


# ==================== SPAREPART ====================
class SparepartResponse(BaseModel):
    id: int
    nama: str
    sku: str
    stok: int
    harga: float
    kategori: str

    class Config:
        from_attributes = True


class SparepartCreate(BaseModel):
    nama: str
    sku: str
    stok: int = 0
    harga: float = 0
    kategori: str


class SparepartUpdate(BaseModel):
    nama: Optional[str] = None
    stok: Optional[int] = None
    harga: Optional[float] = None
    kategori: Optional[str] = None


# ==================== ACTIVITY LOG ====================
class ActivityLogResponse(BaseModel):
    id: int
    user_id: int
    action: str
    timestamp: datetime

    class Config:
        from_attributes = True


# ==================== DASHBOARD ====================
class DashboardStats(BaseModel):
    total_services: int
    active_services: int
    completed_services: int
    total_customers: int
    total_spareparts: int
    total_revenue: float
    services_today: int
