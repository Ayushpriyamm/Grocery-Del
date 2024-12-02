import CustomText from "@/src/features/CustomText";
import { screenHeight } from "@/src/features/Scaling";
import { getData } from "@/src/utils/apiHandler";
import { useQuery } from "@tanstack/react-query";
import { View,StyleSheet } from "react-native";
import {useRoute} from "@react-navigation/native";
import { ProductCategory } from "@/src/features/ProductCategory";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "@/src/utils/Constants";
import ProductCard from "@/src/features/ProductCard";
import { productsList } from "@/src/utils/dummyData";

export default function Product(){
  const route : any = useRoute();
    console.log(route.params);
 
  const {data : getProduct} = useQuery({
    queryKey : ["getProduct"],
   queryFn : () => {
        return getData(`/api/product/product-category/`,{categoryId: route.params?.id});
    }
  });
  console.log(getProduct);
  return(
    <>
      <CustomText variant="h1" style={[{
           textAlign : "center",
           width : 100
          }]}
            fontSize={RFValue(12)}
            fontFamily={Fonts.SemiBold}>
          Milk 
    </CustomText>
   <View style={styles.screen}>
       <ProductCategory product="Milk"/>
        <View style={styles.productGrid}>
          {productsList.map((product : any,index : any) => {
             return <ProductCard styles={styles.productCard} key={index} name={product.name} image={require(product.image)} price={product.price} />;
          })}    
       </View>
   </View>
   </>
  );
}

const styles = StyleSheet.create({
   screen : {
    display : "flex",
    padding  : 10,
    flexDirection : "row"
  },
 productCard: {
    width: '48%',            
    marginBottom: 10,       
  },
  productGrid : {
    flexDirection : "row",
    flexWrap  : "wrap",
   justifyContent : "space-between",
    gap : 10
 } 
})
