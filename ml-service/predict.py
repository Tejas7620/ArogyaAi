import joblib
import pandas as pd

# Load model
model = joblib.load("model/maternal_risk_model.pkl")

def predict_risk(age, systolic_bp, diastolic_bp, blood_sugar, body_temp, heart_rate):

    # Create DataFrame (important for correct prediction)
    features = pd.DataFrame([{
        "Age": age,
        "SystolicBP": systolic_bp,
        "DiastolicBP": diastolic_bp,
        "BS": blood_sugar,
        "BodyTemp": body_temp,
        "HeartRate": heart_rate
    }])

    prediction = model.predict(features)[0]

    # Get probability (confidence)
    try:
        probabilities = model.predict_proba(features)[0]
        confidence = max(probabilities)
    except:
        confidence = "Not available"

    return {
        "risk_level": str(prediction),
        "confidence": confidence
    }


# 🔥 MULTIPLE TESTING
if __name__ == "__main__":

    test_cases = [
        (25, 120, 80, 90, 98.6, 72),     # Normal
        (35, 140, 90, 150, 99.5, 85),    # Moderate risk
        (50, 160, 100, 200, 101.0, 95),  # High risk
        (20, 110, 70, 75, 98.0, 65),     # Very healthy
        (45, 150, 95, 180, 100.5, 90)    # Critical
    ]

    print("\n🔍 MODEL TEST RESULTS:\n")

    for i, case in enumerate(test_cases, 1):
        result = predict_risk(*case)
        print(f"Test Case {i}:")
        print(f"Input: Age={case[0]}, BP={case[1]}/{case[2]}, Sugar={case[3]}, Temp={case[4]}, HR={case[5]}")
        print(f"Output: {result}")
        print("-" * 50)