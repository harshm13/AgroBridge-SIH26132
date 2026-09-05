from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import predictions, chatbot, grading, pooling

# Import database components
from db.database import engine, Base

# Automatically create the SQLite database tables when the server starts
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgroBridge API",
    description="Backend for the SIH26132 Market Linkages Platform"
)

# Configure CORS so the React frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- Change this list to just ["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register your API endpoints
app.include_router(predictions.router)
app.include_router(chatbot.router)
app.include_router(grading.router)
app.include_router(pooling.router)

# A simple root endpoint to verify the server is running
@app.get("/")
def read_root():
    return {"message": "AgroBridge Backend is running perfectly!"}
