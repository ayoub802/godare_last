import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import React, {useState, useEffect} from 'react';
import { HeaderEarth } from '../../components/Header';
import PhoneInput from 'react-native-phone-number-input';
import {useTranslation} from 'react-i18next';
import axiosInstance from '../../axiosInstance';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditAdressScreen = (props) => {

    const id = props.route.params;

    const {t, i18n} = useTranslation();

    const [Adresse, setAdresse] = useState(id.adresse);
    const [Pays, setPays] = useState('');
    const [Ville, setVille] = useState(id.ville);
    const [CodePostal, setCodePostal] = useState(id.codePostal);
    const [AdresseLibelle, setAdresseLibelle] = useState(id.libelle);
    const [AdresseNom, setAdresseNom] = useState(id.nom);
    const [AdresseTelephone, setAdresseTelephone] = useState(id.telephone);
    const [AdressePays, setAdressePays] = useState(id.pays);
    const email = id.client.email;

    async function UpdateNewAddress(){
  
        if (Adresse === '' || Ville === '')
        {

  
          ToastAndroid.show("La ville et l'adresse sont obligatoires !",ToastAndroid.SHORT)
  
          console.log("La ville et l'adresse sont obligatoires !");
    
          return;
        }
    
        if ( AdressePays === '')
        {

          console.log("Le pays est obligatoire");
          ToastAndroid.show("Le pays est obligatoire",ToastAndroid.SHORT)
          return;
        }

    

       
        // axiosInstance.put('/adresses/' + identity, {
        //   libelle: AdresseLibelle,
        //   nom: AdresseNom,
        //   telephone: AdresseTelephone,
        //   pays:  AdressePays ,
        //   ville: Ville,
        //   codePostal: CodePostal, 
        //   adresse: Adresse, 
        //   client: email
        // })
        // .then(function (response) {
        //   console.log('adresse add ', response.data)
        //   ToastAndroid.show("Adresse Modifié",ToastAndroid.SHORT)
    
        //   console.log("Adresse Modifié");
        //   props.navigation.navigate('AdresseScreen');
        // })
        // .catch(function (error) {
        //     if (error.response) {
        //         console.error('Server responded with an error:', error.response.data);
        //         console.error('Status code:', error.response.status);
        //         console.error('Headers:', error.response.headers);
        //       } else if (error.request) {
        //         console.error('No response received from the server');
        //       } else {
        //         console.error('Error setting up the request:', error.message);
        //       }
        // });
        await fetch("https://godaregroup.com/api/adresses/" + id.id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            libelle: AdresseLibelle,
            nom: AdresseNom,
            telephone: AdresseTelephone,
            pays: AdressePays,
            ville: Ville,
            codePostal: CodePostal, 
            adresse: Adresse, 
            client: email
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(JSON.stringify(responseData));
            ToastAndroid.show("Adresse Updated",ToastAndroid.SHORT)
            console.log("Data Updated");
            props.navigation.navigate('AdresseScreen');
          })
          .catch((err) => console.log('Error:', err))
          .finally();
      };
    console.log("Edit Adress:",id);
  return (
    <View>
      <HeaderEarth />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1,marginBottom: 150}}>
              <View style={{marginTop: 30, marginBottom: 12}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 16,
                        color: '#000',
                        textAlign: 'center',
                      }}>
                      Veuillez créer un address
                    </Text>
                  </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder={t('Pays')}
                        value={AdressePays}
                        style={{
                          borderWidth: 1,
                          borderColor: '#AAB0B7',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: '#000',
                          paddingLeft: 15,
                          borderRadius: 8,
                          backgroundColor: '#fff',
                        }}
                        placeholderTextColor="#B0B0C3"
                        keyboardType="ascii-capable"
                        keyboardAppearance={'default'}
                        onChangeText={newText => setAdressePays(newText)}
                      />
                    </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={t('Libellé')}
                    value={AdresseLibelle}
                    style={{
                        borderWidth: 1,
                        borderColor: '#AAB0B7',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                        paddingLeft: 15,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                      }}
                    placeholderTextColor="#B0B0C3"
                    keyboardType="ascii-capable"
                    keyboardAppearance={'default'}
                    onChangeText={newText => setAdresseLibelle(newText)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={t('Prénom Nom')}
                    value={AdresseNom}
                    style={{
                        borderWidth: 1,
                        borderColor: '#AAB0B7',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                        paddingLeft: 15,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                      }}
                    placeholderTextColor="#B0B0C3"
                    keyboardType="ascii-capable"
                    keyboardAppearance={'default'}
                    onChangeText={newText => setAdresseNom(newText)}
                  />
                </View>

                <View style={styles.inputContainer}>
                <PhoneInput
                    defaultValue={AdresseTelephone}
                    defaultCode="FR"
                    layout="first"
                    placeholder={t('Téléphone')}
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: '#AAB0B7',
                      flexDirection: 'row',
                      borderRadius: 8,
                      alignItems: 'center',
                      color: '#000',
                      backgroundColor: '#fff',
                      height: 55
                    }}
                    textContainerStyle={{
                      backgroundColor: 'transparent',
                      padding: 0,
                      color: '#000',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                    }}
                    countryPickerButtonStyle={styles.countryPickerButtonStyle}
                    textInputProps={{placeholderTextColor: '#BCB8B1'}}
                    textInputStyle={
                      {
                      height: 50,
                      paddingLeft: 16,
                      borderColor: '#AAB0B7',
                      color: '#000',
                      borderRadius: 8,
                      backgroundColor: '#fff',
                    }}
                    flagButtonStyle={{
                      backgroundColor: '#fff',
                    }}
                    value={AdresseTelephone}
                    onChangeFormattedText={text => {
                      setAdresseTelephone(text);
                    }}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={t('Code postal')}
                    value={CodePostal}
                    style={{
                        borderWidth: 1,
                        borderColor: '#AAB0B7',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                        paddingLeft: 15,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                      }}
                    placeholderTextColor="#B0B0C3"
                    keyboardType="ascii-capable"
                    keyboardAppearance={'default'}
                    onChangeText={newText => setCodePostal(newText)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={t('Ville *')}
                    value={Ville}
                    style={{
                        borderWidth: 1,
                        borderColor: '#AAB0B7',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                        paddingLeft: 15,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                      }}
                    placeholderTextColor="#B0B0C3"
                    keyboardType="ascii-capable"
                    keyboardAppearance={'default'}
                    onChangeText={newText => setVille(newText)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={t('Adresse *')}
                    value={Adresse}
                    style={{
                        borderWidth: 1,
                        borderColor: '#AAB0B7',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                        paddingLeft: 15,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                      }}
                    placeholderTextColor="#B0B0C3"
                    keyboardType="ascii-capable"
                    keyboardAppearance={'default'}
                    onChangeText={newText => setAdresse(newText)}
                  />
                </View>

                <View style={{marginTop: 50, flex: 1, justifyContent: "center", alignItems: "center",}}>
                    {/* <Button title={t("Ajouter l'adresse")} onPress={AddNewAddress}/> */}
                    <TouchableOpacity style={{ paddingVertical: 8 ,paddingHorizontal: 22,flexDirection: "row", alignItems: "center",justifyContent: "center", backgroundColor: "#4E8FDA", borderRadius: 25}} onPress={UpdateNewAddress}>
                      <Text style={{fontFamily:"Poppins-Medium", fontSize: 12, color:"#fff"}}>Modifier Address</Text>
                    </TouchableOpacity>
                </View>

        </View>

      </ScrollView>

      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    ProviderStyle: {},
    containerStyle: {
      flex: 1,
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      marginTop: 20,
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    ButtonContainer: {
      width: '80%',
      height: 50,
      borderRadius: 8,
      backgroundColor: '#F7F7F7',
      marginTop: windowHeight * 0.02,
      alignSelf: 'center',
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    ButtonText: {
      // marginLeft: '5%',
      width: '78%',
      color: '#042C5C',
      fontSize: 15,
      fontFamily: 'Roboto-Regular',
    },
    dropContainerStyle: {
      justifyContent: 'center',
      // backgroundColor: 'tomato',
      width: windowWidth * 0.9,
      // borderRadius:0
      alignSelf: 'center',
      marginTop: windowHeight * 0.02,
      marginBottom: windowHeight * 0.01,
    },
  
    dropdown: {
      height: 50,
      borderRadius: 7,
      paddingHorizontal: 17,
      backgroundColor: 'rgba(173, 173, 173, 0.2)',
      // elevation: 1,
      width: windowWidth * 0.8,
      alignSelf: 'center',
    },
    placeholderStyle: {
      fontSize: 14,
      fontFamily: 'Roboto-Regular',
      color: '#14213D',
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
      color: '#14213D',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    containerrrrStyle: {
      marginTop: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      maxHeight: 100,
      elevation: 10,
    },
    inputContainer: {
      width: windowWidth * 0.8,
      backgroundColor: 'rgba(173, 173, 173, 0.2)',
      alignSelf: 'center',
      borderRadius: 6,
      marginTop: '3%',
    },
    inputPaysContainer: {
      width: windowWidth * 0.8,
      alignSelf: 'center',
      borderRadius: 6,
      marginTop: '3%',
    },
    inputStyled: {
      width: windowWidth * 0.75,
      marginLeft: windowWidth * 0.03,
      color: '#000',
      fontFamily: 'Roboto-Regular',
    },
    phoneContainer: {
      width: windowWidth * 0.7,
      height: 50,
      backgroundColor: '#fff',
      elevation: 0,
    },
    textInput: {
      paddingVertical: 0,
      // backgroundColor: 'gold',
      width: windowWidth * 0.6,
      backgroundColor: '#fff',
      fontFamily: 'Roboto-Regular',
      color: '#000',
    },
    codeTextStyle: {
      fontFamily: 'Roboto-Regular',
      fontSize: 15,
      width: 'auto',
    },
    countryPickerButtonStyle: {
      width: 70,
    },
    textInputStyle: {
      fontFamily: 'Roboto-Regular',
      color: '#000',
    },
  });


export default EditAdressScreen 