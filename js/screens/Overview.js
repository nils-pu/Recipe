import React, { Component } from 'react'
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'

import Firebase from './../Firebase'
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";

function StyledButton(props) {
  let button = null
  if (props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    )
  return button
}

export default class Overview extends Component {
  state = {
    index: 0,
    showNewReceptScreen: false,
    recipes: [],
    isLoading: true,
  };

  _retrieveData = async () => {
    let recipes = [];
    let query = await Firebase.db.collection("recipes").get();
    query.forEach((recipe) => {
      recipes.push({
        title: recipe.data().title,
        ingredient1: recipe.data().ingredient1,
        ingredient2: recipe.data().ingredient2,
        ingredient3: recipe.data().ingredient3,
        description: recipe.data().description,
        favorite: recipe.data().favorite,
        id: recipe.data().id,
      });
    });
    this.setState({ recipes, isLoading: false });
  };

  

  _saveReceptToDB = async (
    title,
    ingredient1,
    ingredient2,
    ingredient3,
    description,
    favorite,
    id,
    recipes
  ) => {
    const docRef = await Firebase.db.collection("recipes").add({
      title,
      ingredient1,
      ingredient2,
      ingredient3,
      description,
      favorite,
      id,
    });
    recipes[recipes.length - 1].id = docRef.id;
  };

  _addRecept = (
    title,
    ingredient1,
    ingredient2,
    ingredient3,
    description,
    favorite,
    id
  ) => {
    let { recipes } = this.state;
    if (title && description) {
      recipes.push({
        title,
        ingredient1,
        ingredient2,
        ingredient3,
        description,
        favorite,
        id,
      });
      this._saveReceptToDB(
        title,
        ingredient1,
        ingredient2,
        ingredient3,
        description,
        favorite,
        id,
        recipes
      );
    }
    this.setState({
      index: recipes.length - 1,
      showNewReceptScreen: false,
      recipes,
    });
  };

  _favorite = async () => {

    let query = await Firebase.db.collection("recipes").get();
    query.forEach((recipe) => {
      if (recipe.favorite) {
        Firebase.db.collection("recipes").doc(recipe).update({favorite: false});
      } else {
        Firebase.db.collection("recipes").doc(id).update({ favorite: true });
      }
    })
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      Firebase.init();
      this._retrieveData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <StyledButton
          style={styles.newButton}
          visible={true}
          title="Neu"
          onPress={() => this.setState({ showNewReceptScreen: true })}
        />
        <NewRecipe
          visible={this.state.showNewReceptScreen}
          onSave={this._addRecept}
          onRequestClose={() => this.setState({ showNewReceptScreen: false })}
        />
        <FlatList
          data={this.state.recipes}
          keyExtractor={(recipe) => recipe.id}
          renderItem={({ item }) => (
            <Recipe
              recipe={item}
              onPress={() =>
                this.props.navigation.navigate("ReceptScreen", {
                  recipe: item,
                })
              }
              onLike={this._favorite}
            />
          )}
          onRefresh={this._retrieveData}
          refreshing={this.state.isLoading}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>Keine Daten geladen</Text>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newButton: {
    position: 'absolute',
    right: 0,
    top: 30,
  },
})
