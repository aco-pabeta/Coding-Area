from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

from .database import engine, Base
from .models import User
from .routes import auth, users, services, customers, spareparts, dashboard

app = FastAPI(
    title="LoopFix API",
    description="API untuk Manajemen Servis HP",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(services.router)
app.include_router(customers.router)
app.include_router(spareparts.router)
app.include_router(dashboard.router)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    _seed_default_admin()


def _seed_default_admin():
    from .database import SessionLocal
    from passlib.context import CryptContext

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            admin = User(
                nama="Super Admin",
                username="admin",
                email="admin@loopfix.com",
                password=pwd_context.hash("admin123"),
                role="superadmin",
                status="active"
            )
            db.add(admin)
            db.commit()
    finally:
        db.close()


@app.get("/api")
def api_root():
    return {"message": "LoopFix API - Manajemen Servis HP", "docs": "/docs"}
