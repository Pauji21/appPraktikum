import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet, SafeAreaView, Alert, ImageBackground } from 'react-native';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  const collections = [
    {
      id: '1',
      name: 'Haruka Sakura',
      items: '13K',
      owners: '100K',
      imageUrl: 'https://i.pinimg.com/564x/78/16/66/781666f43370fb3fa0ef251a97ac2052.jpg',
      backgroundUrl: 'https://i.pinimg.com/736x/7a/ec/a8/7aeca8ec1799a87f06a5653ab082b5e5.jpg'
    },
    {
      id: '2',
      name: 'Akihiko Urui',
      items: '12K',
      owners: '5.34K',
      imageUrl: 'https://i.pinimg.com/736x/1b/d2/61/1bd261a0605a4e9a6afb90c9743bb283.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/6a/1f/e6/6a1fe6749ffa835579e9a2b80e9b0a26.jpg'
    },
    {
      id: '3',
      name: 'Kyotaro Sugishita',
      items: '10K',
      owners: '6.37K',
      imageUrl: 'https://i.pinimg.com/564x/d6/e8/9d/d6e89df25c2f33002f88a92b6ffe9356.jpg',
      backgroundUrl: 'https://i.pinimg.com/564x/18/eb/ec/18ebec7e8a059d2f0c4630f6d6994eb5.jpg'
    },
    {
      id: '4',
      name: 'Togamee chan',
      items: '10K',
      owners: '6.37K',
      imageUrl: 'https://i.pinimg.com/474x/7e/27/66/7e27664d44b4ed24bf59b277c2c448d6.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/74/93/0c/74930ce6adadbc597e43c189cd8b55a1.jpg'
    },
    {
      id: '5',
      name: 'Shota Fujiwara',
      items: '10K',
      owners: '6.37K',
      imageUrl: 'https://i.pinimg.com/736x/1a/5c/df/1a5cdfd3cd41fc32e1619e5fe6abf4ea.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/a0/86/d9/a086d97767d30f8bde391a49b6f6b1af.jpg'
    },
    {
      id: '6',
      name: 'Hajime Umemiya',
      items: '10K',
      owners: '6.37K',
      imageUrl: 'https://i.pinimg.com/736x/2b/cc/0e/2bcc0e7e3b647538aa57779eca487f6b.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/b8/9f/59/b89f592bcf1630f35ce0419acd1faa1d.jpg'
    },
    {
      id: '7',
      name: 'Touma Hiiragi',
      items: '10K',
      owners: '6.37K',
      imageUrl: 'https://i.pinimg.com/736x/b9/a5/e3/b9a5e37e6a46e739aeba3a24344f3aad.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/85/82/1b/85821b902032d3618913287156b55d98.jpg'
    },
    {
      id: '8',
      name: 'Choji Tomiyama',
      items: '10K',
      owners: '6.37K',
      imageUrl: 'https://i.pinimg.com/564x/7e/fa/5a/7efa5a7eed59eb95b86661134b3b0422.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/ba/38/e0/ba38e08839ba8e53c328db7e7400c98d.jpg'
    },
    {
      id: '9',
      name: 'Mitsuki Kiryuuu',
      items: '20K',
      owners: '7.76K',
      imageUrl: 'https://i.pinimg.com/236x/63/73/26/637326e0cbeb31e5325cc40f1ec4b503.jpg',
      backgroundUrl: 'https://i.pinimg.com/236x/a6/82/9d/a6829d95d73de7c73661a2740f81046c.jpg'
    },
    {
      id: '10',
      name: 'Kaji Ren',
      items: '3K',
      owners: '5.55K',
      imageUrl: 'https://i.pinimg.com/236x/0a/90/71/0a907175ec813a76218610981105a9af.jpg',
      backgroundUrl: 'https://i.pinimg.com/474x/f3/6b/de/f36bde1078a1ebcfb95dbc9b17dbfdee.jpg'
    }
  ];

  useEffect(() => {
    setFilteredCollections(
      collections.filter(collection =>
        collection.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);


  useEffect(() => {
    const counts = {};
    collections.forEach(collection => {
      counts[collection.id] = 0;
    });
    setItemCounts(counts);
  }, []);


  const handleIncrement = id => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1
    }));
  };

  const handleDecrement = id => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search characters"
        />
        <Text style={styles.header}>Character Wind Bracker</Text>
        <FlatList
          data={filteredCollections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ImageBackground source={{ uri: item.backgroundUrl }} style={styles.itemContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Items: {item.items}</Text>
                <Text style={styles.details}>Owners: {item.owners}</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity style={styles.counterButton} onPress={() => handleDecrement(item.id)}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{itemCounts[item.id]}</Text>
                  <TouchableOpacity style={styles.counterButton} onPress={() => handleIncrement(item.id)}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          )}
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Husbunya Ganteng Yaa wkwkw')}>
        <Text style={styles.buttonText}>Di Pilih Mas Brooo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/7c/33/40/7c334023692f33730359eb739d5e8066.jpg' }}
        style={styles.backgroundImage}
      />
      <Text style={styles.headerTitle}>PAUJI</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  headerContainer: {
    height: 300,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.8
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
  button: {
    borderWidth: 5,
    borderColor: 'green',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  counterButton: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  counterButton: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default App;
