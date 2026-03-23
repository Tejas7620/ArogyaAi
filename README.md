# CareMaa 🌺

Your AI-powered Maternal & Child Health Companion. Designed to support mothers through every stage—from period tracking and pregnancy to post-natal care and immunizations.

## Core Features
*   **🌸 Period Tracker**: Log cycles and understand your body's patterns.
*   **🤰 Pregnancy Monitor**: Week-by-week guidance and milestone tracking.
*   **🩺 AI Risk Tracker**: Assess maternal risk levels based on health vitals using machine learning models.
*   **💉 Vaccination Schedule**: Automated timelines and reminders for mother and child.
*   **🥗 Nutrition Planner**: Custom meal plans built around Indian diets and trimesters.
*   **👩‍⚕️ Community**: Connect with healthcare workers, mothers, and verified experts.

## Technology Stack
*   **Frontend**: React.js v18, React Router v6, Custom CSS
*   **ML Service**: Python 3.14 compatible, FastAPI, Numpy, Scikit-learn, Uvicorn

## Local Setup Instructions

### 1. Launch the ML Service (Backend)
Navigate into the ML directory and install dependencies:
```bash
cd ml-service
python -m venv .venv
# Activate virtual environment (Windows):
.venv\Scripts\activate
# Install requirements:
pip install -r requirements.txt
# Start the FastAPI server:
python -m uvicorn app:app --reload
```
*The API will be available at `http://localhost:8000`.*

### 2. Launch the Web Client (Frontend)
In a separate terminal, navigate into the frontend directory:
```bash
cd frontend
# Install React dependencies
npm install
# Start the development server
npm start
```
*The Web App will automatically open at `http://localhost:3001`.*

## License
© 2025 CareMaa
