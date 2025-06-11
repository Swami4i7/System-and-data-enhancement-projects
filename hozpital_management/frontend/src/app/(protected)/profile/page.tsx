'use client';
import api from '../../utils/axios';
import { useRouter } from 'next/navigation';
import * as React from "react";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import { BarChartCard } from '@/components/barchart';
import { LineChartCard } from '@/components/linechart';
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  RadialBarChart,
  XAxis,
  YAxis,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import {
  Home,
  LineChart as LineChartIcon,
  Package,
  Settings,
  ShoppingCart,
  Users2,
  File, 
  ListFilter 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import LogoutButton from '@/components/logout';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); 
  const toggleSidebar = () => setIsOpen(!isOpen); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/doctors/profile');  
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/login');  
      }
    };

    fetchProfile();
  }, [router]);
}

function Navbar() {
return (
  <TooltipProvider>
    <header className="sticky top-0 z-30 flex h-16 items-center gap-8 border-b bg-background mb-4 font-medium text-md rounded-sm sm:px-8 shadow-sm">
    <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="#" className="text-gray-600 hover:text-emerald-600">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="#" className="text-gray-600 hover:text-emerald-600">Orders</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-800">Recent Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    <div className="relative ml-auto">
        <Input
          type="search"
          placeholder="Search..."
          className="rounded-lg bg-gray-50 text-gray-700 border border-emerald-600 md:w-[300px] lg:w-[350px] md:-center"
        />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none focus:ring-2 focus:ring-gray-200 mt-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
            <AvatarFallback className="bg-gray-500 text-white">JD</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-46 mt-2bg-white shadow-lg border border-gray-200 rounded-md items-center">
        <DropdownMenuItem className="cursor-pointer">
          <span className="text-gray-700">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <span className="text-gray-700">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" >
          <span><LogoutButton /></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </header>
  </TooltipProvider>
);
}

// Home Page with charts
export default function Charts() {
return (
  <div className="mx-auto max-w-7xl flex flex-col lg:flex-row  bg-gray-50">
    {/* <Sidebar /> */}
    <div className="flex-2 p-8 ">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 ml-2 text-emerald-700">Dashboard</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Chart Components */}
        <Card className="lg:max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-600">Steps Today</CardTitle>
            <CardDescription className="text-sm text-gray-500">Track your steps for the week</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <BarChart
              width={350}
              height={250}
              data={[
                { date: "2024-01-01", steps: 2000 },
                { date: "2024-01-02", steps: 2100 },
                { date: "2024-01-03", steps: 2200 },
              ]}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Bar dataKey="steps" fill="#10B981" radius={5} />
            </BarChart>
          </CardContent>
          <CardFooter className="text-gray-600">Average steps: 2150</CardFooter>
        </Card>
        <Card className="lg:max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-600">Resting Heart Rate</CardTitle>
            <CardDescription className="text-sm text-gray-500">Your heart rate over the week</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <LineChart width={300} height={250} data={[{ date: "2024-01-01", rate: 62 }, { date: "2024-01-02", rate: 70 }]}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </CardContent>
        </Card>
        <Card className="lg:max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-600">Active Energy</CardTitle>
            <CardDescription className="text-sm text-gray-500">Your daily active energy levels</CardDescription>
          </CardHeader>
          <CardContent className="text-sm font-medium ml-12"> 
            <RadialBarChart width={200} height={250} innerRadius="20%" outerRadius="100%" data={[{ name: "Move", value: 80 }]}>
              <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" />
              <RadialBar dataKey="value" background fill="#10B981" />
            </RadialBarChart>
          </CardContent>
        </Card>

      </div>
      <DashboardSection/>
    </div>
  </div>
);
}

export function DashboardSection() {
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/ab8ce592-6442-401a-88d1-d774beb29a60'); 
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setLoading(false);
    }
  };
  fetchOrders();
}, []);

if (loading) {
  return <div>Loading...</div>;
}
return (
  <main className="grid flex-1 items-start gap-6 p-6 mt-3 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2 bg-gray-50">
    <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="bg-emerald-600 text-white">Create New Order</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">+25% from last week</div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">+10% from last month</div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="week">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent value="week">
          <Card className="shadow-lg">
            <CardHeader className="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order:any) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="hidden text-sm text-gray-500 md:inline">{order.customerEmail}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{order.type}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={order.status === 'Fulfilled' ? 'secondary' : 'outline'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                      <TableCell className="text-right">${order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </main>
  );
};

