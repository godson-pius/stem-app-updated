import {
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    KeyboardAvoidingView, ScrollView, Platform
} from 'react-native'
import React, {useState} from 'react'
import {defaultStyle} from '@/utils/defaultStyle'
import {useRouter} from 'expo-router'
import {readData, storeData} from "@/utils/storage";
import RNPickerSelect from 'react-native-picker-select';
import { SelectList } from 'react-native-dropdown-select-list'
import Ionicons from "@expo/vector-icons/Ionicons";
import {addUserToDb} from "@/utils/firestore";

const countries = [
    { value: 'Afghanistan', label: 'AF' },
    { value: 'Albania', label: 'AL' },
    { value: 'Algeria', label: 'DZ' },
    { value: 'Andorra', label: 'AD' },
    { value: 'Angola', label: 'AO' },
    { value: 'Antigua and Barbuda', label: 'AG' },
    { value: 'Argentina', label: 'AR' },
    { value: 'Armenia', label: 'AM' },
    { value: 'Australia', label: 'AU' },
    { value: 'Austria', label: 'AT' },
    { value: 'Azerbaijan', label: 'AZ' },
    { value: 'Bahamas', label: 'BS' },
    { value: 'Bahrain', label: 'BH' },
    { value: 'Bangladesh', label: 'BD' },
    { value: 'Barbados', label: 'BB' },
    { value: 'Belarus', label: 'BY' },
    { value: 'Belgium', label: 'BE' },
    { value: 'Belize', label: 'BZ' },
    { value: 'Benin', label: 'BJ' },
    { value: 'Bhutan', label: 'BT' },
    { value: 'Bolivia', label: 'BO' },
    { value: 'Bosnia and Herzegovina', label: 'BA' },
    { value: 'Botswana', label: 'BW' },
    { value: 'Brazil', label: 'BR' },
    { value: 'Brunei', label: 'BN' },
    { value: 'Bulgaria', label: 'BG' },
    { value: 'Burkina Faso', label: 'BF' },
    { value: 'Burundi', label: 'BI' },
    { value: 'Cabo Verde', label: 'CV' },
    { value: 'Cambodia', label: 'KH' },
    { value: 'Cameroon', label: 'CM' },
    { value: 'Canada', label: 'CA' },
    { value: 'Central African Republic', label: 'CF' },
    { value: 'Chad', label: 'TD' },
    { value: 'Chile', label: 'CL' },
    { value: 'China', label: 'CN' },
    { value: 'Colombia', label: 'CO' },
    { value: 'Comoros', label: 'KM' },
    { value: 'Congo, Democratic Republic of the', label: 'CD' },
    { value: 'Congo, Republic of the', label: 'CG' },
    { value: 'Costa Rica', label: 'CR' },
    { value: 'Croatia', label: 'HR' },
    { value: 'Cuba', label: 'CU' },
    { value: 'Cyprus', label: 'CY' },
    { value: 'Czech Republic', label: 'CZ' },
    { value: 'Denmark', label: 'DK' },
    { value: 'Djibouti', label: 'DJ' },
    { value: 'Dominica', label: 'DM' },
    { value: 'Dominican Republic', label: 'DO' },
    { value: 'Ecuador', label: 'EC' },
    { value: 'Egypt', label: 'EG' },
    { value: 'El Salvador', label: 'SV' },
    { value: 'Equatorial Guinea', label: 'GQ' },
    { value: 'Eritrea', label: 'ER' },
    { value: 'Estonia', label: 'EE' },
    { value: 'Eswatini', label: 'SZ' },
    { value: 'Ethiopia', label: 'ET' },
    { value: 'Fiji', label: 'FJ' },
    { value: 'Finland', label: 'FI' },
    { value: 'France', label: 'FR' },
    { value: 'Gabon', label: 'GA' },
    { value: 'Gambia', label: 'GM' },
    { value: 'Georgia', label: 'GE' },
    { value: 'Germany', label: 'DE' },
    { value: 'Ghana', label: 'GH' },
    { value: 'Greece', label: 'GR' },
    { value: 'Grenada', label: 'GD' },
    { value: 'Guatemala', label: 'GT' },
    { value: 'Guinea', label: 'GN' },
    { value: 'Guinea-Bissau', label: 'GW' },
    { value: 'Guyana', label: 'GY' },
    { value: 'Haiti', label: 'HT' },
    { value: 'Honduras', label: 'HN' },
    { value: 'Hungary', label: 'HU' },
    { value: 'Iceland', label: 'IS' },
    { value: 'India', label: 'IN' },
    { value: 'Indonesia', label: 'ID' },
    { value: 'Iran', label: 'IR' },
    { value: 'Iraq', label: 'IQ' },
    { value: 'Ireland', label: 'IE' },
    { value: 'Israel', label: 'IL' },
    { value: 'Italy', label: 'IT' },
    { value: 'Jamaica', label: 'JM' },
    { value: 'Japan', label: 'JP' },
    { value: 'Jordan', label: 'JO' },
    { value: 'Kazakhstan', label: 'KZ' },
    { value: 'Kenya', label: 'KE' },
    { value: 'Kiribati', label: 'KI' },
    { value: 'Korea, North', label: 'KP' },
    { value: 'Korea, South', label: 'KR' },
    { value: 'Kuwait', label: 'KW' },
    { value: 'Kyrgyzstan', label: 'KG' },
    { value: 'Laos', label: 'LA' },
    { value: 'Latvia', label: 'LV' },
    { value: 'Lebanon', label: 'LB' },
    { value: 'Lesotho', label: 'LS' },
    { value: 'Liberia', label: 'LR' },
    { value: 'Libya', label: 'LY' },
    { value: 'Liechtenstein', label: 'LI' },
    { value: 'Lithuania', label: 'LT' },
    { value: 'Luxembourg', label: 'LU' },
    { value: 'Madagascar', label: 'MG' },
    { value: 'Malawi', label: 'MW' },
    { value: 'Malaysia', label: 'MY' },
    { value: 'Maldives', label: 'MV' },
    { value: 'Mali', label: 'ML' },
    { value: 'Malta', label: 'MT' },
    { value: 'Marshall Islands', label: 'MH' },
    { value: 'Mauritania', label: 'MR' },
    { value: 'Mauritius', label: 'MU' },
    { value: 'Mexico', label: 'MX' },
    { value: 'Micronesia', label: 'FM' },
    { value: 'Moldova', label: 'MD' },
    { value: 'Monaco', label: 'MC' },
    { value: 'Mongolia', label: 'MN' },
    { value: 'Montenegro', label: 'ME' },
    { value: 'Morocco', label: 'MA' },
    { value: 'Mozambique', label: 'MZ' },
    { value: 'Myanmar', label: 'MM' },
    { value: 'Namibia', label: 'NA' },
    { value: 'Nauru', label: 'NR' },
    { value: 'Nepal', label: 'NP' },
    { value: 'Netherlands', label: 'NL' },
    { value: 'New Zealand', label: 'NZ' },
    { value: 'Nicaragua', label: 'NI' },
    { value: 'Niger', label: 'NE' },
    { value: 'Nigeria', label: 'NG' },
    { value: 'North Macedonia', label: 'MK' },
    { value: 'Norway', label: 'NO' },
    { value: 'Oman', label: 'OM' },
    { value: 'Pakistan', label: 'PK' },
    { value: 'Palau', label: 'PW' },
    { value: 'Panama', label: 'PA' },
    { value: 'Papua New Guinea', label: 'PG' },
    { value: 'Paraguay', label: 'PY' },
    { value: 'Peru', label: 'PE' },
    { value: 'Philippines', label: 'PH' },
    { value: 'Poland', label: 'PL' },
    { value: 'Portugal', label: 'PT' },
    { value: 'Qatar', label: 'QA' },
    { value: 'Romania', label: 'RO' },
    { value: 'Russia', label: 'RU' },
    { value: 'Rwanda', label: 'RW' },
    { value: 'Saint Kitts and Nevis', label: 'KN' },
    { value: 'Saint Lucia', label: 'LC' },
    { value: 'Saint Vincent and the Grenadines', label: 'VC' },
    { value: 'Samoa', label: 'WS' },
    { value: 'San Marino', label: 'SM' },
    { value: 'Sao Tome and Principe', label: 'ST' },
    { value: 'Saudi Arabia', label: 'SA' },
    { value: 'Senegal', label: 'SN' },
    { value: 'Serbia', label: 'RS' },
    { value: 'Seychelles', label: 'SC' },
    { value: 'Sierra Leone', label: 'SL' },
    { value: 'Singapore', label: 'SG' },
    { value: 'Slovakia', label: 'SK' },
    { value: 'Slovenia', label: 'SI' },
    { value: 'Solomon Islands', label: 'SB' },
    { value: 'Somalia', label: 'SO' },
    { value: 'South Africa', label: 'ZA' },
    { value: 'South Sudan', label: 'SS' },
    { value: 'Spain', label: 'ES' },
    { value: 'Sri Lanka', label: 'LK' },
    { value: 'Sudan', label: 'SD' },
    { value: 'Suriname', label: 'SR' },
    { value: 'Sweden', label: 'SE' },
    { value: 'Switzerland', label: 'CH' },
    { value: 'Syria', label: 'SY' },
    { value: 'Taiwan', label: 'TW' },
    { value: 'Tajikistan', label: 'TJ' },
    { value: 'Tanzania', label: 'TZ' },
    { value: 'Thailand', label: 'TH' },
    { value: 'Timor-Leste', label: 'TL' },
    { value: 'Togo', label: 'TG' },
    { value: 'Tonga', label: 'TO' },
    { value: 'Trinidad and Tobago', label: 'TT' },
    { value: 'Tunisia', label: 'TN' },
    { value: 'Turkey', label: 'TR' },
    { value: 'Turkmenistan', label: 'TM' },
    { value: 'Tuvalu', label: 'TV' },
    { value: 'Uganda', label: 'UG' },
    { value: 'Ukraine', label: 'UA' },
    { value: 'United Arab Emirates', label: 'AE' },
    { value: 'United Kingdom', label: 'GB' },
    { value: 'United States', label: 'US' },
    { value: 'Uruguay', label: 'UY' },
    { value: 'Uzbekistan', label: 'UZ' },
    { value: 'Vanuatu', label: 'VU' },
    { value: 'Vatican City', label: 'VA' },
    { value: 'Venezuela', label: 'VE' },
    { value: 'Vietnam', label: 'VN' },
    { value: 'Yemen', label: 'YE' },
    { value: 'Zambia', label: 'ZM' },
    { value: 'Zimbabwe', label: 'ZW' },
];
const classes = [
    { value: 'SS1', label: 'SS1' },
    { value: 'SS2', label: 'SS2' },
    { value: 'SS3', label: 'SS3' },
]

const SecondReg = () => {
    const navigation = useRouter()
    const [studentClass, setStudentClass] = useState("")
    const [country, setCountry] = useState("")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    // Handle the registration submit
    const handleSubmit = async () => {
        setLoading(true)
        const getSavedData = await readData("userData")
        const data = {
            ...getSavedData,
            studentClass: studentClass.toLowerCase(),
            country,
            password,
            role: "student"
        }
        const res = await addUserToDb(data);
        if (res.success) {
            setLoading(false)
            await storeData("userData", data)
            return navigation.navigate({
                pathname: '/(tabs)',
                params: {studentClass}
            })
        }
        Alert.alert(res.message)
        setLoading(false)
    }

    return (
       <KeyboardAvoidingView
           style={{ flex: 1 }}
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       >
           <ScrollView>
               <View style={styles.container}>
                   <Image style={styles.image} source={require('@/assets/images/logo.png')}/>
                   <Text style={[defaultStyle.text, styles.title]}>Start Learning</Text>
                   <Text style={defaultStyle.text}>Geanco STEM</Text>

                   <View style={{ marginTop: 60 }}>
                       <SelectList
                           setSelected={(val: string) => setStudentClass(val)}
                           data={classes}
                           save="value"
                           boxStyles={{ borderWidth: 0 }}
                           inputStyles={defaultStyle.select}
                           placeholder={"Select class"}
                           dropdownTextStyles={{ fontSize: 20 }}
                           arrowicon={<Ionicons name='chevron-down' size={20} />}
                       />
                   </View>

                   <View style={{ marginTop: 30 }}>
                       <SelectList
                           setSelected={(val: string) => setCountry(val)}
                           data={countries}
                           save="value"
                           boxStyles={{ borderWidth: 0 }}
                           inputStyles={defaultStyle.select}
                           placeholder={"Select Country"}
                           dropdownTextStyles={{ fontSize: 20 }}
                           arrowicon={<Ionicons name='chevron-down' size={20} />}
                       />
                   </View>

                   <View style={{marginTop: 30, marginBottom: 40}}>
                       <Text style={[defaultStyle.label]}>Enter password</Text>
                       <View className={'flex flex-row items-center'} style={{width: 300}}>
                           <TextInput secureTextEntry={hidePassword} autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                                      onChangeText={(value: string) => setPassword(value)}/>
                           <Ionicons name={hidePassword ? 'eye' : 'eye-off'} onPress={() => setHidePassword(!hidePassword)} size={16} />
                       </View>
                   </View>

                   { !loading ? (
                       <TouchableOpacity style={defaultStyle.button} className={'items-center'} onPress={handleSubmit}>
                           <Text style={defaultStyle.buttonText}>Submit Data</Text>
                       </TouchableOpacity>
                   ) : null }

                   {loading ? <ActivityIndicator size={"small"} className={'my-5 text-blue-900'} /> : null}

                   <Text style={[defaultStyle.text, { marginTop: 30, color: 'gray'}]}>Secured by
                       GeancoStem</Text>
               </View>
           </ScrollView>
       </KeyboardAvoidingView>
    )
}

export default SecondReg

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ededee'
    },

    image: {
        width: 200,
        height: 200,
        marginTop: -10
    },

    title: {
        fontSize: 24,
        marginTop: -30,
        fontWeight: '500'
    },
})