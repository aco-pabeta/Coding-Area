from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Customer
from ..schemas import CustomerResponse, CustomerCreate

router = APIRouter(prefix="/api/customers", tags=["Customers"])


@router.get("/", response_model=List[CustomerResponse])
def get_customers(
    search: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Customer)
    if search:
        query = query.filter(
            (Customer.nama.contains(search)) |
            (Customer.no_hp.contains(search))
        )
    return [CustomerResponse.model_validate(c) for c in query.all()]


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Pelanggan tidak ditemukan")
    return CustomerResponse.model_validate(customer)


@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(request: CustomerCreate, db: Session = Depends(get_db)):
    existing = db.query(Customer).filter(
        (Customer.nama == request.nama) & (Customer.no_hp == request.no_hp)
    ).first()
    if existing:
        return CustomerResponse.model_validate(existing)

    customer = Customer(nama=request.nama, no_hp=request.no_hp)
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return CustomerResponse.model_validate(customer)


@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Pelanggan tidak ditemukan")
    db.delete(customer)
    db.commit()
