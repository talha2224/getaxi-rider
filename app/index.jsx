import { router } from 'expo-router'
import { useEffect } from 'react'
import { Image, View } from 'react-native'
import Logo from '../assets/images/splash-icon2.png'

const DefaultScreen = () => {

    useEffect(() => {
        setTimeout(() => {
            router.push("/register");
        }, 2000);
    }, [])

    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#34BF02" }}>

            <Image source={Logo} style={{height:100,width:200}} />
            {/* <Text style={{ textAlign: "center", fontSize: 18, marginTop: 10, marginLeft: 20, fontWeight: "700" }}>GeTaxi</Text> */}

        </View>

    )
}

export default DefaultScreen