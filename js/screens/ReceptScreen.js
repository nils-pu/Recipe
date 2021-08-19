import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Button, Alert } from "react-native";
import Recipe from "../components/Recipe";
import Firebase from "./../Firebase";
import EditRecipe from "../components/EditRecipe";

function StyledButton(props) {
  let button = null;
  if (props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    );
  return button;
}

export default function FriendScreen({ route, navigation }) {
  const recipe = route.params?.recipe;

    const [showNewReceptScreen, setShowNewReceptScreen] = useState(false);


  const _removeReceptFromDB = (id) => {
    Alert.alert(
      "Zitat löschen?",
      "Dies kann nicht rückgängig gemacht werden.",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => {
            Firebase.db.collection("recipes").doc(id).delete().then(() => {
            navigation.navigate("Overview");
            })
          },
        },
      ]
    );
  };

  const _updateReceptFromDB = (id, recipe) => {
    Firebase.db.collection("recipes").doc(id).update({ recipe });
    setShowNewReceptScreen(false);
  };

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <Recipe recipe={recipe} />
        <View style={styles.buttonRow}>
          <Button
            title="Löschen"
            onPress={() => {
              _removeReceptFromDB(recipe.id);
            }}
          />
          <StyledButton
            visible={true}
            title="Bearbeiten"
            onPress={() => setShowNewReceptScreen(true)}
          />
          <EditRecipe
            visible={showNewReceptScreen}
            onSave={() => _updateReceptFromDB(recipe.id, recipe)}
            onRequestClose={() => setShowNewRecepteScreen(false)}
            recipe={recipe}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  buttonRow: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
