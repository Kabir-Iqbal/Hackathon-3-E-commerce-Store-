// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { CheckCircle, Download, Home } from "lucide-react";

// const OrderSummary = () => {
//   const router = useRouter();
//   const orderId = "12345"; // This should be dynamic (from database)
//   const [orderData, setOrderData] = useState<any>(null);

// //   useEffect(() => {
// //     // Fetch order details (API request)
// //     const fetchOrder = async () => {
// //       try {
// //         const response = await fetch(`/api/orders/${orderId}`);
// //         const data = await response.json();
// //         setOrderData(data);
// //       } catch (error) {
// //         console.error("Error fetching order:", error);
// //       }
// //     };
// //     fetchOrder();
// //   }, []);

// //   if (!orderData) {
// //     return <p className="text-center text-gray-600">Loading...</p>;
// //   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
//         <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
//         <h1 className="text-2xl font-bold text-gray-800 text-center">Order Summary</h1>

//         <div className="mt-6 space-y-4">
//           <p className="text-gray-700"><strong>Order ID:</strong></p>
//           <p className="text-gray-700"><strong>Total Amount:</strong> </p>
//           <p className="text-gray-700"><strong>Status:</strong> Paid ✅</p>

//           <div className="mt-4">
//             <h2 className="text-lg font-semibold text-gray-800">Items:</h2>
//             {orderData.items.map((item: any) => (
//               <div key={item} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mt-2">
//                 <div className="flex gap-4 items-center">
//                   <img src={"alll"} alt={"alll"} className="w-14 h-14 rounded-md" />
//                   <p className="text-gray-700">kk</p>
//                 </div>
//                 <p className="text-gray-800 font-semibold">900</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6 flex flex-col gap-3">
//           <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
//             <Download className="w-5 h-5" /> Download Invoice
//           </button>
//           <button onClick={() => router.push("/")} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2">
//             <Home className="w-5 h-5" /> Back to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle, Download, Home, PackageCheck, ShoppingBag } from "lucide-react";

const OrderSummary = () => {
  const router = useRouter();

  // Dummy Order Data (You can replace it with dynamic data later)
  const orderId = "#ORD-987654";
  const totalAmount = "$249.99";
  const orderItems = [
    { id: 1, name: "Wireless Headphones", price: "$99.99", image: "/headphones.jpg" },
    { id: 2, name: "Smart Watch", price: "$149.99", image: "/watch.jpg" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="mt-6 space-y-4 border-t pt-4 text-left">
          <p className="text-gray-700 text-lg flex items-center gap-2">
            <PackageCheck className="text-blue-500 w-5 h-5" /> <strong>Order ID:</strong> {orderId}
          </p>
          <p className="text-gray-700 text-lg flex items-center gap-2">
            <ShoppingBag className="text-blue-500 w-5 h-5" /> <strong>Total Amount:</strong> {totalAmount}
          </p>
          <p className="text-gray-700 text-lg flex items-center gap-2">
            <CheckCircle className="text-green-500 w-5 h-5" /> <strong>Status:</strong> Paid ✅
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-4">Ordered Items:</h2>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={48} height={48} className="w-12 h-12 rounded-md object-cover" />
                  <p className="text-gray-700">{item.name}</p>
                </div>
                <p className="text-gray-800 font-semibold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download Invoice
          </button>
          <button onClick={() => router.push("/")} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2">
            <Home className="w-5 h-5" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;