from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_risk
import joblib
import pandas as pd

app = FastAPI(title="Maternal Risk AI API")

# ✅ Enable CORS (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for hackathon (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model once
model = joblib.load("model/maternal_risk_model.pkl")


# ✅ Request schema
class HealthData(BaseModel):
    age: float
    systolic_bp: float
    diastolic_bp: float
    blood_sugar: float
    body_temp: float
    heart_rate: float


# ✅ Root endpoint
@app.get("/")
def root():
    return {"message": "Maternal Risk AI API Running 🚀"}


# ✅ Prediction endpoint
@app.post("/predict")
def predict_endpoint(data: HealthData):
    try:
        # Convert to DataFrame
        features = pd.DataFrame([{
            "Age": data.age,
            "SystolicBP": data.systolic_bp,
            "DiastolicBP": data.diastolic_bp,
            "BS": data.blood_sugar,
            "BodyTemp": data.body_temp,
            "HeartRate": data.heart_rate
        }])

        # Prediction
        prediction = model.predict(features)[0]

        # Confidence
        try:
            prob = model.predict_proba(features)[0]
            confidence = float(max(prob))
        except:
            confidence = None

        return {
            "status": "success",
            "risk_level": str(prediction),
            "confidence": confidence
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# ✅ Health check
@app.get("/health")
def health():
    return {"status": "healthy"}