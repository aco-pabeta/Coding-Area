from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False)
    no_hp = Column(String(20), nullable=True)
    password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="teknisi")
    status = Column(String(20), nullable=False, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)

    services = relationship("Service", back_populates="user")
    activity_logs = relationship("ActivityLog", back_populates="user")


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    invoice = Column(String(20), unique=True, nullable=False, index=True)
    pelanggan = Column(String(100), nullable=False)
    hp = Column(String(100), nullable=False)
    imei = Column(String(20), nullable=True)
    kerusakan = Column(Text, nullable=False)
    teknisi = Column(String(100), nullable=True)
    tanggal = Column(String(20), nullable=False)
    status = Column(String(20), nullable=False, default="menunggu")
    biaya = Column(Float, default=0)
    catatan = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    user = relationship("User", back_populates="services")


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(100), nullable=False)
    no_hp = Column(String(20), nullable=True)
    servis_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class Sparepart(Base):
    __tablename__ = "spareparts"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(100), nullable=False)
    sku = Column(String(50), unique=True, nullable=False, index=True)
    stok = Column(Integer, default=0)
    harga = Column(Float, default=0)
    kategori = Column(String(50), nullable=False)


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String(255), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="activity_logs")
