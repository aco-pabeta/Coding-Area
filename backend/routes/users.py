from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import User, ActivityLog
from ..schemas import UserResponse, UserCreate, UserUpdate

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/", response_model=List[UserResponse])
def get_users(
    search: str = None,
    role: str = None,
    status_filter: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(User)
    if search:
        query = query.filter(
            (User.nama.contains(search)) |
            (User.username.contains(search)) |
            (User.email.contains(search))
        )
    if role:
        query = query.filter(User.role == role)
    if status_filter:
        query = query.filter(User.status == status_filter)
    return [UserResponse.model_validate(u) for u in query.all()]


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    return UserResponse.model_validate(user)


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(request: UserCreate, db: Session = Depends(get_db)):
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    existing = db.query(User).filter(
        (User.username == request.username) | (User.email == request.email)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username atau email sudah ada")

    user = User(
        nama=request.nama,
        username=request.username,
        email=request.email,
        no_hp=request.no_hp,
        password=pwd_context.hash(request.password),
        role=request.role,
        status=request.status
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserResponse.model_validate(user)


@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, request: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")

    if request.nama is not None:
        user.nama = request.nama
    if request.email is not None:
        user.email = request.email
    if request.no_hp is not None:
        user.no_hp = request.no_hp
    if request.role is not None:
        user.role = request.role
    if request.status is not None:
        user.status = request.status

    db.commit()
    db.refresh(user)
    return UserResponse.model_validate(user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    db.delete(user)
    db.commit()


@router.get("/{user_id}/logs", response_model=List[dict])
def get_user_logs(user_id: int, db: Session = Depends(get_db)):
    logs = db.query(ActivityLog).filter(ActivityLog.user_id == user_id).order_by(ActivityLog.timestamp.desc()).all()
    return [{"id": l.id, "action": l.action, "timestamp": l.timestamp} for l in logs]
