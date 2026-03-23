import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

data = pd.read_csv("dataset/maternal_health.csv")

# Correct column names
X = data[[
    "Age",
    "SystolicBP",
    "DiastolicBP",
    "BS",
    "BodyTemp",
    "HeartRate"
]]

y = data["RiskLevel"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100)

model.fit(X_train, y_train)

pred = model.predict(X_test)

joblib.dump(model, "model/maternal_risk_model.pkl")
print("Model saved successfully!")

accuracy = accuracy_score(y_test, pred)

print("Accuracy:", accuracy)

joblib.dump(model, "model/maternal_risk_model.pkl")