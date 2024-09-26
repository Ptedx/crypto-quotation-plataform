import { detailStyles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { rootTypes } from "../../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/loadingComponent";
import { Item } from "../../components/Item";
import { Graphic } from "../../components/GraphComponent";
import { useNetwork } from "../../hooks/useNetwork";
import { DisconnectedModal } from "../../components/DisconnectedModal";
import { hp, wp } from "../../components/Responsive";

type navigationProps = NativeStackScreenProps<rootTypes, "Details">;

export function Details({ navigation, route }: navigationProps) {
  const { data } = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<number>(180);
  const [isVisible, setVisible] = useState<boolean>(false)
  const {isConnected} = useNetwork()

  function changeModalStatus(){
    setVisible(!isVisible)
  }
  
  useEffect(()=>{
    if(!isConnected){
      setVisible(true)
    }else{
      setVisible(false)
    }
  },[isConnected])

  useEffect(() => {
    async function getCoinInfos() {
      try {
        navigation.setOptions({
          headerTitle: `${data.name.toUpperCase()} (${data.symbol.toUpperCase()}) `,
        });
      } catch (error) {
        console.log("Erro ao buscar a moeda:" + error);
      } finally {
        setIsLoading(false);
      }
    }

    getCoinInfos();
  }, []);

  function truncate(number:number){
    const num = number

    if(num > -0.0001 && num < 0.0001){
        return (num).toFixed(7)
    }
    if (num <= 1 && num >= -1){
        return (num).toFixed(4)
    }
    return (num).toFixed(2)
}
  const formatCurrency = (value: number | string) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    const valueChanged = Number(truncate(numericValue))
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 7,
    }).format(valueChanged);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={detailStyles.contianer}>
        <DisconnectedModal visible={isVisible} changeModalStatus={changeModalStatus}/>
        
      <View style={detailStyles.infos}>
        <View style={detailStyles.price}>
          <Text style={detailStyles.title}>
            {formatCurrency(data.current_price)}
          </Text>
          <Text
            style={
              data.price_change_percentage_24h > 0? 
                detailStyles.up
                : detailStyles.down
            }
          >
            {data.price_change_percentage_24h >= 0?
               `+${formatCurrency(
                  data.price_change_24h
                )} (+${data.price_change_percentage_24h.toFixed(2)}%)`
              : `${formatCurrency(
                  data.price_change_24h
                )} (${data.price_change_percentage_24h.toFixed(2)}%)`}
          </Text>
        </View>
        <Image
          source={{ uri: `${data.image}` }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </View>

      <Graphic coinId={data.id} days={period} changeModal={changeModalStatus} />

      <View style={[detailStyles.buttons, { marginVertical: 10 }]}>
        <TouchableOpacity style={detailStyles.btn} onPress={() => setPeriod(7)}>
          <Text style={detailStyles.text}>7D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={detailStyles.btn}
          onPress={() => setPeriod(30)}
        >
          <Text style={detailStyles.text}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={detailStyles.btn}
          onPress={() => setPeriod(90)}
        >
          <Text style={detailStyles.text}>3M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={detailStyles.btn}
          onPress={() => setPeriod(180)}
        >
          <Text style={detailStyles.text}>6M</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          detailStyles.title,
          { textAlign: "center", marginVertical: hp(3), fontSize:wp(4)},
        ]}
      >
        MAIS INFORMAÇÕES
      </Text>

      <ScrollView style={{ flex: 1, width: "95%" }}>
        <Item
          desc="MarketCap (Total)"
          data={
            data.market_cap > 1e12
              ? `${formatCurrency(data.market_cap / 1e12)} T`
              : data.market_cap > 1e9
              ? `${formatCurrency(data.market_cap / 1e9)} B`
              : `${formatCurrency(data.market_cap / 1e6)} M`
          }
        />
        <Item
          desc="MarketCap (24hr)"
          percentage={data.market_cap_change_percentage_24h}
          data={
            data.market_cap_change_24h >= 1e9
              ? `$${(data.market_cap_change_24h / 1e9).toFixed(3)} B`
              : `$${(data.market_cap_change_24h / 1e6).toFixed(3)} M`
          }
        />

        <Item
          desc="Volume total"
          data={
            data.total_volume > 1e9
              ? `${formatCurrency(data.total_volume / 1e9)} B`
              : `${formatCurrency(data.total_volume / 1e6)} M`
          }
        />

        <Item desc="Em circulação" data={data.circulating_supply > 1e9?
          `${(data.circulating_supply/1e9).toFixed(2)} B` 
          :`${(data.circulating_supply/1e6).toFixed(2)} M`} 
        />

        <Item
          desc="Quantidade Máxima"
          data={data.max_supply ? data.max_supply > 1e9?
          `${(data.max_supply/1e9).toFixed(2)} B`:
          `${(data.max_supply/1e6).toFixed(2)} M` 
          : "N/A"}
        />

        <Item desc="Ranking" data={data.market_cap_rank} />
      </ScrollView>
    </SafeAreaView>
  );
}
