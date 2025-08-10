import React, { useState, useRef, useEffect } from 'react';
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
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import RNFS from 'react-native-fs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Crime() {
  // let data = crime;
  const externalDirectoryPath = `${RNFS.ExternalDirectoryPath}`;

  // console.log(externalDirectoryPath);

  // let crime = Boolean(RNFS.exists(externalDirectoryPath)/crime)

  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');

  const [searchRearch, setSearchRearch] = useState([]);
  const navigation = useNavigation();

  // const FlatListToScroll = useRef(null);

  // useScrollToTop(FlatListToScroll);
  const insets = useSafeAreaInsets(); // lất chiều cao để manu top iphone

  let data = crime;
  useEffect(() => {
    // RNFS.exists(`${externalDirectoryPath}/crime.json`).then(fileExist => {
    //   console.log('fileExist', fileExist);
    //   if (fileExist) {
    //     RNFS.readFile(`${externalDirectoryPath}/crime.json`).then(
    //       dataExternal => {
    //         data = JSON.parse(dataExternal);
    //         // console.log('data', (data[0]));
    //       },
    //     );
    //   } else {
    // data = crime;
    //   }
    // });
  }, []);

  let tableHead = [
    'STT',
    'Tội danh',
    'Thời hạn',
    'Ngày bắt',
    'Ngày CH xong:',
    'Nơi CH',
  ];
  let widthArr = ['8%', '30%', '15%', '15%', '15%', '17%'];
  //  let tableData= [
  //     ['1', '2', '3', '4'],
  //     ['a', 'b', 'c', 'd'],
  //     ['1', '2', '3', '456\n789'],
  //     ['a', 'b', 'c', 'd']
  //   ]

  function Item({ item, index }) {
    // console.log(item['CHARGE'].split(";"));

    let chargeArr = item['CHARGE'].split(';');
    let fullInfoCrime = [];
    // console.log('chargeArr', chargeArr);

    for (let a = 0; a < chargeArr.length; a++) {
      // console.log("item['CHARGE'].split()[a]", item['FREEDAY'].split(';')[a]);

      fullInfoCrime.push([
        [a + 1],
        item['CHARGE'].split(';')[a] ? item['CHARGE'].split(';')[a] : '',
        item['JUDGMENT'].split(';')[a] ? item['JUDGMENT'].split(';')[a] : '',
        item['DAYARRES'].split(';')[a] ? item['DAYARRES'].split(';')[a] : '',
        item['FREEDAY'].split(';')[a] ? item['FREEDAY'].split(';')[a] : '',
        item['DETENTION'].split(';')[a] ? item['DETENTION'].split(';')[a] : '',
      ]);
      // console.log('fullInfoCrime1', fullInfoCrime);
    }

    // let URIImage = ''
    // let existsIMG;
    // RNFS.exists(
    //         `file://${externalDirectoryPath}/${item['CCCD']}.jpg`,
    //       ).then(exists => {
    //         console.log('exists', exists);
    //         if(exists){
    //           existsIMG = exists
    //           URIImage = `file://${externalDirectoryPath}/${item['CCCD']}.jpg`
    //         }else{
    //           existsIMG = exists
    //         }
    //         console.log('existsIMG',existsIMG);

    //       })

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
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>
            Số thứ tự: <Text style={{ fontWeight: '400' }}>{index}</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Họ và tên: <Text style={{ color: 'red' }}>{item['HOTEN']}</Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Tên khác:{' '}
              <Text style={{ fontWeight: '400' }}>{item['TENKHAC']}</Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Ngày sinh:{' '}
              <Text style={{ fontWeight: '400' }}>{item['NAMSINH']}</Text>
            </Text>

            <Text style={{ marginRight: 10 }}>
              Giới tính:{' '}
              <Text style={{ fontWeight: '400' }}>
                {item['GIOITINH'] == 'TRUE' ? 'Nam' : 'Nữ'}
              </Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Số ĐDCN: <Text style={{ fontWeight: '400' }}>{item['CCCD']}</Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Tên cha:{' '}
              <Text style={{ fontWeight: '400' }}>{item['TENCHA']}</Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Tên mẹ: <Text style={{ fontWeight: '400' }}>{item['TENME']}</Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Dân tộc:{' '}
              <Text style={{ fontWeight: '400' }}>{item['DANTOC']}</Text>
            </Text>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Tôn giáo:{' '}
              <Text style={{ fontWeight: '400' }}>{item['TONGIAO']}</Text>
            </Text>
            {/* <Text style={{marginRight: 10}}>Tội danh: {item['CHARGE']}</Text>
            <Text style={{marginRight: 10}}>Ngày bắt: {item['DAYARRES']}</Text>
            <Text style={{marginRight: 10}}>
              Ngày chấp hành xong: {item['FREEDAY']}
            </Text>
            <Text style={{marginRight: 10}}>Thời hạn: {item['JUDGMENT']}</Text>
            <Text style={{marginRight: 10}}>
              Nơi chấp hành: {item['DETENTION']}
            </Text> */}
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>
              Địa chỉ:{' '}
              <Text style={{ fontWeight: '400' }}>{item['TODPHO']}</Text>
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'yellow',
            }}
          >
            <Image
              style={{ width: '100%', height: 200 }}
              source={{
                uri: `file://${externalDirectoryPath}/${item['CCCD']}.jpg`,
              }}
            />
          </View>

          {/* {existsIMG && 
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'yellow',
                  }}
                >
                  <Image
                    style={{ width: '100%', height: 200 }}
                    source={{
                      uri: `file://${externalDirectoryPath}/${item['CCCD']}.jpg`,
                    }}
                  />
                </View>
              
           } */}
        </View>
        <View>
          {/* <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row
              data={tableHead}
              style={{ backgroundColor: '#f1f8ff' }}
              textStyle={{ margin: 6, fontWeight: 'bold',textAlign:'center'}}
            />
            <Rows
            
              data={fullInfoCrime}
              style={{ backgroundColor: '#f1f8ff' }}
              textStyle={{ margin: 4, fontSize: 10,textAlign:'center' }}
            />
          </Table> */}

          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={{ backgroundColor: '#f1f8ff' }}
              textStyle={{
                margin: 6,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 12,
              }}
            />
          </Table>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            {fullInfoCrime.map((rowData, index) => {
              // console.log('rowData[1]', rowData[1]);
              // console.log('rowData[4]', rowData[4]);

              return (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={
                    rowData &&
                    (rowData[1].includes('?') || rowData[4].includes('?'))
                      ? { backgroundColor: 'red' }
                      : { backgroundColor: '#f1f8ff' }
                  }
                  textStyle={{ margin: 4, fontSize: 10, textAlign: 'center' }}
                />
              );
            })}
          </Table>
        </View>
      </View>
    );
  }

  function pushToSearch() {
    Keyboard.dismiss();
    let data = crime;
    let dataDemoSearch = [];
    for (let a = 0; a <= data.length; a++) {
      if (
        data[a] &&
        data[a]['HOTEN'].match(new RegExp(input, 'img')) &&
        (data[a]['HOTEN'].match(new RegExp(input2, 'img')) ||
          data[a]['TENKHAC'].match(new RegExp(input2, 'img')))
      ) {
        dataDemoSearch.push(data[a]);
      }
    }

    setSearchRearch(dataDemoSearch);
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
          paddingTop:20 + insets.top/2,
          height:190 + insets.top/2
        }}
      >
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: '80%',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              width: '90%',
            }}
          >
            <TextInput
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: 'black',
                color: 'white',
                borderWidth: 2,
                paddingTop:10,
                paddingBottom:10
              }}
              value={input}
              selectTextOnFocus={true}
              onChangeText={text => setInput(text)}
              placeholder="Nhập từ khóa..."
              placeholderTextColor={'white'}
              onSubmitEditing={() => pushToSearch()}
            ></TextInput>
            <TextInput
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: 'black',
                color: 'white',
                borderWidth: 2,
                marginTop: 5,
                paddingTop:10,
                paddingBottom:10
              }}
              value={input2}
              selectTextOnFocus={true}
              onChangeText={text => setInput2(text)}
              placeholder="Nhập từ khóa..."
              placeholderTextColor={'white'}
              onSubmitEditing={() => pushToSearch()}
            ></TextInput>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '20%',
            }}
          >
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
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
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
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
        <Text style={{ paddingTop: 5, marginBottom: 5 }}>
          Số lượng kết quả tìm thấy:
          <Text style={{ fontWeight: 'bold' }}> {searchRearch.length}</Text>
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 190 + insets.top / 2,
        }}
      >
        {
          searchRearch.length ? (<FlatList
          ref={ref => {
            global.SearchCrimeRef = ref;
          }}
          data={searchRearch}
          renderItem={(item, index) => (
            <Item item={item.item} index={item.index + 1} />
          )}
        />):
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
