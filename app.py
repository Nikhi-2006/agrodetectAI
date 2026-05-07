import streamlit as st
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import os

# Load trained model
model = load_model("plant_disease_model.keras")

# Class names from training folders
class_names = os.listdir("dataset/PlantVillage/train")

# Streamlit page title
st.title("🌿 Plant Disease Detection System")

st.write("Upload a plant leaf image to detect disease.")

# Upload image
uploaded_file = st.file_uploader(
    "Choose an image...",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file is not None:

    # Open image
    img = Image.open(uploaded_file)

    # Display image
    st.image(img, caption="Uploaded Image", use_column_width=True)

    # Resize image
    img = img.resize((128, 128))

    # Convert image to array
    img_array = image.img_to_array(img)

    # Normalize image
    img_array = img_array / 255.0

    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)

    # Prediction
    prediction = model.predict(img_array)

    predicted_class = np.argmax(prediction)

    confidence = np.max(prediction) * 100

    # Show prediction
    st.success(f"Prediction: {class_names[predicted_class]}")

    # Show confidence
    st.info(f"Confidence: {confidence:.2f}%")