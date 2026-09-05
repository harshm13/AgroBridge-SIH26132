import pandas as pd
import pickle
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, 'crop_prices.csv')

print("Loading data from CSV...")
# Read CSV, skipping the government title row
df = pd.read_csv(csv_path, header=1)

# Clean the Modal Price (remove commas and convert to float)
df['Modal Price'] = df['Modal Price'].astype(str).str.replace(',', '').astype(float)

# Standardize column names (replaces spaces with underscores)
df.columns = df.columns.str.strip().str.replace(' ', '_')

# Drop empty rows
df = df.dropna(subset=['Commodity', 'Arrival_Date', 'Modal_Price'])

# Convert the Date to a Month number (1-12)
df['Arrival_Date'] = pd.to_datetime(df['Arrival_Date'], format='%d-%m-%Y', errors='coerce')
df['Month'] = df['Arrival_Date'].dt.month
df = df.dropna(subset=['Month'])

# Clean Commodity names (e.g., "Onion" -> "onion")
df['Commodity'] = df['Commodity'].astype(str).str.lower().str.strip()

# Encode Categories into numbers
le_crop = LabelEncoder()
df['crop_encoded'] = le_crop.fit_transform(df['Commodity'])

# Define Features (X) and Target (y)
X = df[['crop_encoded', 'Month']]
y = df['Modal_Price']

print("Training the Machine Learning model...")
model = RandomForestRegressor(n_estimators=50, random_state=42)
model.fit(X, y)

# Save the Model
model_path = os.path.join(current_dir, 'model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump({'model': model, 'encoder': le_crop}, f)

print(f"Success! Model trained on {len(df)} rows and saved to {model_path}")