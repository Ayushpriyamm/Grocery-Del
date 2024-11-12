import CustomText from "@/src/features/CustomText";
import { screenHeight } from "@/src/features/Scaling";
import { getData } from "@/src/utils/apiHandler";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import {useRoute} from "@react-navigation/native";

export default function Product(){
  const route = useRoute();
    console.log(route.params);
 /*
  const {data : getProduct} = useQuery({
    queryKey : ["getProduct"],
   queryFn : () => {
        return getData(`/api/product/product-category/`,{id : route.params.id});
    }
  });
 */

  return(
     <View style={{
       backgroundColor : "green",
       height : screenHeight
    }}>
      <CustomText>Hello is</CustomText>
   </View>
  );
}
