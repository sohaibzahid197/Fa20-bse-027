import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FooterItem } from './Components';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [pdfBooks, setPdfBooks] = useState([]);
  const [unicodeBooks, setUnicodeBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch book data from an API
  useEffect(() => {
    const apiUrl = 'http://139.59.177.72/api/books?page=1';

    axios.get(apiUrl)
      .then(response => {
        const bookData = response.data.data;
        // Filter books into PDF and UNICODE categories
        const pdfBooks = bookData.filter(book => book.bookType === 'PDF');
        const unicodeBooks = bookData.filter(book => book.bookType === 'UNICODE');
        setPdfBooks(pdfBooks);
        setUnicodeBooks(unicodeBooks);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Footer items
  const footerItems = [
    { iconName: 'home', text: 'Home' },
    { iconName: 'library-books', text: 'Audio Books' },
    { iconName: 'settings', text: 'Settings' },
    { iconName: 'search', text: 'Search' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Featured Books</Text>
        <MaterialIcons name="message" size={24} color="blue" style={styles.messageIcon} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for books..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
      </View>

      {/* PDF Books List */}
      <Text style={styles.subHeaderText}>PDF Books</Text>
      <FlatList
        data={pdfBooks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Navigate to the chapter list screen here
              navigation.navigate('ChapterList', { bookId: item._id });
            }}
          >
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemAuthor}>Author: {item.author.name}</Text>
              <Text style={styles.itemDescription}>Description: {item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* UNICODE Books List */}
      <Text style={styles.subHeaderText}>Searched Books</Text>
      <FlatList
        data={unicodeBooks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Navigate to the chapter list screen here
              navigation.navigate('ChapterList', { bookId: item._id });
            }}
          >
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemAuthor}>Author: {item.author.name}</Text>
              <Text style={styles.itemDescription}>Description: {item.description}</Text>
            </View>

          </TouchableOpacity>
        )}
      />
            {/* Footer */}
            <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.footerIcon}>
            <MaterialIcons name="home" size={24} color="blue" />
          </View>
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.footerIcon}>
            <MaterialIcons name="library-books" size={24} color="blue" />
          </View>
          <Text style={styles.footerText}>Audio Books</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.footerIcon}>
            <MaterialIcons name="settings" size={24} color="blue" />
          </View>
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.footerIcon}>
            <MaterialIcons name="search" size={24} color="blue" />
          </View>
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function ChapterListScreen({ route }) {
  // Use route.params.bookId to fetch chapter list for the selected book
  const bookId = route.params.bookId;
  // Fetch and display chapter list

  return (
    <View style={styles.container}>
      {/* Display chapter list for the selected book */}
      <Text>Chapter List for Book ID: {bookId}</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChapterList" component={ChapterListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  messageIcon: {
    marginLeft: 'auto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  item: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemAuthor: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  itemDescription: {
    fontSize: 14,
    color: '#999',
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default App;
