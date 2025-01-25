"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Package } from "lucide-react";
import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/utils";
import { getOrders } from "@/lib/actions/orderActions";
import { useSession } from "next-auth/react";

interface OrderItem {
  product: {
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentReference?: string;
}

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isVerifyingSession, setIsVerifyingSession] = useState(true);

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (status === "loading") {
      setIsVerifyingSession(true);
      return;
    }

    if (status === "unauthenticated") {
      router.push("/auth/signin?redirect=/account");
    } else {
      setIsVerifyingSession(false);
    }
  }, [isAuthenticated, router, status]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const result = await getOrders();

        if (result.success) {
          setOrders(result.orders);
        } else {
          setError(result.message || "Failed to fetch orders");
        }
      } catch (error) {
        setError("An unexpected error occurred");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isVerifyingSession) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-gray-500">
            Start shopping to create your first order.
          </p>
          <Button onClick={() => router.push("/shop")} className="mt-6">
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="divide-y">
                {order.orderItems.map((item) => (
                  <div
                    key={item.product.name}
                    className="py-4 flex items-center"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.product.name}</h3>
                          <p className="ml-4">{formatPrice(item.price)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{formatPrice(order.totalAmount)}</p>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">
                    Shipping Address
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.postalCode}
                    <br />
                    {order.shippingAddress.country}
                  </p>
                </div>

                {order.status === "pending" && (
                  <Button
                    onClick={() =>
                      router.push(`/checkout/payment/${order._id}`)
                    }
                    className="mt-4 w-full"
                  >
                    Continue to Payment
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
