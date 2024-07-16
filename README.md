# Protein Stability Calculator

A React Native app with Expo for calculating protein stability scores based on input protein sequences and experimental conditions. The app allows users to input protein data, specify stability parameters, and obtain stability scores. The backend server, built with Node.js and Express, handles the processing and calculation of protein stability scores.

## Features

- **Mobile Data Input**: Enter protein sequences and experimental conditions directly from your mobile device.
- **Customizable Parameters**: Specify important parameters such as pH, temperature, and solvent for accurate stability calculations.
- **Real-Time Processing**: Interface with a backend server to process input data and return stability scores in real-time.
- **Download and Share Results**: Download calculated stability scores as a JSON file and share results easily.
- **User-Friendly Interface**: Intuitive and straightforward interface designed for mobile use.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Expo Go**: Install Expo Go on your mobile device from the app stores.

## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Protein-Stability-Calculator.git
    cd Protein-Stability-Calculator/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node server.js
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React Native app:
    ```bash
    expo start
    ```

4. Use the Expo Go app on your mobile device to scan the QR code and run the app.

## Directory Structure



## Usage

1. **Enter Protein Data**: Use the input fields to enter the protein sequence and experimental conditions such as pH, temperature, and solvent.
2. **Calculate Stability Score**: Click the "Calculate Stability" button to submit the data and start the calculation process.
3. **Download Results**: Once the calculation is complete, download the resulting JSON file containing the stability scores.

## API Endpoints

- **POST /api/calculate**: Endpoint to submit protein data and receive stability scores.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

- **Developed by**: fpiscani@stem-apks.com
- **React Native and Expo**: Built using React Native and Expo.

