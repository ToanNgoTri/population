import React, {useState, useRef, useEffect,useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import population from '../asset/population.json';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Population() {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');

  const [searchRearch, setSearchRearch] = useState([]);
  const navigation = useNavigation();

  // const FlatListToScroll = useRef(null);

  // useScrollToTop(FlatListToScroll);
  const externalDirectoryPath = `${RNFS.ExternalDirectoryPath}`;
  const insets = useSafeAreaInsets(); // lất chiều cao để manu top iphone

    // const HomeScreen = useContext(RefOfHome);

  let data = population;
  useEffect(() => {
    // RNFS.exists(`${externalDirectoryPath}/population.json`).then(fileExist => {
    //   if (fileExist) {
    //     RNFS.readFile(`${externalDirectoryPath}/population.json`).then(
    //       dataExternal => {
    //         data = JSON.parse(dataExternal);
    //       },
    //     );
    //   } else {
    //     data = population;
    //   }
    // });

    //     if (ScrollViewToScroll.current) {
    //   HomeScreen.updateHomeRef(ScrollViewToScroll.current);
    // }

  },[]);

  function Item({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: index % 2 ? '#CCCCCC' : '#white',
          marginTop: 10,
          flexWrap: 'wrap',
          padding: 10,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
        }}>
        <View>
          <Text>STT: {index}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.push(`getOneFamily`, {
              screen: item['SOHOK'],
              CCCD: item['CCCD'],
              // data:data
            })
          }
          style={{width: '100%'}}>
          <Text style={{marginRight: 10}}>Số HSHK: {item['SOHOK']}</Text>
          <Text style={{marginRight: 10}}>
            Họ và tên: <Text style={{fontWeight: 'bold'}}>{item['HOTEN']}</Text>
          </Text>

          <Text style={{marginRight: 10}}>Ngày sinh: {item['NAMSINH']}</Text>

          <Text style={{marginRight: 10}}>
            Giới tính: {item['GIOITINH'] == 'TRUE' ? 'Nam' : 'Nữ'}
          </Text>
          <Text style={{marginRight: 10}}>Tên cha: {item['TENCHA']}</Text>
          <Text style={{marginRight: 10}}>Tên mẹ: {item['TENME']}</Text>
          <Text style={{marginRight: 10}}>Dân tộc: {item['DANTOC']}</Text>
          <Text style={{marginRight: 10}}>Tôn giáo: {item['TONGIAO']}</Text>
          <Text style={{marginRight: 10}}>Địa chỉ: {item['NOITHTRU']}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function pushToSearch() {
    Keyboard.dismiss();
    // let data = population;
    let dataDemoSearch = [];
    if (data) {
      for (let a = 0; a <= data.length; a++) {
        if (
          data[a] &&
          data[a]['HOTEN'].match(new RegExp(input, 'img')) &&
          data[a]['HOTEN'].match(new RegExp(input2, 'img'))
        ) {
          dataDemoSearch.push(data[a]);
        }
      }
      setSearchRearch(dataDemoSearch);
    }
  }

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 0,
          borderBottomWidth: 1,
          borderBottomColor: 'color',
          backgroundColor: '#FFFF66',
          paddingTop:20 + insets.top/2,
          height:190 + insets.top/2
        }}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: '80%',
            borderRadius: 10,
            flexDirection: 'row',
            // backgroundColor:'red',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'column',
              // backgroundColor:'green',
              width: '90%',
            }}>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: 'black',
                borderWidth: 2,
                paddingTop:10,
                paddingBottom:10
              }}
              value={input}
              selectTextOnFocus={true}
              onChangeText={text => setInput(text)}
              placeholder="Nhập từ khóa..."
              placeholderTextColor={'gray'}
              onSubmitEditing={() => pushToSearch()}></TextInput>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: 'black',
                borderWidth: 2,
                marginTop: 5,
                paddingTop:10,
                paddingBottom:10
}}
              value={input2}
              selectTextOnFocus={true}
              onChangeText={text => setInput2(text)}
              placeholder="Nhập từ khóa..."
              placeholderTextColor={'gray'}
              onSubmitEditing={() => pushToSearch()}></TextInput>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:'blue',
              width:'20%',
            }}>
            <TouchableOpacity
              style={{
                padding: 5,
              width:30,
              height:30,
              backgroundColor:'red',
                borderRadius: 4,
                borderWidth: 1,
              }}
              onPress={() => {
                setInput('');
                setInput2('');
              }}>
              <Text
              style={{
              textAlign:'center',
              color:'white',
              fontWeight:'bold'
}}
              >X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => pushToSearch()}
          style={{
            width: 80,
            height: 30,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            color: 'black',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Search</Text>
        </TouchableOpacity>
        <Text style={{paddingTop: 5, marginBottom: 5}}>
          Số lượng kết quả tìm thấy:
          <Text style={{fontWeight: 'bold'}}> {searchRearch.length}</Text>
        </Text>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 190 + insets.top/2 }}>
      { searchRearch.length?
      (<FlatList
          // ref={()=>{FlatListToScroll}}
          ref={(ref)=>{global.SearchPopulationRef = ref}}

          data={searchRearch}
          renderItem={(item, index) => (
            <Item item={item.item} index={item.index + 1} />
          )}
        />
   ):
    (<TouchableOpacity
    style={{
      height:'100%',
      width:'100%',
      // backgroundColor:'red'
    }}
        onPress={() => Keyboard.dismiss()}
    >
    </TouchableOpacity>)
    }
          </View>
      <Text></Text>

       </>  
  );
}
