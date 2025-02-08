"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../lib/store/hooks";


import Image from "next/image";
import { client } from "@/sanity/lib/client";
import dynamic from "next/dynamic";

const StripePayment = dynamic(() => import("../components/stripePayment"), {
  ssr: false, // Disable SSR for this component
});


const CheckOut = () => {
  

  // const [data, setData] = useState<any>([]);
  const DataRedux = useAppSelector((state) => state.cart?.item || []);
  const [loading, setLoading] = useState(true); // 👈 Loading state add karein



  //storing data
  const [Data, setData] = useState([])

  //import data from sanity
  useEffect(() => {
    const fetchProducts = async () => {
     try {
      const data = await client.fetch(`*[_type == "product"] {
                category,
                name,
                slug,
                "image" : image.asset->url,
                price,
                quantity,
                tags,
                description,
                features,
                dimensions,
                }`)

      setData(data)
    } catch (error) {
      return <div> <p>Failed to fetch </p> console.log(error);
      </div>
      
  }
    }

    fetchProducts()

  }, [])


  const Product: any = Data

  const product = Product.map((items: any) => items)
  const data = useAppSelector(state => state.cart.item)

  // const amount = useAppSelector(amount => amount.cart.amount )
  // const quantity = useAppSelector(quantity => quantity.cart.quantity )

  const dataofProductID = data.map((productdata) => productdata.slug)
  const ProductQuantity: number[] = data.map((quantity) => quantity.quantity)

  const filteredProducts = Product.filter((product: any) => dataofProductID.includes(product.slug.current))

    console.log("datata in checout", filteredProducts);

    
    const amount = useAppSelector((state) => state.amount.totalAmount);

  // // Assuming the first product contains the product array
  // const productList = data[0];
  

  // if (loading) {
  //   return <p className="text-center mt-10">Loading Data...</p>; // Show loading message
  // }

  // if (!data || data.length === 0) {
  //   return <p className="text-center mt-10">No data available</p>; // Fallback when data is empty
  // }

  // if (loading)
  return (
    <div className="w-[100%] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row bg-gray-100 sm:p-6 md:p-7 rounded-xl shadow-xl">
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-600 my-5 mx-6">TEST MODE</p>
          <div className="w-[88%] md:w-[95%] lg:w-[85%] mx-auto">
           
                <div className="mb-8">
                  <div className="border-b-2 pb-5 mb-6">
                    <p className="text-xl font-semibold text-gray-700">Pay</p>
                    <p className="text-2xl font-bold text-black">{`$${amount}.00`}</p>
                  </div>
                  
                  {filteredProducts
                    //  .filter((checkitem: any) => checkitem.product && checkitem.product.length > 0)
                    .map((checkitem: any, indx: number) => {
                      const quantity2 = ProductQuantity[indx]
                      const total = checkitem.price * quantity2
                      return(      
                      
                    <div key={indx}
                      className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-5"
                    
                    >
                      <div className="flex gap-4 items-center">
                        <Image width={60} height={60} src={checkitem.image} alt={checkitem.name} className="rounded-md" />
                        <h2 className="text-[12px] sm:text-[15px] md:text-lg text-gray-800 font-semibold">{checkitem.name}</h2>
                      </div>
                      <p className="text-[12px] sm:text-[15px] md:text-lg lg:text-xl font-medium text-black">
                        {DataRedux[indx]?.quantity || 1}
                      </p>
                      <p className="text-[12px] sm:text-[15px] md:text-lg lg:text-xl font-medium text-black">
                        {`$${total}.00`}
                      </p>
                    </div>
                   )})}
                </div>
                    
             
          </div>
        </div>
        <div className="flex-1">
          <StripePayment />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
