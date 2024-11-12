import CustomText from "@/src/features/CustomText";
import { screenHeight } from "@/src/features/Scaling";
import { getData } from "@/src/utils/apiHandler";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Product(){
  const {id} = useLocalSearchParams();
  const {data : getProduct} = useQuery({
    queryKey : ["getProduct"],
   queryFn : () => {
        return getData(`/api/product/product-category/`,{id : id});
    }
  });
   console.log(getProduct,"products");
  return(
     <View style={{
       backgroundColor : "green",
       height : screenHeight
    }}>
      <CustomText>Hello is{id}</CustomText>
   </View>
  );
}
