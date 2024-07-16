import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const DATA_FILE = FileSystem.documentDirectory + "protein_stability_data.json";

export default function App() {
  const [sequence, setSequence] = useState("");
  const [pH, setPH] = useState("");
  const [temperature, setTemperature] = useState("");
  const [solvent, setSolvent] = useState("");
  const [uniprotId, setUniprotId] = useState("");
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(DATA_FILE);
        if (fileInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(DATA_FILE);
          setSavedData(JSON.parse(fileContents));
        }
      } catch (error) {
        console.error("Error loading saved data", error);
      }
    };

    loadSavedData();
  }, []);

  const fetchSequence = async () => {
    if (!uniprotId) {
      Alert.alert("Error", "Please enter a valid UniProt ID");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.uniprot.org/uniprot/${uniprotId}.fasta`
      );
      if (response.status === 200) {
        const fasta = response.data;
        const lines = fasta.split("\n");
        const proteinSequence = lines
          .filter((line) => !line.startsWith(">"))
          .join("")
          .replace(/[^A-Za-z]/g, "");
        setSequence(proteinSequence);
      } else {
        Alert.alert(
          "Error",
          "Failed to fetch sequence. Please check the UniProt ID and try again."
        );
      }
    } catch (error) {
      console.error("Error fetching sequence", error);
      Alert.alert("Error", "Failed to fetch sequence from UniProt");
    }
  };

  const saveData = async () => {
    const data = {
      sequence,
      pH,
      temperature,
      solvent,
    };

    try {
      const fileInfo = await FileSystem.getInfoAsync(DATA_FILE);
      let existingData = [];

      if (fileInfo.exists) {
        const fileContents = await FileSystem.readAsStringAsync(DATA_FILE);
        existingData = JSON.parse(fileContents);
      }

      existingData.push(data);

      await FileSystem.writeAsStringAsync(
        DATA_FILE,
        JSON.stringify(existingData, null, 2)
      );
      Alert.alert("Success", "Data saved successfully");

      // Update saved data state to reflect new entry
      setSavedData(existingData);
    } catch (error) {
      console.error("Error saving data", error);
      Alert.alert("Error", "Failed to save data");
    }

    setSequence("");
    setPH("");
    setTemperature("");
    setSolvent("");
    setUniprotId("");
  };

  const downloadData = async () => {
    try {
      const fileContents = JSON.stringify(savedData, null, 2);
      const fileUri =
        FileSystem.documentDirectory + "protein_stability_data_download.json";
      await FileSystem.writeAsStringAsync(fileUri, fileContents, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      Alert.alert("Success", `Data downloaded to ${fileUri}`);
    } catch (error) {
      console.error("Error downloading data", error);
      Alert.alert("Error", "Failed to download data");
    }
  };

  const shareData = async () => {
    try {
      const fileUri =
        FileSystem.documentDirectory + "protein_stability_data_download.json";
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Error", "File not found. Please download the data first.");
      }
    } catch (error) {
      console.error("Error sharing data", error);
      Alert.alert("Error", "Failed to share data");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="UniProt ID"
        value={uniprotId}
        onChangeText={setUniprotId}
      />
      <Button title="Fetch Sequence" onPress={fetchSequence} />
      <Text>Protein Sequence:</Text>
      <TextInput
        style={styles.input}
        placeholder="Protein Sequence"
        value={sequence}
        onChangeText={setSequence}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="pH"
        value={pH}
        onChangeText={setPH}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature (°C)"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Solvent"
        value={solvent}
        onChangeText={setSolvent}
      />
      <Button title="Submit" onPress={saveData} />

      <Text style={styles.header}>Saved Data:</Text>
      {savedData.map((entry, index) => (
        <View key={index} style={styles.entry}>
          <Text>Sequence: {entry.sequence}</Text>
          <Text>pH: {entry.pH}</Text>
          <Text>Temperature: {entry.temperature}°C</Text>
          <Text>Solvent: {entry.solvent}</Text>
        </View>
      ))}

      <Button title="Download Data as JSON" onPress={downloadData} />
      <Button title="Share Data" onPress={shareData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  entry: {
    marginBottom: 12,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});
