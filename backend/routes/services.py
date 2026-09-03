from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..database import get_db
from ..models import Service
from ..schemas import ServiceResponse, ServiceCreate, ServiceUpdate

router = APIRouter(prefix="/api/services", tags=["Services"])


def generate_invoice(db: Session) -> str:
    last = db.query(Service).order_by(Service.id.desc()).first()
    if last:
        last_num = int(last.invoice.split("-")[1])
        return f"INV-{last_num + 1:04d}"
    return "INV-0001"


@router.get("/", response_model=List[ServiceResponse])
def get_services(
    search: str = None,
    status_filter: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Service)
    if search:
        query = query.filter(
            (Service.pelanggan.contains(search)) |
            (Service.hp.contains(search)) |
            (Service.invoice.contains(search))
        )
    if status_filter:
        query = query.filter(Service.status == status_filter)
    return [ServiceResponse.model_validate(s) for s in query.all()]


@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Servis tidak ditemukan")
    return ServiceResponse.model_validate(service)


@router.post("/", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(request: ServiceCreate, db: Session = Depends(get_db)):
    invoice = generate_invoice(db)
    service = Service(
        invoice=invoice,
        pelanggan=request.pelanggan,
        hp=request.hp,
        imei=request.imei,
        kerusakan=request.kerusakan,
        teknisi=request.teknisi,
        tanggal=request.tanggal,
        status=request.status,
        biaya=request.biaya,
        catatan=request.catatan,
        user_id=request.user_id
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return ServiceResponse.model_validate(service)


@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, request: ServiceUpdate, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Servis tidak ditemukan")

    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(service, field, value)

    db.commit()
    db.refresh(service)
    return ServiceResponse.model_validate(service)


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Servis tidak ditemukan")
    db.delete(service)
    db.commit()
