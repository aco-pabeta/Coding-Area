from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Sparepart
from ..schemas import SparepartResponse, SparepartCreate, SparepartUpdate

router = APIRouter(prefix="/api/spareparts", tags=["Spareparts"])


@router.get("/", response_model=List[SparepartResponse])
def get_spareparts(
    search: str = None,
    kategori: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Sparepart)
    if search:
        query = query.filter(
            (Sparepart.nama.contains(search)) |
            (Sparepart.sku.contains(search))
        )
    if kategori:
        query = query.filter(Sparepart.kategori == kategori)
    return [SparepartResponse.model_validate(s) for s in query.all()]


@router.get("/{sparepart_id}", response_model=SparepartResponse)
def get_sparepart(sparepart_id: int, db: Session = Depends(get_db)):
    sparepart = db.query(Sparepart).filter(Sparepart.id == sparepart_id).first()
    if not sparepart:
        raise HTTPException(status_code=404, detail="Sparepart tidak ditemukan")
    return SparepartResponse.model_validate(sparepart)


@router.post("/", response_model=SparepartResponse, status_code=status.HTTP_201_CREATED)
def create_sparepart(request: SparepartCreate, db: Session = Depends(get_db)):
    existing = db.query(Sparepart).filter(Sparepart.sku == request.sku).first()
    if existing:
        raise HTTPException(status_code=400, detail="SKU sudah digunakan")

    sparepart = Sparepart(
        nama=request.nama,
        sku=request.sku,
        stok=request.stok,
        harga=request.harga,
        kategori=request.kategori
    )
    db.add(sparepart)
    db.commit()
    db.refresh(sparepart)
    return SparepartResponse.model_validate(sparepart)


@router.put("/{sparepart_id}", response_model=SparepartResponse)
def update_sparepart(sparepart_id: int, request: SparepartUpdate, db: Session = Depends(get_db)):
    sparepart = db.query(Sparepart).filter(Sparepart.id == sparepart_id).first()
    if not sparepart:
        raise HTTPException(status_code=404, detail="Sparepart tidak ditemukan")

    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(sparepart, field, value)

    db.commit()
    db.refresh(sparepart)
    return SparepartResponse.model_validate(sparepart)


@router.delete("/{sparepart_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sparepart(sparepart_id: int, db: Session = Depends(get_db)):
    sparepart = db.query(Sparepart).filter(Sparepart.id == sparepart_id).first()
    if not sparepart:
        raise HTTPException(status_code=404, detail="Sparepart tidak ditemukan")
    db.delete(sparepart)
    db.commit()
