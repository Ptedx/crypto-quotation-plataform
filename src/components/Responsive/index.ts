import {widthPercentageToDP as Wp, heightPercentageToDP as Hp} from 'react-native-responsive-screen';

export function wp(value:number){
    return Wp(value)
}
export function hp(value:number){
    return Hp(value)
}