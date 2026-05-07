from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import os

# Load trained model
model = load_model("plant_disease_model.keras")

# Class names
class_names = os.listdir("dataset/PlantVillage/train")

def predict_disease(img_path):

    img = Image.open(img_path)

    img = img.resize((128, 128))

    img_array = image.img_to_array(img)

    img_array = img_array / 255.0

    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    predicted_class = np.argmax(prediction)

    confidence = np.max(prediction) * 100

    return class_names[predicted_class], confidence