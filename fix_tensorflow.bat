@echo off
echo ============================================
echo Installing Compatible TensorFlow for Python 3.9
echo ============================================
echo.

echo Step 1: Removing incompatible TensorFlow versions...
pip uninstall tensorflow tensorflow-intel keras tensorboard -y

echo.
echo Step 2: Installing TensorFlow 2.15.1 (compatible with Python 3.9)...
pip install tensorflow==2.15.1

echo.
echo Step 3: Installing compatible numpy...
pip install "numpy<2.0.0"

echo.
echo Step 4: Testing installation...
python -c "import tensorflow as tf; print(f'SUCCESS! TensorFlow {tf.__version__} installed correctly')"

echo.
echo ============================================
echo Installation Complete!
echo ============================================
pause

