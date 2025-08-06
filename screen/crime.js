import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import crime from '../asset/crime.json';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import RNFS from 'react-native-fs';

export function Crime() {
  // let data = crime;
  const externalDirectoryPath = `${RNFS.ExternalDirectoryPath}`;

  // console.log(externalDirectoryPath);

  // let crime = Boolean(RNFS.exists(externalDirectoryPath)/crime)

  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');

  const [searchRearch, setSearchRearch] = useState([]);
  const navigation = useNavigation();

  const FlatListToScroll = useRef(null);

  useScrollToTop(FlatListToScroll);

  let data;
  useEffect(() => {
    RNFS.exists(`${externalDirectoryPath}/crime.json`).then(fileExist => {
      console.log('fileExist', fileExist);

      if (fileExist) {
        RNFS.readFile(`${externalDirectoryPath}/crime.json`).then(
          dataExternal => {
            data = JSON.parse(dataExternal);
            // console.log('data', (data[0]));
          },
        );
      } else {
        data = crime;
      }

      // console.log('data',data)
    });
  });

  function Item({item, index}) {
    // console.log(item);

    return (
      <View
        style={{
          flexDirection: 'collumn',
          backgroundColor: index % 2 ? '#CCCCCC' : '#white',
          marginTop: 10,
          flexWrap: 'wrap',
          padding: 10,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text>STT: {index}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '50%'}}>
            <Text style={{marginRight: 10}}>
              Họ và tên:{' '}
              <Text style={{fontWeight: 'bold'}}>{item['HOTEN']}</Text>
            </Text>
            <Text style={{marginRight: 10}}>Tên khác: {item['TENKHAC']}</Text>
            <Text style={{marginRight: 10}}>Ngày sinh: {item['NAMSINH']}</Text>

            <Text style={{marginRight: 10}}>
              Giới tính: {item['GIOITINH'] == 'TRUE' ? 'Nam' : 'Nữ'}
            </Text>
            <Text style={{marginRight: 10}}>Số ĐDCN: {item['CCCD']}</Text>
            <Text style={{marginRight: 10}}>Tên cha: {item['TENCHA']}</Text>
            <Text style={{marginRight: 10}}>Tên mẹ: {item['TENME']}</Text>
            <Text style={{marginRight: 10}}>Dân tộc: {item['DANTOC']}</Text>
            <Text style={{marginRight: 10}}>Tôn giáo: {item['TONGIAO']}</Text>
            <Text style={{marginRight: 10}}>Tội danh: {item['CHARGE']}</Text>
            <Text style={{marginRight: 10}}>Ngày bắt: {item['DAYARRES']}</Text>
            <Text style={{marginRight: 10}}>
              Ngày chấp hành xong: {item['FREEDAY']}
            </Text>
            <Text style={{marginRight: 10}}>Thời hạn: {item['JUDGMENT']}</Text>
            <Text style={{marginRight: 10}}>
              Nơi chấp hành: {item['DETENTION']}
            </Text>
            <Text style={{marginRight: 10}}>Địa chỉ: {item['TODPHO']}</Text>
          </View>
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: '100%', height: 200}}
              source={{
                uri: `file://${externalDirectoryPath}/${item['CCCD']}.jpg`,
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function pushToSearch() {
    Keyboard.dismiss();
    // let data = crime;
    let dataDemoSearch = [];
    for (let a = 0; a <= data.length; a++) {
      if (
        data[a] &&
        data[a]['HOTEN'].match(new RegExp(input, 'img')) &&
        (data[a]['HOTEN'].match(new RegExp(input2, 'img')) ||
          data[a]['TENKHAC'].match(new RegExp(input2, 'img')))
      ) {
        dataDemoSearch.push(data[a]);
        // console.log(data[a]['HOTEN']);
      }
    }

    setSearchRearch(dataDemoSearch);

    // console.log(dataOrg[0]);
  }

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 0,
          backgroundColor: '#0099FF',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          paddingTop: 30,
        }}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: '80%',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '80%',
            }}>
            <TextInput
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: 'black',
                color: 'white',
                borderWidth: 2,
              }}
              value={input}
              selectTextOnFocus={true}
              onChangeText={text => setInput(text)}
              placeholder="Nhập từ khóa..."
              placeholderTextColor={'white'}
              onSubmitEditing={() => pushToSearch()}></TextInput>
            <TextInput
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: 'black',
                color: 'white',
                borderWidth: 2,
                marginTop: 5,
              }}
              value={input2}
              selectTextOnFocus={true}
              onChangeText={text => setInput2(text)}
              placeholder="Nhập từ khóa..."
              placeholderTextColor={'white'}
              onSubmitEditing={() => pushToSearch()}></TextInput>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                padding: 5,
                width: 30,
                height: 30,
                backgroundColor: 'red',
                borderRadius: 4,
                borderWidth: 1,
              }}
              onPress={() => {
                setInput('');
                setInput2('');
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color:'white',
                  fontWeight:'bold'
                }}>
                X
              </Text>
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
      <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 204}}>
        <FlatList
          ref={FlatListToScroll}
          data={searchRearch}
          renderItem={(item, index) => (
            <Item item={item.item} index={item.index + 1} />
          )}
        />
      </View>
      <Text></Text>
    </>
  );
}
