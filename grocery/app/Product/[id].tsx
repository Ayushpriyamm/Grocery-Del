import CustomText from "@/src/features/CustomText";
import { screenHeight } from "@/src/features/Scaling";
import { getData } from "@/src/utils/apiHandler";
import { useQuery } from "@tanstack/react-query";
import { View,StyleSheet } from "react-native";
import {useRoute} from "@react-navigation/native";
import { ProductCategory } from "@/src/features/ProductCategory";

export default function Product(){
  const route : any = useRoute();
    console.log(route.params);
 
  const {data : getProduct} = useQuery({
    queryKey : ["getProduct"],
   queryFn : () => {
        return getData(`/api/product/product-category/`,{categoryId: route.params?.id});
    }
  });

  return(
    <>
   <View style={styles.screen}>
       <ProductCategory product="Milk"/>         
   </View>
   </>
  );
}

const styles = StyleSheet.create({
   screen : {
     display : "flex",
     flexDirection : "row"
  }
})
