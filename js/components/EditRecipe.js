import React, { useState } from 'react'
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native'

export default function EditRecipe(props) {
  const { visible, onSave, recipe } = props;
  const [title, setTitle] = useState(recipe.title);
  const [ingredient1, setIngredient1] = useState(recipe.ingredient1);
  const [ingredient2, setIngredient2] = useState(recipe.ingredient2);
  const [ingredient3, setIngredient3] = useState(recipe.ingredient3);
  const [description, setDescription] = useState(recipe.description);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setTitle(null);
        setIngredient1(null);
        setIngredient2(null);
        setIngredient3(null);
        setDescription(null);
        onSave(null, null);
      }}
      animationType="slide"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          underlineColorAndroid="transparent"
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingredient 1"
          underlineColorAndroid="transparent"
          onChangeText={setIngredient1}
          value={ingredient1}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingredient 2"
          underlineColorAndroid="transparent"
          onChangeText={setIngredient2}
          value={ingredient2}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingredient 3"
          underlineColorAndroid="transparent"
          onChangeText={setIngredient3}
          value={ingredient3}
        />
        <TextInput
          style={styles.input}
          style={[styles.input, { height: 150 }]}
          multiline={true}
          placeholder="Description"
          underlineColorAndroid="transparent"
          onChangeText={setDescription}
          value={description}
        />
        <View style={styles.buttonRow}>
          <Button
            title="Speichern"
            onPress={() => {
              setTitle(null);
              setIngredient1(null);
              setIngredient2(null);
              setIngredient3(null);
              setDescription(null);
              onSave(title, ingredient1, ingredient2, ingredient3, description);
            }}
          />
          <Button
            title="Abbrechen"
            onPress={() => {
              setTitle(null);
              setIngredient1(null);
              setIngredient2(null);
              setIngredient3(null);
              setDescription(null);
              onSave(null, null);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'deepskyblue',
    borderRadius: 4,
    width: '80%',
    marginBottom: 20,
    fontSize: 20,
    padding: 10,
    height: 50,
  },
  buttonRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
