import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Icon from "@expo/vector-icons";


export default function Recipe(props) {
  const { recipe, onPress, onLike } = props;



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLike}>
        {recipe.favorite ? (
          <Icon.MaterialCommunityIcons
            name="heart"
            size={24}
            color="darkorange"
          />
        ) : (
          <Icon.MaterialCommunityIcons
            name="heart"
            size={24}
            color="grey"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.ingredient}>{recipe.ingredient1}</Text>
        <Text style={styles.ingredient}>{recipe.ingredient2}</Text>
        <Text style={styles.ingredient}>{recipe.ingredient3}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    marginBottom: 5
  
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    textAlign: "center",
  },
  ingredient: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
