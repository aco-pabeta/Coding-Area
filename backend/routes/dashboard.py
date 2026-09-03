from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from ..database import get_db
from ..models import Service, Customer, Sparepart
from ..schemas import DashboardStats

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/", response_model=DashboardStats)
def get_dashboard(db: Session = Depends(get_db)):
    today = datetime.now().strftime("%d/%m/%Y")

    total_services = db.query(Service).count()
    active_services = db.query(Service).filter(
        Service.status.notin_(["selesai", "diambil", "batal"])
    ).count()
    completed_services = db.query(Service).filter(
        Service.status.in_(["selesai", "diambil"])
    ).count()
    total_customers = db.query(Customer).count()
    total_spareparts = db.query(Sparepart).count()
    total_revenue = db.query(func.sum(Service.biaya)).filter(
        Service.status.in_(["selesai", "diambil"])
    ).scalar() or 0
    services_today = db.query(Service).filter(Service.tanggal == today).count()

    return DashboardStats(
        total_services=total_services,
        active_services=active_services,
        completed_services=completed_services,
        total_customers=total_customers,
        total_spareparts=total_spareparts,
        total_revenue=total_revenue,
        services_today=services_today
    )
