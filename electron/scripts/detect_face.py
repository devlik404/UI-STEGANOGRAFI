import sys
import cv2
import face_recognition

image_path = sys.argv[1]  # Ambil path gambar dari Electron
image = cv2.imread(image_path)

# Konversi ke RGB
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Deteksi wajah
face_locations = face_recognition.face_locations(rgb_image)

if face_locations:
    print("Wajah terdeteksi!")
else:
    print("Tidak ada wajah yang terdeteksi.")
