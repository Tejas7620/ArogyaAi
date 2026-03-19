@echo off
cd /d "%~dp0"
c:\python313\python.exe -m uvicorn app:app --port 8000 --reload
pause
