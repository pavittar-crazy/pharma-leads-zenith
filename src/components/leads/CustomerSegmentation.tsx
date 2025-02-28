
import React from "react";
import { Plus, Users, Filter, Send, Edit, Trash, Info, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CustomerSegmentation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Customer Segmentation</CardTitle>
            <CardDescription>Create and manage customer segments for targeted marketing</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Segment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="segments" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="builder">Segment Builder</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="segments" className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Input placeholder="Search segments..." className="sm:w-[300px]" />
              <div className="flex gap-2">
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="largest">Largest Size</SelectItem>
                    <SelectItem value="a-z">A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">High Value Hospitals</div>
                      <div className="text-xs text-muted-foreground">Hospitals with annual orders >₹50L</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                        Dynamic
                      </Badge>
                    </TableCell>
                    <TableCell>45 customers</TableCell>
                    <TableCell>15 Jan 2024</TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Mumbai Clinics</div>
                      <div className="text-xs text-muted-foreground">Small to mid-size clinics in Mumbai</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
                        Static
                      </Badge>
                    </TableCell>
                    <TableCell>68 customers</TableCell>
                    <TableCell>22 Dec 2023</TableCell>
                    <TableCell>1 week ago</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Antibiotics Buyers</div>
                      <div className="text-xs text-muted-foreground">Customers who purchased antibiotics</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                        Dynamic
                      </Badge>
                    </TableCell>
                    <TableCell>132 customers</TableCell>
                    <TableCell>10 Jan 2024</TableCell>
                    <TableCell>Today</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Lapsed Customers</div>
                      <div className="text-xs text-muted-foreground">No purchases in last 6 months</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                        Dynamic
                      </Badge>
                    </TableCell>
                    <TableCell>27 customers</TableCell>
                    <TableCell>5 Dec 2023</TableCell>
                    <TableCell>Yesterday</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="builder" className="space-y-4 pt-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Segment Builder</CardTitle>
                    <CardDescription>Define conditions to create a dynamic customer segment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="segment-name">Segment Name</Label>
                        <Input id="segment-name" placeholder="Enter segment name" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="segment-description">Description</Label>
                        <Input id="segment-description" placeholder="Enter description" />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Conditions</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Match type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Match ALL conditions</SelectItem>
                              <SelectItem value="any">Match ANY condition</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="rounded-md border p-4 space-y-4">
                          <div className="grid gap-4 items-center sm:grid-cols-4">
                            <Select defaultValue="location">
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="location">Location</SelectItem>
                                <SelectItem value="order-value">Order Value</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="last-order">Last Order Date</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select defaultValue="equals">
                              <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                                <SelectItem value="starts-with">Starts with</SelectItem>
                                <SelectItem value="in">Is in list</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input placeholder="Mumbai" />
                            
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid gap-4 items-center sm:grid-cols-4">
                            <Select defaultValue="order-value">
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="location">Location</SelectItem>
                                <SelectItem value="order-value">Order Value</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="last-order">Last Order Date</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select defaultValue="greater-than">
                              <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="greater-than">Greater than</SelectItem>
                                <SelectItem value="less-than">Less than</SelectItem>
                                <SelectItem value="between">Between</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input placeholder="500000" />
                            
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Condition
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button variant="outline">Preview Segment</Button>
                    <Button>Save Segment</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Templates</CardTitle>
                    <CardDescription>Start with a predefined segment template</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                      <div>
                        <p className="font-medium">High Value Customers</p>
                        <p className="text-xs text-muted-foreground">Order value > ₹5,00,000</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                      <div>
                        <p className="font-medium">Recently Active</p>
                        <p className="text-xs text-muted-foreground">Order in last 30 days</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                      <div>
                        <p className="font-medium">At Risk</p>
                        <p className="text-xs text-muted-foreground">No activity in 90+ days</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-2">
                      <div>
                        <p className="font-medium">By Location</p>
                        <p className="text-xs text-muted-foreground">Customers in a specific region</p>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Actions</CardTitle>
                    <CardDescription>What to do with this segment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Button className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Create Campaign
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Assign to Team
                      </Button>
                      <Button variant="outline" className="w-full">
                        <LineChart className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Segment Analytics</CardTitle>
                <CardDescription>Review performance metrics for your customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">High Value Hospitals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Customers</p>
                          <p className="text-xl font-bold">45</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="text-xl font-bold">₹92.5L</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Avg. Order</p>
                          <p className="text-xl font-bold">₹2.05L</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Growth</p>
                          <p className="text-xl font-bold text-emerald-600">+12%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Mumbai Clinics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Customers</p>
                          <p className="text-xl font-bold">68</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="text-xl font-bold">₹47.2L</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Avg. Order</p>
                          <p className="text-xl font-bold">₹0.69L</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Growth</p>
                          <p className="text-xl font-bold text-emerald-600">+8%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Antibiotics Buyers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Customers</p>
                          <p className="text-xl font-bold">132</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="text-xl font-bold">₹118L</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Avg. Order</p>
                          <p className="text-xl font-bold">₹0.89L</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Growth</p>
                          <p className="text-xl font-bold text-rose-600">-3%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
